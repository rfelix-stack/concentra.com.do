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
            <transition name="slide-fade" mode="out-in">
                <img :key="currentFeature" :src="`${features[currentFeature].image}`"
                    class="h-full w-full object-center object-cover absolute inset-0" alt="" v-motion-fadein-once>
            </transition>

            <div class="bg-gradient-to-r from-primary to-transparent h-full w-full absolute inset-0"></div>

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

            <div class="mx-auto max-w-full px-16 grid grid-cols-2 gap-0">
                <div class="flex items-center justify-center">
                    <div>
                        <div class="mt-24 sm:mt-32 lg:mt-16">
                            <div class="inline-flex space-x-4">
                                <button @click="currentFeature = index" v-for="(item, index) in features" :key="index"
                                    v-motion-fadein-up-once :delay="200"
                                    class="rounded-full bg-secondary px-3 py-1 text-base font-normal text-white hover:bg-white hover:text-secondary transition-color duration-300 ease-in.out ring-inset">
                                    {{ item.item }}
                                </button>
                            </div>
                        </div>

                        <transition name="slide-fade" mode="out-in">
                            <div :key="currentFeature">
                                <h2 class="mt-10 text-5xl font-semibold tracking-normal text-pretty text-white sm:text-5xl leading-tight"
                                    v-motion-fadein-up-once :delay="700">
                                    {{ features[currentFeature].title }}</h2>
                                <p class="mt-8 text-lg font-normal text-pretty text-white sm:text-xl/8"
                                    v-motion-fadein-up-once :delay="800">
                                    {{ features[currentFeature].description }}
                                </p>
                                <div class="mt-10 flex items-center gap-x-6">
                                    <a :href="features[currentFeature].slug" v-motion-fadein-up-once :delay="900"
                                        class="rounded-full bg-white px-3.5 py-2.5 text-sm font-normal text-secondary shadow-xs hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary transition-colors duration-300 ease-in-out">Conocer
                                        más</a>
                                    <a href="#" v-motion-fadein-up-once :delay="1000"
                                        class="text-sm/6 font-normal text-white hover:text-primary">Contáctanos
                                        <span aria-hidden="true">→</span></a>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>

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
        image: "https://img.freepik.com/fotos-premium/vista-lateral-joven-usando-telefono-movil-mientras-esta-sentado-cafeteria_1048944-21956158.jpg",
    },
    {
        item: "Software Solutions",
        title: "Lorem ipsum dolor sit amet.",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus ad, illum sequi nostrum beatae odio? Dolorum sed magnam recusandae architecto. Quam.",
        slug: "software-solutions",
        image: "https://img.freepik.com/foto-gratis/persona-que-trabaja-html-computadora_23-2150038853.jpg",
    },
    {
        item: "Training",
        title: "Lorem ipsum dolor sit amet dolor.",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus ad, illum sequi nostrum beatae odio? Dolorum sed magnam recusandae architecto. Quam.",
        slug: "training",
        image: "https://img.freepik.com/fotos-premium/holograma-programacion-hombre-equipo-computadora-noche-escribir-codigo-fuente-o-datos-graficos-grupo-desarrollo-software-desarrollador-web-analisis-ciberseguridad-pirateo-bases-datos-graficos_590464-465937.jpg",
    },
    {
        item: "Outsourcing",
        title: "Lorem ipsum dolor sit amet sequi.",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus ad, illum sequi nostrum beatae odio?",
        slug: "outsorcing",
        image: "https://img.freepik.com/foto-gratis/hombre-usando-tableta-trabajar-conectarse-otros_23-2149369110.jpg",
    },
    {
        item: "IT Support",
        title: "Lorem ipsum dolor sit amet illum sequi.",
        description: "illum sequi nostrum beatae odio? Dolorum sed magnam recusandae architecto",
        slug: "it-support",
        image: "https://img.freepik.com/foto-gratis/companeros-trabajo-enfocados-auriculares-escribiendo-computadoras-portatiles_74855-2777.jpg",
    },
]);

let intervalId = null;

// Change featured item
// const nextFeature = () => {
//     currentFeature.value = (currentFeature.value + 1) % features.value.length
// }

// // Setup interval when component mounts
// onMounted(() => {
//     intervalId = setInterval(nextFeature, 3000) // Change every 1 second
// })

// onBeforeUnmount(() => {
//     if (intervalId) clearInterval(intervalId)
// })

</script>
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
    transition: all 0.5s ease-out;
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
</style>