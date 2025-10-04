<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel'
import { directusAsset } from '~/utils/directusAsset'

const currentSlide = ref(0)
// Slideshow items computed from Directus (home.slideshow -> slides)
let slides = ref([])

const heroCarousel = {
    itemsToShow: 1,
    wrapAround: true,
    autoplay: 5000,
    pauseAutoplayOnHover: false,
}

// Carousel config for Services (mobile only)
const servicesCarousel = {
    itemsToShow: 1,
    wrapAround: true,
    autoplay: 4000,
    pauseAutoplayOnHover: true,
}

// Carousel config for Stats (mobile/tablet)
const statsCarousel = {
    itemsToShow: 1,
    wrapAround: true,
    autoplay: 3500,
    pauseAutoplayOnHover: true,
    breakpoints: {
        640: { itemsToShow: 2 },
    }
}

const activeSlide = computed(() => {
    if (!slides.value?.length) {
        return { title: '', description: '', button_text: 'Conocer más', button_link: '#', link_text: 'Contáctanos', link_url: '#', image: '' }
    }
    const idx = Math.abs(currentSlide.value) % slides.value.length
    return slides.value[idx]
})

// Fetch slideshow from Directus (home singleton with m2a to slides)
const { data: homeData } = await useAsyncData(
    'home',
    () => $fetch('/api/directus/getSingleton', {
        method: 'POST',
        body: {
            collection: 'home',
            fields: [
                'seo',
                'slideshow.collection',
                'slideshow.item.title',
                'slideshow.item.intro',
                'slideshow.item.button_text',
                'slideshow.item.button_link',
                'slideshow.item.link_text',
                'slideshow.item.link_url',
                'slideshow.item.image',
                // services cards (m2a -> cards)
                'cards.collection',
                'cards.item.title',
                'cards.item.intro',
                'cards.item.icon',
                // services section titles
                'service_uppertitle',
                'service_title',
                // stats section titles
                'stats_uppertitle',
                'stats_title',
                // stats items (m2a -> stats)
                'stats.collection',
                'stats.item.title',
                'stats.item.stat',
                // clients section titles
                'client_uppertitle',
                'client_title',
                'client_intro'
            ]
        }
    }),
    { server: true, lazy: false, default: () => ({}) }
)

// Map M2A slides -> slides consumables for the hero
const slidesM2A = computed(() => Array.isArray(homeData.value?.slideshow) ? homeData.value.slideshow : [])
slides = computed(() =>
    slidesM2A.value
        .filter((s) => s?.collection === 'slides')
        .map((s) => {
            const i = s?.item || {}
            return {
                title: i?.title || '',
                description: i?.intro || '',
                button_text: i?.button_text || 'Conocer más',
                button_link: i?.button_link || '#',
                link_text: i?.link_text || 'Contáctanos',
                link_url: i?.link_url || '#',
                image: directusAsset(i?.image, { format: 'webp', fit: 'cover' })
            }
        })
)

// Services cards from Directus (home.cards -> cards)
const cardsM2A = computed(() => Array.isArray(homeData.value?.cards) ? homeData.value.cards : [])
const services = computed(() =>
    cardsM2A.value
        .filter((c) => c?.collection === 'cards')
        .map((c) => {
            const i = c?.item || {}
            return {
                title: i?.title || '',
                description: i?.intro || '',
                image: directusAsset(i?.icon, { format: 'webp' }),
                href: '#'
            }
        })
)

// Services section titles
const serviceUpperTitle = computed(() => homeData.value?.service_uppertitle || 'Soluciones y Servicios')
const serviceTitle = computed(() => homeData.value?.service_title || 'Mayor productividad a menor coste mediante métodos sistemáticos')

// Stats (uppertitle, title, and items)
const statsUpperTitle = computed(() => homeData.value?.stats_uppertitle || 'Nuestros números')
const statsTitle = computed(() => homeData.value?.stats_title || 'Lorem ipsum dolor sit amet.')
const stats = computed(() => {
    const m2a = Array.isArray(homeData.value?.stats) ? homeData.value.stats : []
    return m2a
        .filter((it) => it?.collection === 'stats')
        .map((it) => ({
            title: it?.item?.title || '',
            value: it?.item?.stat || ''
        }))
})

// SEO integration for Home
const homeOg = computed(() => slides.value?.[0]?.image || '')
const homeDesc = computed(() => slides.value?.[0]?.description || '')
useDirectusSeo(
    computed(() => homeData.value?.seo),
    computed(() => ({ title: 'ConCentra', description: homeDesc.value, image: homeOg.value }))
)

