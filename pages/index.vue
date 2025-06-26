<template>
    <div>
        <section class="relative isolate bg-secondary h-screen flex items-center">
            <a href="#next"
                class="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 flex size-10 animate-bounce items-center justify-center rounded-full bg-transparent text-primary p-2 ring-1 ring-primary">
                <svg class="size-6 text-violet-500" fill="none" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="1" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </a>

            <svg class="absolute inset-0 -z-10 size-full stroke-primary-100 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true">
                <defs>
                    <pattern id="0787a7c5-978c-4f66-83c7-11c213f99cb7" width="200" height="200" x="50%" y="-1"
                        patternUnits="userSpaceOnUse">
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" stroke-width="0" fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" />
            </svg>

            <div class="mx-auto max-w-full px-5 grid grid-cols-2 gap-0">
                <div class="flex items-center justify-center">
                    <div>
                        <div class="mt-24 sm:mt-32 lg:mt-16">
                            <div class="inline-flex space-x-4">
                                <button @click="currentFeature = index" v-for="(item, index) in features" :key="index"
                                    v-motion-fadein-up-once :delay="200"
                                    class="rounded-full bg-primary px-3 py-1 text-base font-normal text-white hover:bg-white hover:text-secondary transition-color duration-300 ease-in.out ring-inset">
                                    {{ item.item }}
                                </button>
                            </div>
                        </div>
                        <h1 class="mt-10 text-5xl font-semibold tracking-normal text-pretty text-white sm:text-5xl leading-tight"
                            v-motion-fadein-up-once :delay="700">
                            {{ features[currentFeature].title }}</h1>
                        <p class="mt-8 text-lg font-normal text-pretty text-white sm:text-xl/8"
                            v-motion-fadein-up-once :delay="800">
                            {{ features[currentFeature].description }}
                        </p>
                        <div class="mt-10 flex items-center gap-x-6">
                            <a :href="features[currentFeature].slug" v-motion-fadein-up-once :delay="900"
                                class="rounded-full bg-white px-3.5 py-2.5 text-sm font-normal text-secondary shadow-xs hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary transition-colors duration-300 ease-in-out">Conocer
                                más</a>
                            <a href="#" v-motion-fadein-up-once :delay="1000"
                                class="text-sm/6 font-normal text-white hover:text-primary">Contáctanos <span
                                    aria-hidden="true">→</span></a>
                        </div>
                    </div>
                </div>
            </div>

            <img :src="`/${features[currentFeature].image}`" class="aspect-10/12 h-[105vh] absolute object-contain right-5 top-10" alt=""
                v-motion-fadein-once>
            <span id="next"></span>
        </section>

        <LazySectionHomeClients />

        <LazySectionHomeAbout />

        <LazySectionHomeStats />

        <LazySectionHomeCTA />

        <LazySectionHomeSolutions />

        <LazySectionHomeTeam />

        <LazySectionHomeTestimonials />
    </div>
</template>

<script setup>

const currentFeature = ref(0);
const features = ref([
    {
        item: "IT Consulting",
        title: "Smart IT Management, Simplified.",
        description: "Expertos en consultoría IT para optimizar tus procesos y potenciar tu negocio",
        slug: "it-consulting",
        image: "hero-imagepro.png",
    },
    {
        item: "Software Solutions",
        title: "Lorem ipsum dolor sit amet.",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus ad, illum sequi nostrum beatae odio? Dolorum sed magnam recusandae architecto. Quam.",
        slug: "software-solutions",
        image: "hero-imagepro.png",
    },
    {
        item: "Training",
        title: "Lorem ipsum dolor sit amet dolor.",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus ad, illum sequi nostrum beatae odio? Dolorum sed magnam recusandae architecto. Quam.",
        slug: "training",
        image: "hero-imagepro.png",
    },
    {
        item: "Outsourcing",
        title: "Lorem ipsum dolor sit amet sequi.",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus ad, illum sequi nostrum beatae odio?",
        slug: "outsorcing",
        image: "hero-imagepro.png",
    },
    {
        item: "IT Support",
        title: "Lorem ipsum dolor sit amet illum sequi.",
        description: "illum sequi nostrum beatae odio? Dolorum sed magnam recusandae architecto",
        slug: "it-support",
        image: "hero-imagepro.png",
    },
])


</script>
