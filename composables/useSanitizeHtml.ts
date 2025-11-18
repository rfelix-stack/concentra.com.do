import DOMPurify from 'dompurify'

/**
 * Composable para sanitizar HTML y prevenir ataques XSS
 *
 * @param dirtyHtml - HTML sin sanitizar (puede contener scripts maliciosos)
 * @param options - Opciones de configuración de DOMPurify
 * @returns HTML sanitizado seguro para renderizar
 *
 * @example
 * ```vue
 * <script setup>
 * const content = ref('<p>Hello <script>alert("xss")</script></p>')
 * const safeHtml = useSanitizeHtml(content)
 * </script>
 *
 * <template>
 *   <div v-html="safeHtml"></div>
 * </template>
 * ```
 */
export const useSanitizeHtml = (
  dirtyHtml: MaybeRefOrGetter<string | undefined | null>,
  options?: DOMPurify.Config
) => {
  return computed(() => {
    const html = toValue(dirtyHtml)

    if (!html) return ''

    // Configuración por defecto: permitir solo tags seguros
    const defaultConfig: DOMPurify.Config = {
      ALLOWED_TAGS: [
        // Texto y formato
        'p', 'br', 'strong', 'em', 'u', 'span', 'b', 'i', 's', 'del', 'mark', 'small', 'sub', 'sup',
        // Headings
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        // Listas
        'ul', 'ol', 'li',
        // Enlaces e imágenes
        'a', 'img',
        // Tablas
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
        // Otros
        'blockquote', 'pre', 'code', 'hr', 'div'
      ],
      ALLOWED_ATTR: [
        'href', 'src', 'alt', 'title', 'class', 'id',
        'target', 'rel', 'width', 'height', 'style'
      ],
      ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
      // Forzar target="_blank" en links externos
      ADD_ATTR: ['target'],
      // Proteger contra ataques mXSS
      SAFE_FOR_TEMPLATES: true,
      // Remover tags peligrosos completamente
      FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'textarea', 'button'],
      // Remover atributos peligrosos
      FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
      ...options
    }

    return DOMPurify.sanitize(html, defaultConfig)
  })
}

/**
 * Versión estricta para contenido que NO debe contener HTML
 * (solo texto plano con saltos de línea)
 */
export const useSanitizePlainText = (
  dirtyText: MaybeRefOrGetter<string | undefined | null>
) => {
  return useSanitizeHtml(dirtyText, {
    ALLOWED_TAGS: ['br', 'p'],
    ALLOWED_ATTR: []
  })
}