// Clients section titles
const clientUpperTitle = computed(() => homeData.value?.client_uppertitle || 'Nuestros aliados estratégicos')
const clientTitle = computed(() => homeData.value?.client_title || 'Lorem ipsum dolor sit amet.')
const clientIntro = computed(() => homeData.value?.client_intro || 'Empresas que han puesto sus proyectos tecnológicos en nuestras manos.')
</script>

<template>
    <div>
        <section id="hero" class="relative isolate bg-secondary h-[calc(100vh-116px)] overflow-hidden">
            <Carousel v-model="currentSlide" class="absolute inset-0 h-full w-full" v-bind="heroCarousel">
                <Slide v-for="(f, idx) in slides" :key="idx">
                    <div class="h-full w-full flex items-center justify-center">
                        <img :src="f.image" class="absolute inset-0 h-full w-full object-cover object-center" alt="" />

                        <div
                            class="bg-gradient-to-r from-primary to-transparent h-full w-full absolute inset-0 pointer-events-none">
                        </div>

                        <div class="px-5 mx-auto relative container">
                            <div class="flex items-center justify-start w-full md:w-1/2 lg:w-1/2 max-w-3xl z-10">
                                <transition name="slide-fade" mode="out-in">
                                    <div :key="currentSlide">
                                        <h2 v-if="activeSlide?.title"
                                            class="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-normal text-pretty text-white leading-tight"
                                            v-motion-fadein-up-once :delay="700">
                                            {{ activeSlide?.title }}</h2>
                                        <p v-if="activeSlide?.description"
                                            class="mt-4 sm:mt-6 text-base sm:text-lg font-normal text-pretty text-white"
                                            v-motion-fadein-up-once :delay="800">
                                            {{ activeSlide?.description }}
                                        </p>
                                        <div class="mt-10 flex items-center gap-x-6">
                                            <a v-if="activeSlide?.button_link && activeSlide?.button_text"
                                                :href="activeSlide?.button_link" v-motion-fadein-up-once :delay="900"
                                                class="rounded-full bg-white px-3.5 py-2.5 text-sm font-normal text-secondary shadow-xs hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary transition-colors duration-300 ease-in-out">
                                                {{ activeSlide?.button_text || 'Conocer más' }}
                                            </a>
                                            <a v-if="activeSlide?.link_url && activeSlide?.link_text"
                                                :href="activeSlide?.link_url || '#'" v-motion-fadein-up-once
                                                :delay="1000"
                                                class="text-sm/6 font-normal text-white hover:text-secondary">
                                                {{ activeSlide?.link_text || 'Contáctanos' }}
                                                <span aria-hidden="true">→</span>
                                            </a>
                                        </div>
                                    </div>
                                </transition>
                            </div>
                        </div>
                    </div>
                </Slide>
                <template #addons>
                    <Pagination />
                </template>
            </Carousel>
        </section>

        <section id="services" class="relative isolate bg-muted py-16 lg:py-24 overflow-hidden">
            <client-only>
                <Vue3Lottie animationLink="/Animation-1751023103783.json" height="auto" :width="1280" v-motion="{
                    enter: {
                        opacity: 0,
                        scale: 0.9,
                    },
                    visible: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                            duration: 2000
                        }
                    }
                }" class="absolute -top-4 -right-1/3 transform -translate-y-1/3 translate-x-1/2 inset-x-0 z-0" />
            </client-only>
            <div class="container mx-auto px-5">
                <div class="max-w-4xl mx-auto text-center">
                    <p class="text-base/7 font-semibold text-primary tracking-wider uppercase" v-motion-fadein-up-once>
                        {{ serviceUpperTitle }}
                    </p>
                    <h2 class="mt-2 text-3xl font-semibold tracking-tight text-pretty text-secondary leading-tight sm:text-4xl md:text-5xl"
                        v-motion-fadein-up-once :delay="300">
                        {{ serviceTitle }}
                    </h2>
                </div>
                <div class="mt-16" v-motion-fadein-up-once>
                    <!-- Mobile: Carousel 1 per view -->
                    <div class="block md:hidden">
                        <Carousel v-bind="servicesCarousel">
                            <Slide v-for="(service, index) in services" :key="index">
                                <div
                                    class="group relative rounded-3xl drop-shadow-md shadow-secondary bg-white overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out mx-2">
                                    <h3
                                        class="bg-primary group-hover:bg-secondary transition-colors duration-300 ease-in-out py-4 px-5 w-full uppercase font-bold text-white text-center text-lg">
                                        {{ service.title }}
                                    </h3>
                                    <div class="mt-6">
                                        <img :src="service.image" :alt="service.title"
                                            class="w-full h-24 object-contain object-center transition-transform duration-300 ease-in-out group-hover:scale-105">
                                    </div>
                                    <div class="py-6 px-4 text-center group-hover:bg-muted">
                                        <p class="text-base font-normal text-paragraph px-4 py-2">
                                            {{ service.description }}
                                        </p>
                                    </div>
                                </div>
                            </Slide>
                            <template #addons>
                                <Pagination />
                            </template>
                        </Carousel>
                    </div>

                    <!-- Tablet/Desktop: Grid (md:2, lg:4) -->
                    <div class="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-10">
                        <div v-for="(service, index) in services" :key="index"
                            class="group relative rounded-3xl drop-shadow-md shadow-secondary bg-white overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out">
                            <h3
                                class="bg-primary group-hover:bg-secondary transition-colors duration-300 ease-in-out py-4 px-5 w-full uppercase font-bold text-white text-center text-lg">
                                {{ service.title }}
                            </h3>
                            <div class="mt-6">
                                <img :src="service.image" :alt="service.title"
                                    class="w-full h-24 object-contain object-center transition-transform duration-300 ease-in-out group-hover:scale-105">
                            </div>
                            <div class="py-6 px-4 text-center group-hover:bg-muted">
                                <p class="text-base font-normal text-paragraph px-4 py-2">
                                    {{ service.description }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="stats" class="relative isolate bg-muted py-16 lg:py-36 bg-secondary">

            <client-only>
                <Vue3Lottie animationLink="/Animation-1751030345179.json" height="95vh" width="auto" v-motion="{
                    enter: {
                        opacity: 0,
                        scale: 0.9,
                    },
                    visible: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                            duration: 2000
                        }
                    }
                }" class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 inset-x-0 z-0" />
            </client-only>

            <div class="container mx-auto px-5">
                <div class="max-w-4xl mx-auto text-center">
                    <p class="text-base/7 font-semibold text-white tracking-wider uppercase" v-motion-fadein-up-once>
                        {{ statsUpperTitle }}
                    </p>
                    <h2 class="mt-2 text-3xl font-semibold tracking-tight text-pretty text-white leading-tight sm:text-4xl md:text-5xl"
                        v-motion-fadein-up-once :delay="300">
                        {{ statsTitle }}
                    </h2>
                </div>

                <!-- Mobile/Tablet: Carousel for stats -->
                <div class="mt-12 block lg:hidden">
                    <Carousel v-bind="statsCarousel">
                        <Slide v-for="(stat, index) in stats" :key="index">
                            <div class="text-white text-center space-y-4 px-4">
                                <p class="text-5xl sm:text-6xl uppercase font-bold tracking-tight">{{ stat.value }}</p>
                                <p class="text-xl sm:text-2xl">{{ stat.title }}</p>
                            </div>
                        </Slide>
                        <template #addons>
                            <Pagination />
                        </template>
                    </Carousel>
                </div>

                <!-- Desktop: existing layout -->
                <div class="hidden lg:flex items-center justify-center flex-wrap gap-y-28 gap-x-10 relative mt-24">
                    <div v-for="(stat, index) in stats" :key="index" v-motion-fadein-up-once
                        class="text-white text-center space-y-6 w-1/2 md:w-1/5">
                        <p class="text-6xl uppercase font-bold tracking-tight">{{ stat.value }}</p>
                        <p class="text-2xl">{{ stat.title }}</p>
                    </div>
                </div>
            </div>
        </section>

        <SectionHomeClients :upper-title="clientUpperTitle" :title="clientTitle" :intro="clientIntro" />
    </div>
</template>

<style>
/* Fade transition for images */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Slide-fade transition for content */
.slide-fade-enter-active {
    transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s ease-in;
}

.slide-fade-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

/* Hero carousel navigation styling */
.carousel__next,
.carousel__prev {
    z-index: 20;
    color: white;
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(2px);
    border-radius: 9999px;
}

/* Hero carousel pagination (dots) */
#hero .carousel__pagination {
    position: absolute;
    left: 50%;
    bottom: 1.5rem;
    transform: translateX(-50%);
    z-index: 30;
}

#hero .carousel__pagination li {
    margin: 0 6px;
}

#hero .carousel__pagination li button {
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 9999px;
    width: 10px;
    height: 10px;
}

#hero .carousel__pagination li button:hover,
#hero .carousel__pagination-button--active {
    background-color: var(--color-secondary);
}

/* Keep mobile carousels dots below content */
#services .carousel__pagination,
#stats .carousel__pagination {
    position: static;
    margin-top: 10px;
    display: flex;
    justify-content: center;
}
</style>

<style>
/* Force hero carousel to fill section height */
#hero .carousel,
#hero .carousel__viewport,
#hero .carousel__track,
#hero .carousel__slides,
#hero .carousel__slide {
    height: 100% !important;
}
</style>
