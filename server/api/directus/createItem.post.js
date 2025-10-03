import { createDirectus, rest, staticToken, createItems } from '@directus/sdk'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { directusUrl, directusToken } = useRuntimeConfig()
  if (!directusUrl) {
    throw createError({ statusCode: 500, statusMessage: 'Missing runtimeConfig.directusUrl' })
  }

  const base = createDirectus(directusUrl).with(rest())
  const directus = directusToken ? base.with(staticToken(directusToken)) : base

  try {
    const response = await directus.request(
      createItems(body.collection, body.item)
    )
    return response
  } catch (err) {
    console.error('Error creating item </api/directus/createItem.post.js>:', err)
    throw createError({
      statusCode: 500,
      statusMessage: err?.message || 'Failed creating item in Directus'
    })
  }
})

