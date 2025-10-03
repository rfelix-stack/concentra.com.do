
import { createDirectus, rest, staticToken, readSingleton } from '@directus/sdk'

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
                readSingleton(body.collection, {
                    fields: body.fields,
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
