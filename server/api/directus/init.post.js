
import { createDirectus, rest, staticToken, readItems } from '@directus/sdk'

export default defineEventHandler(async (event) => {

    const { directusUrl, directusToken } = useRuntimeConfig()
    if (!directusUrl) {
        throw createError({ statusCode: 500, statusMessage: 'Missing runtimeConfig.directusUrl' })
    }

    const base = createDirectus(directusUrl).with(rest())
    const directus = directusToken ? base.with(staticToken(directusToken)) : base

    try {
        const [solutionsResponse, servicesResponse, consultanciesResponse] = await Promise.all([
            directus.request(
                readItems('solutions', {
                    fields: [
                        'id', 'name', 'slug', 'intro', 'isotipo', 'featured', 'card_title', 'card_intro', 'card_image'
                    ],
                    filter: { status: { _eq: 'published' } },
                    sort: ['-sort']
                }),
            ),
            directus.request(
                readItems('services', {
                    fields: [
                        'id', 'name', 'slug', 'intro', 'isotipo', 'featured', 'card_title', 'card_intro', 'card_image'
                    ],
                    filter: { status: { _eq: 'published' } },
                    sort: ['-sort']
                }),
            ),
            directus.request(
                readItems('consultancies', {
                    fields: [
                        'id', 'name', 'slug', 'intro', 'isotipo', 'featured', 'card_title', 'card_intro', 'card_image'
                    ],
                    filter: { status: { _eq: 'published' } },
                    sort: ['-sort']
                }),
            )
        ])

        return {
            solutions: solutionsResponse ?? [],
            services: servicesResponse ?? [],
            consultancies: consultanciesResponse ?? []
        }
    } catch (err) {
        console.error('Error fetching data </api/directus/init.post.js>:', err)
        throw createError({
            statusCode: 500,
            statusMessage: err?.message || 'Failed querying Directus'
        })
    }
})
