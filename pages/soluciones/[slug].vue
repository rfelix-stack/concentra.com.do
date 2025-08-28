<script setup>
import { readItems } from '@directus/sdk'

// obtener el slug de la URL
const route = useRoute()
const slug = computed(() => route.params.slug)
const key = computed(() => `solution-${route.params.slug}`)

const { $directus } = useNuxtApp()

// usamos useAsyncData para que cargue en SSR y Cliente
const { data: solution, pending, error } = await useAsyncData(
    key.value,
    async () => {
        const res = await $directus.request(
            readItems('solutions', {
                filter: { slug: { _eq: slug.value } },
                limit: 1,
                fields: ['id', 'name', 'slug', 'title', 'intro', 'content', 'logo', 'media_type', 'image', 'video_type', 'video', 'youtube_video_url', 'related.related_solutions_id.isotipo', 'related.related_solutions_id.intro', 'related.related_solutions_id.slug', 'demo', 'external_link', 'brochure']
            })
        )

        return res?.[0]
    },
    { watch: [slug] }
)
</script>

<template>
    <div>
        <div v-if="solution">
            <div class="relative isolate overflow-hidden bg-white px-6 py-24 lg:pt-52 lg:overflow-visible lg:px-0">
                <div class="absolute inset-0 -z-10 overflow-hidden">
                    <svg class="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-primary-100"
                        aria-hidden="true">
                        <defs>
                            <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1"
                                patternUnits="userSpaceOnUse">
                                <path d="M100 200V.5M.5 .5H200" fill="none" />
                            </pattern>
                        </defs>
                        <svg x="50%" y="-1" class="overflow-visible fill-primary-50">
                            <path
                                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                                stroke-width="0" />
                        </svg>
                        <rect width="100%" height="100%" stroke-width="0"
                            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
                    </svg>
                </div>
                <div
                    class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                    <div
                        class="lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8">
                        <div class="lg:pr-4">
                            <div class="">
                                <img v-if="solution?.logo" :src="directusAsset(solution?.logo)" :alt="solution?.name"
                                    class="h-12 w-auto" v-motion-fadein-up-once>

                                <h1 v-if="solution?.title"
                                    class="mt-8 text-4xl font-semibold tracking-tight text-pretty text-secondary leading-tight sm:text-5xl"
                                    v-motion-fadein-up-once :delay="300">
                                    {{ solution?.title }}
                                </h1>
                                <div v-if="solution?.content"
                                    class="mt-6 text-base/7 text-gris-aluminio font-normal space-y-6"
                                    v-html="solution?.content" v-motion-fadein-up-once>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        class="-mt-12 pb-16 px-5 lg:sticky lg:top-[144px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                        <img v-if="solution?.media_type === 'image'"
                            class="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                            :src="directusAsset(solution?.image)" :alt="solution?.title">

                        <iframe v-if="solution?.media_type === 'video' && solution?.video_type === 'youtube'"
                            width="100%" height="450" v-motion-fadein-up-once :src="solution?.youtube_video_url"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
                            class="rounded-xl bg-primary-50 shadow-xl ring-1 ring-primary-50"></iframe>

                        <div v-if="solution?.media_type === 'video' && solution?.video_type === 'local'">
                            <video :src="directusAsset(solution?.video)" controls playsinline=""
                                class="rounded-xl bg-primary-50 shadow-xl ring-1 ring-primary-50"></video>
                        </div>

                        <div class="mt-6" v-motion-fadein-up-once :delay="900">
                            <div
                                class="relative isolate overflow-hidden bg-transparent px-6 py-12 text-center shadow-lg shadow-secondary/5 sm:rounded-3xl sm:px-16">
                                <h2 v-if="solution?.cta_title"
                                    class="text-2xl font-semibold tracking-tight text-balance text-secondary sm:text-3xl">
                                    {{ solution?.cta_title }}
                                </h2>
                                <div class="mt-10 flex items-center justify-center gap-x-6">
                                    <NuxtLink v-if="solution?.demo"
                                        :to="`/solicitudes/demo-soluciones?solution=${solution?.slug}`"
                                        class="rounded-full bg-primary px-3.5 py-2.5 text-sm font-light text-white shadow-xs hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary transition-colors duration-300 ease-in-out">
                                        Solicita un demo
                                    </NuxtLink>

                                    <a v-if="solution?.brochure" :href="directusAsset(solution?.brochure)"
                                        target="_blank" download
                                        class="rounded-full bg-secondary px-3.5 py-2.5 text-sm font-light text-white shadow-xs hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary transition-colors duration-300 ease-in-out">
                                        Descargar brochure
                                    </a>

                                    <a v-if="solution?.external_link" :href="solution?.external_link" target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-sm/6 font-light text-secondary hover:text-primary">
                                        Conoce más
                                        <span aria-hidden="true">→</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div v-if="solution?.related?.length > 0" class="container mx-auto">
                <h6 class="mt-12 text-xl font-semibold tracking-tight text-pretty text-secondary leading-tight sm:text-2xl"
                    v-motion-fadein-up-once>
                    Otras soluciones relacionadas
                </h6>
                <SliderSolutionsRelated :items="solution?.related" class="pb-16" v-motion-fadein-up-once />
            </div>
        </div>

        <p class="mt-44" v-else-if="pending">Cargando...</p>
        <p class="mt-44" v-else>No se encontró la solución</p>
        <p class="mt-44" v-if="error">{{ error }}</p>
    </div>
</template>