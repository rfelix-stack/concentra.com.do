import { readItems } from '@directus/sdk'

export const useSolutionsStore = defineStore('solutions', {
    state: () => ({
        list: [],
        loaded: false
    }),
    actions: {
        async fetchAll() {
            if (this.loaded) return this.list
            const { $directus } = useNuxtApp() // usa el plugin con token/REST
            const data = await $directus.request(
                readItems('solutions', {
                    fields: ['id', 'name', 'slug', 'intro', 'isotipo', 'featured', 'card_title', 'card_intro', 'card_image'],
                    filter: { status: { _eq: 'published' } },
                    sort: ['-sort'],
                })
            )
            this.list = data || []
            this.loaded = true
            return this.list
        },
    }
})