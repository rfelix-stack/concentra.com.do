export const directusAsset = (id?: string, params: Record<string,string|number> = {}) => {
  if (!id) return ''
  let base = ''
  try {
    // Prefer Nuxt runtime config when available in a setup context
    // eslint-disable-next-line no-undef
    base = useRuntimeConfig().public.directusUrl
  } catch (_) {
    // Fallback on client: read from injected __NUXT__ config
    if (typeof window !== 'undefined' && (window as any).__NUXT__?.config?.public?.directusUrl) {
      base = (window as any).__NUXT__.config.public.directusUrl
    }
  }
  const q = new URLSearchParams(params as any).toString()
  return base ? `${base}/assets/${id}${q ? `?${q}` : ''}` : ''
}
