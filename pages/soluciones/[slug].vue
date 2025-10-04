<script setup>
const route = useRoute()
const slug = computed(() => route.params.slug)
const key = computed(() => `solution-${route.params.slug}`)

const { data: solution, status, pending, error, refresh } = await useAsyncData(
    key,
    () => $fetch('/api/directus/getItem', {
        method: 'POST',
        body: {
            collection: "solutions",
            slug: slug.value,
            fields: [
                'id', 'name', 'slug', 'title', 'intro', 'content', 'logo', 'media_type',
                'image', 'video_type', 'video', 'youtube_video_url',
                'related.related_solutions_id.isotipo',
                'related.related_solutions_id.intro',
                'related.related_solutions_id.slug',
                'demo', 'external_link', 'brochure', 'cta_title',
                'seo'
            ]
        }
    }),
    {
        default: () => null,
        server: true,
        lazy: false,
        watch: [() => slug.value],
        transform: (data) => data?.[0]
    }
)

// SEO integration
useDirectusSeo(
    computed(() => solution.value?.seo),
    computed(() => ({
        title: solution.value?.title || solution.value?.name || 'Solución',
        description: solution.value?.intro || ''
    }))
)
</script>

<template>
    <div>
        <SlugContent v-if="status === 'success'" :item="solution" />
    </div>
</template>
