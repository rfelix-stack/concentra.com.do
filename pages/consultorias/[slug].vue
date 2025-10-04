<script setup>
const route = useRoute()
const slug = computed(() => route.params.slug)
const key = computed(() => `consultance-${route.params.slug}`)

const { data: consultance, status, pending, error, refresh } = await useAsyncData(
    key,
    () => $fetch('/api/directus/getItem', {
        method: 'POST',
        body: {
            collection: "consultancies",
            slug: slug.value,
            fields: [
                'id', 'name', 'slug', 'title', 'intro', 'content', 'logo', 'media_type',
                'image', 'video_type', 'video', 'youtube_video_url',
                'related.related_consultancies_id.isotipo',
                'related.related_consultancies_id.intro',
                'related.related_consultancies_id.slug',
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
    computed(() => consultance.value?.seo),
    computed(() => ({
        title: consultance.value?.title || consultance.value?.name || 'Consultoría',
        description: consultance.value?.intro || ''
    }))
)
</script>

<template>
    <div>
        <SlugContent v-if="status === 'success'" :item="consultance" />
    </div>
</template>
