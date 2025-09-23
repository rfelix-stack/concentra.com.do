<script setup>
const route = useRoute()
const slug = computed(() => route.params.slug)
const key = computed(() => `service-${route.params.slug}`)

const { data: service, status, pending, error, refresh } = await useAsyncData(
    key,
    () => $fetch('/api/directus/getItem', {
        method: 'POST',
        body: {
            collection: "services",
            slug: slug.value,
            fields: [
                'id', 'name', 'slug', 'title', 'intro', 'content', 'logo', 'media_type',
                'image', 'video_type', 'video', 'youtube_video_url',
                'related.related_services_id.isotipo',
                'related.related_services_id.intro',
                'related.related_services_id.slug',
                'demo', 'external_link', 'brochure', 'cta_title'
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
</script>

<template>
    <div>
        <SlugContent v-if="status === 'success'" :item="service" />
    </div>
</template>