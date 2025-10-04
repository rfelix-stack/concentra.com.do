import { directusAsset } from '~/utils/directusAsset'

type MaybeRef<T> = T | Ref<T> | ComputedRef<T>

type Fallback = {
  title?: string
  description?: string
  image?: string
  canonical?: string
}

export function useDirectusSeo(seoInput?: MaybeRef<any>, fallbackInput?: MaybeRef<Fallback>) {
  const seo = computed(() => (unref(seoInput) as any) || {})
  const fb = computed(() => (unref(fallbackInput) as Fallback) || {})

  const title = computed(() => seo.value?.title || fb.value.title || 'ConCentra')
  const description = computed(() => seo.value?.meta_description || fb.value.description || '')
  const ogImage = computed(() => {
    const id = seo.value?.og_image
    return id ? directusAsset(id, { format: 'webp' }) : fb.value.image || ''
  })
  const robots = computed(() => {
    const noIndex = !!seo.value?.no_index
    const noFollow = !!seo.value?.no_follow
    const parts = [noIndex ? 'noindex' : 'index', noFollow ? 'nofollow' : 'follow']
    return parts.join(', ')
  })
  const canonical = computed(() => seo.value?.additional_fields?.canonical_url || fb.value.canonical || '')

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'robots', content: robots },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
    ],
    link: [
      ...(canonical.value ? [{ rel: 'canonical', href: canonical as any }] : []),
    ],
  })

  // Additional custom meta tags if provided in additional_fields
  const additional = computed(() => seo.value?.additional_fields || {})
  const additionalMeta = computed(() => {
    const out: { name: string; content: string }[] = []
    for (const [k, v] of Object.entries(additional.value)) {
      if (k === 'canonical_url') continue
      if (v == null) continue
      out.push({ name: String(k), content: String(v) })
    }
    return out
  })
  useHead({
    meta: additionalMeta as any,
  })
}

