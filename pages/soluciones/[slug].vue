<script setup>
import { readItems } from '@directus/sdk'
const { $directus } = useNuxtApp()

const route = useRoute()
const slug = computed(() => route.params.slug)
const key = computed(() => `solution-${route.params.slug}`)

const { data: solution, status, pending, error, refresh, clear } = await useAsyncData(
    key.value,
    async () => await $directus.request(
        readItems('solutions', {
            filter: { slug: { _eq: slug.value } },
            limit: 1,
            fields: [
                'id', 'name', 'slug', 'title', 'intro', 'content', 'logo', 'media_type',
                'image', 'video_type', 'video', 'youtube_video_url',
                'related.related_solutions_id.isotipo',
                'related.related_solutions_id.intro',
                'related.related_solutions_id.slug',
                'demo', 'external_link', 'brochure', 'cta_title'
            ]
        })
    ),
    {
        server: true,
        lazy: false,
        watch: [slug],
        transform: (raw) => raw ? JSON.parse(JSON.stringify(raw[0])) : null
    }
)
</script>

<template>
   <SlugContent v-if="status === 'success'" :item="solution" />
</template>