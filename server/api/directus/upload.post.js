import { createDirectus, rest, staticToken, uploadFiles } from '@directus/sdk'

export default defineEventHandler(async (event) => {
  const { directusUrl, directusToken } = useRuntimeConfig()
  if (!directusUrl) {
    throw createError({ statusCode: 500, statusMessage: 'Missing runtimeConfig.directusUrl' })
  }

  try {
    const parts = await readMultipartFormData(event)
    const filePart = (parts || []).find((p) => p?.name === 'file')
    if (!filePart) throw new Error('No file received')
    const type = filePart.type || 'application/octet-stream'
    if (type !== 'application/pdf') throw new Error('Only PDF files are allowed')

    const blob = new Blob([filePart.data], { type })
    const fd = new FormData()
    fd.append('file', blob, filePart.filename || 'upload.pdf')

    const base = createDirectus(directusUrl).with(rest())
    const directus = directusToken ? base.with(staticToken(directusToken)) : base

    const res = await directus.request(uploadFiles(fd))
    return res
  } catch (err) {
    console.error('Error uploading file to Directus', err)
    throw createError({ statusCode: 500, statusMessage: err?.message || 'Upload failed' })
  }
})

