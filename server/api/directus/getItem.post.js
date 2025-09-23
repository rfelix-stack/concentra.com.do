
import { createDirectus, rest, staticToken, readItems } from '@directus/sdk'

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    const { directusUrl, directusToken } = useRuntimeConfig()
    if (!directusUrl) {
        throw createError({ statusCode: 500, statusMessage: 'Missing runtimeConfig.directusUrl' })
    }

    const base = createDirectus(directusUrl).with(rest())
    const directus = directusToken ? base.with(staticToken(directusToken)) : base

    try {
        const [response] = await Promise.all([
            directus.request(
                readItems(body.collection, {
                    filter: { slug: { _eq: body.slug } },
                    fields: body.fields,
                    limit: 1,
                })
            )
        ])

        return response
    } catch (err) {
        console.error('Error fetching data </api/directus/getItem.js>:', err)
        throw createError({
            statusCode: 500,
            statusMessage: err?.message || 'Failed querying Directus'
        })
    }
})
