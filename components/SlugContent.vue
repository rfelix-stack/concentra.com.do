<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

const route = useRoute()
const src = computed(() => {
    if (route.path.startsWith('/soluciones')) return 'solutions'
    if (route.path.startsWith('/servicios')) return 'services'
    if (route.path.startsWith('/consultorias')) return 'consultancies'
    return 'solutions'
})

// Sanitizar HTML para prevenir XSS
const sanitizedContent = useSanitizeHtml(() => props.item?.content)
</script>

<template>
    <div class="relative isolate bg-white">
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
                <rect width="100%" height="100%" stroke-width="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
            </svg>
        </div>


        <div class="container mx-auto px-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10 py-16">
                <div class="">
                    <NuxtImg v-if="item?.logo"
                        :src="item?.logo"
                        provider="directus"
                        preset="logo"
                        :alt="item?.name"
                        class="h-12 w-auto"
                        loading="eager"
                        v-motion-fadein-up-once />

                    <h1 v-if="item?.title"
                        class="mt-8 text-4xl font-semibold tracking-tight text-pretty text-secondary leading-tight sm:text-5xl"
                        v-motion-fadein-up-once :delay="300">
                        {{ item?.title }}
                    </h1>
                    <div v-if="item?.content" class="mt-6 text-base/7 text-paragraph font-normal space-y-6 content"
                        v-html="sanitizedContent" v-motion-fadein-up-once>
                    </div>
                </div>

                <div>
                    <div class="sticky lg:top-[164px]">

                        <div v-if="item?.media_type === 'image'"
                            class="overflow-hidden isolate relative rounded-xl max-h-[50vvh] bg-secondary shadow-xl ring-1 ring-primary-50"
                            v-motion-fadein-up-once>
                            <NuxtImg
                                :src="item?.image"
                                provider="directus"
                                preset="hero"
                                sizes="xs:100vw sm:100vw md:50vw lg:50vw"
                                :alt="item?.title"
                                class="w-full h-full object-center object-cover"
                                loading="lazy" />
                        </div>

                        <iframe v-if="item?.media_type === 'video' && item?.video_type === 'youtube'"
                            width="100%" height="450" v-motion-fadein-up-once :src="item?.youtube_video_url"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
                            class="rounded-xl bg-primary-50 shadow-xl ring-1 ring-primary-50"></iframe>

                        <div v-if="item?.media_type === 'video' && item?.video_type === 'local'"
                            v-motion-fadein-up-once
                            class="overflow-hidden isolate relative rounded-xl bg-secondary aspect-video shadow-sm shadow-secondary/10">
                            <video :src="directusAsset(item?.video)" controls playsinline=""
                                class="w-full h-full object-center object-cover "></video>
                        </div>

                        <div class="mt-8" v-motion-fadein-up-once :delay="900">
                            <div
                                class="relative isolate overflow-hidden px-6 py-12 text-center shadow-sm shadow-secondary/10 bg-white sm:rounded-3xl sm:px-16">
                                <h2
                                    class="text-2xl font-semibold tracking-tight text-balance text-secondary sm:text-3xl">
                                    {{ item?.cta_title || 'Aumente su productividad hoy mismo' }}
                                </h2>
                                <div class="mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6">
                                    <NuxtLink v-if="item?.demo"
                                        :to="`/solicitudes/demo?item=${item?.slug}&src=${src}`"
                                        class="w-full md:w-auto rounded-full bg-primary px-3.5 py-2.5 text-sm font-medium text-white shadow-xs hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary transition-colors duration-300 ease-in-out">
                                        Solicita un demo
                                    </NuxtLink>

                                    <a v-if="item?.brochure" :href="directusAsset(item?.brochure)"
                                        target="_blank" download
                                        class="w-full md:w-auto rounded-full bg-secondary px-3.5 py-2.5 text-sm font-medium text-white shadow-xs hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary transition-colors duration-300 ease-in-out">
                                        Ver brochure
                                    </a>

                                    <a v-if="item?.external_link" :href="item?.external_link" target="_blank"
                                        rel="noopener noreferrer"
                                        class="w-full md:w-auto text-sm/6 font-medium text-secondary hover:text-primary">
                                        Conoce más
                                        <span aria-hidden="true">→</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!-- <div v-if="item?.related?.length > 0" class="container mx-auto px-5">
            <h6 class="mt-12 text-xl font-semibold tracking-tight text-pretty text-secondary leading-tight sm:text-2xl"
                v-motion-fadein-up-once>
                Relacionados
            </h6>
            <SliderItemsRelated :items="item?.related" class="pb-16" v-motion-fadein-up-once />
        </div> -->
    </div>
</template>
