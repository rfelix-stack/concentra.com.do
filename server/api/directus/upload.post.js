import { createDirectus, rest, staticToken, uploadFiles } from '@directus/sdk'

/**
 * Valida que los primeros bytes del archivo sean los magic bytes de PDF
 * PDF files start with: %PDF (hex: 25 50 44 46)
 *
 * @param {Uint8Array} data - Datos del archivo
 * @returns {boolean} - true si es un PDF válido
 */
function isPdfByMagicBytes(data) {
  if (!data || data.length < 4) return false
  return (
    data[0] === 0x25 && // %
    data[1] === 0x50 && // P
    data[2] === 0x44 && // D
    data[3] === 0x46    // F
  )
}

/**
 * Sanitiza el nombre del archivo removiendo caracteres peligrosos
 * Previene path traversal, inyecciones y nombres de archivo maliciosos
 *
 * @param {string} filename - Nombre original del archivo
 * @returns {string} - Nombre sanitizado
 */
function sanitizeFilename(filename) {
  if (!filename) return 'upload.pdf'

  // Remover intentos de path traversal
  let clean = filename.replace(/\.\./g, '')

  // Solo permitir caracteres alfanuméricos, guiones, underscores y puntos
  clean = clean.replace(/[^a-zA-Z0-9._-]/g, '_')

  // Asegurar extensión .pdf
  if (!clean.toLowerCase().endsWith('.pdf')) {
    clean = clean.replace(/\.[^.]*$/, '') + '.pdf'
  }

  // Limitar longitud del nombre
  if (clean.length > 100) {
    clean = clean.substring(0, 96) + '.pdf'
  }

  return clean
}

export default defineEventHandler(async (event) => {
  const { directusUrl, directusToken } = useRuntimeConfig()
  if (!directusUrl) {
    throw createError({ statusCode: 500, statusMessage: 'Missing runtimeConfig.directusUrl' })
  }

  try {
    const parts = await readMultipartFormData(event)
    const filePart = (parts || []).find((p) => p?.name === 'file')

    if (!filePart) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No se recibió ningún archivo'
      })
    }

    // 1. Validar tamaño del archivo (máximo 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (filePart.data.length > maxSize) {
      throw createError({
        statusCode: 400,
        statusMessage: 'El archivo excede el tamaño máximo permitido (5MB)'
      })
    }

    // 2. Validar MIME type
    const type = filePart.type || 'application/octet-stream'
    if (type !== 'application/pdf') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Solo se permiten archivos PDF'
      })
    }

    // 3. Validar magic bytes (verificar que realmente sea un PDF)
    if (!isPdfByMagicBytes(filePart.data)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'El archivo no es un PDF válido'
      })
    }

    // 4. Sanitizar nombre del archivo
    const sanitizedFilename = sanitizeFilename(filePart.filename)

    // Crear blob y FormData para Directus
    const blob = new Blob([filePart.data], { type })
    const fd = new FormData()
    fd.append('file', blob, sanitizedFilename)

    const base = createDirectus(directusUrl).with(rest())
    const directus = directusToken ? base.with(staticToken(directusToken)) : base

    const res = await directus.request(uploadFiles(fd))
    return res
  } catch (err) {
    console.error('Error uploading file to Directus:', err)

    // Si ya es un error H3, reusarlo (tiene statusCode y statusMessage)
    if (err.statusCode) {
      throw err
    }

    // Error genérico
    throw createError({
      statusCode: 500,
      statusMessage: 'Error al subir el archivo'
    })
  }
})

