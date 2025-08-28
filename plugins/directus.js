import { createDirectus, rest, staticToken } from '@directus/sdk';

export default defineNuxtPlugin(() => {
  const { public: { directusUrl, directusStaticToken } } = useRuntimeConfig()
  const client = createDirectus(directusUrl)
    .with(staticToken(directusStaticToken))
    .with(rest())

  return {
    provide: {
      directus: client
    }
  }
});