<template>
    <div v-motion-fadein-up-once ref="root">
        <Carousel class="mt-12" v-bind="carouselConfig">
            <!-- Skeletons while loading -->
            <template v-if="loading">
                <Slide v-for="n in 10" :key="`s1-${n}`">
                    <div class="carousel__item relative isolate h-24 md:h-28">
                        <div class="skeleton absolute inset-0 rounded-xl"></div>
                    </div>
                </Slide>
            </template>
            <template v-else>
                <Slide v-for="(logo, index) in logos.slice(0, 10)" :key="index">
                    <div class="carousel__item relative isolate h-24 md:h-28">
                        <NuxtImg
                            :src="logo"
                            provider="directus"
                            preset="thumbnail"
                            alt="Logo"
                            class="max-h-full max-w-full object-contain"
                            loading="lazy" />
                    </div>
                </Slide>
            </template>

            <template #addons>
                <!-- <Navigation /> -->
                <!-- <Pagination /> -->
            </template>
        </Carousel>
        <br>
        <Carousel class="" v-bind="carouselConfig">
            <!-- Skeletons while loading -->
            <template v-if="loading">
                <Slide v-for="n in 10" :key="`s2-${n}`">
                    <div class="carousel__item relative isolate h-24 md:h-28">
                        <div class="skeleton absolute inset-0 rounded-xl"></div>
                    </div>
                </Slide>
            </template>
            <template v-else>
                <Slide v-for="(logo, index) in logos.slice(11, 20)" :key="index">
                    <div class="carousel__item relative isolate h-24 md:h-28">
                        <NuxtImg
                            :src="logo"
                            provider="directus"
                            preset="thumbnail"
                            alt="Logo"
                            class="max-h-full max-w-full object-contain"
                            loading="lazy" />
                    </div>
                </Slide>
            </template>

            <template #addons>
                <!-- <Navigation /> -->
                <!-- <Pagination /> -->
            </template>
        </Carousel>
    </div>
</template>

<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'

const carouselConfig = {
    autoplay: 2000,
    itemsToShow: 2,
    wrapAround: true,
    snapAlign: 'start',
    // gap: '2rem',
    pauseAutoplayOnHover: true,
    breakpoints: {
        640: {
            itemsToShow: 3,
        },
        1024: {
            itemsToShow: 5,
        }
    }
}

const store = useDataStore()
const root = ref(null)
const hasRequested = ref(false)
const loading = ref(false)

const logos = computed(() =>
    (store.data.featuredClients || [])
        .map((c) => c.logo)
        .filter(Boolean)
)

onMounted(() => {
    if (!root.value) return
    const observer = new IntersectionObserver(async (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting && !hasRequested.value) {
            hasRequested.value = true
            try {
                loading.value = true
                await store.fetchFeaturedClients()
            } finally {
                loading.value = false
            }
            observer.disconnect()
        }
    }, { rootMargin: '200px' })
    observer.observe(root.value)
})
</script>

<style>
.carousel__pagination li {
    margin: 0 4px;
}

.carousel__pagination li button {
    background-color: var(--color-primary);
    border-radius: 50%;
    width: 10px;
    height: 10px;

}

.carousel__pagination li button:hover,
.carousel__pagination-button--active {
    background-color: var(--color-secondary);
}

/* Ensure transparent backgrounds for carousel internals */
.carousel,
.carousel__track,
.carousel__slides,
.carousel__slide {
    background: transparent !important;
}

/* Basic skeleton shimmer */
.skeleton {
    background: #eee;
    border-radius: 0.375rem;
    position: relative;
    overflow: hidden;
}

.skeleton::after {
    content: '';
    position: absolute;
    top: 0;
    left: -150px;
    height: 100%;
    width: 150px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
    animation: shimmer 1.2s infinite;
}

@keyframes shimmer {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(300%);
    }
}
</style>
