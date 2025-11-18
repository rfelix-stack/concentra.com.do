import { joinURL } from 'ufo'
import type { ProviderGetImage } from '@nuxt/image'

export const getImage: ProviderGetImage = (src, { modifiers = {}, baseURL } = {}) => {
  // Directus está bloqueando transformaciones sin autenticación
  // Por ahora, servimos las imágenes directamente sin transformaciones
  // TODO: Configurar transformaciones permitidas en Directus server

  const assetURL = joinURL(baseURL || 'https://admin.concentra.com.do/assets', src)

  return {
    url: assetURL
  }
}
