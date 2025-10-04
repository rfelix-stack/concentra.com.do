
import { createDirectus, rest, staticToken, readItems, readSingleton } from '@directus/sdk'

export default defineEventHandler(async (event) => {

    const { directusUrl, directusToken } = useRuntimeConfig()
    if (!directusUrl) {
        throw createError({ statusCode: 500, statusMessage: 'Missing runtimeConfig.directusUrl' })
    }

    const base = createDirectus(directusUrl).with(rest())
    const directus = directusToken ? base.with(staticToken(directusToken)) : base

    try {
        const [solutionsResponse, servicesResponse, consultanciesResponse, configsResponse] = await Promise.all([
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
            ),
            directus.request(
                readSingleton('configs', {
                    fields: [
                        'whatsapp_number',
                        'whatsapp_message',
                        'socials',
                        'address',
                        'contact_phone',
                        'contact_email',
                        'empleo_contact_phone',
                        'empleo_contact_email',
                        'suscribe_title',
                        'suscribe_intro',
                        'suscribe_btn_text',
                    ]
                }),
            )
        ])

        return {
            solutions: solutionsResponse ?? [],
            services: servicesResponse ?? [],
            consultancies: consultanciesResponse ?? [],
            // configs: Array.isArray(configsResponse) ? (configsResponse[0] || {}) : (configsResponse?.[0] || {})
            configs: configsResponse ?? [],
        }
    } catch (err) {
        console.error('Error fetching data </api/directus/init.post.js>:', err)
        throw createError({
            statusCode: 500,
            statusMessage: err?.message || 'Failed querying Directus'
        })
    }
})
