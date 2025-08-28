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

const services = [
    {
        title: "Prácticas TIC",
        description: "Ayudamos a las organizaciones en la realización de las evaluaciones e implementaciones de gobierno de TIC.",
        image: "/practicas-tic.svg",
        href: "#",
    },
    {
        title: "Prácticas Corporativas",
        description: "Con el objetivo de maximizar la rentabilidad, necesita una estrategia sólida y la capacidad de gestionar.",
        image: "/practicas-corporativas.svg",
        href: "#",
    },
    {
        title: "Outsourcing",
        description: "Nuestro servicio de outsourcing integral ayudará a aumentar la eficiencia y la efectividad de sus servicios.",
        image: "/outsourcing.svg",
        href: "#",
    },
    {
        title: "Software Factory",
        description: "Contamos con un equipo de ingenieros de software expertos en el uso de metodologías y herramientas de desarrollo.",
        image: "software-factory.svg",
        href: "#",
    },
];

const stats = [
    {
        title: "Proyectos",
        value: "200 +",
    },
    {
        title: "Clientes",
        value: "75 +",
    },
    {
        title: "Profesionales",
        value: "5,6 k",
    },
    {
        title: "Años de experiencia",
        value: "2 +",
    },
    {
        title: "Tasas de satisfacción",
        value: "98 %",
    },
    {
        title: "Proyectos internacionales",
        value: "30 +",
    },
    {
        title: "Crecimiento anual",
        value: "40 %",
    },

];
</script>

<template>
    <div>
        <section class="relative isolate bg-secondary h-screen flex items-center">
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

            <a href="#next"
                class="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 flex size-10 animate-bounce items-center justify-center rounded-full bg-transparent text-white p-2 ring-1 ring-white">
                <svg class="size-6 text-violet-500" fill="none" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="1" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </a>

            <div class="px-5 mx-auto relative container">
                <div class="flex items-center justify-start w-full max-w-5xl">
                    <div>
                        <div class="mt-24 sm:mt-32 lg:mt-16">
                            <div class="inline-flex space-x-4">
                                <button @click="currentFeature = index" v-for="(item, index) in features" :key="index"
                                    v-motion-fadein-up-once :delay="200" :class="['rounded-full bg-secondary px-3 py-1 text-base font-normal text-white hover:bg-white hover:text-secondary transition-color duration-300 ease-in.out ring-inset',
                                        { 'bg-white !text-secondary': currentFeature === index }
                                    ]">
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
                                        class="text-sm/6 font-normal text-white hover:text-secondary">Contáctanos
                                        <span aria-hidden="true">→</span></a>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>

            <span id="next"></span>
        </section>

        <section class="relative isolate bg-muted py-16 lg:py-24 overflow-hidden">

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
                        Soluciones y Servicios
                    </p>
                    <h2 class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-secondary leading-tight sm:text-5xl"
                        v-motion-fadein-up-once :delay="300">
                        Mayor productividad a menor coste mediante métodos sistemáticos
                    </h2>
                    <!-- <p class="mt-6 text-xl/8 text-balance text-paragraph font-normal" v-motion-fadein-up-once>
                        Aliquetnec
                        orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget
                        aliquam. Quisque id at vitae feugiat egestas.</p> -->
                </div>
                <div class="mt-16 flex" v-motion-fadein-up-once>

                    <div class="grid grid-cols-2 md:grid-cols-4 gap-10">
                        <div v-for="(service, index) in services" :key="index"
                            class="group relative rounded-3xl drop-shadow-md shadow-secondary bg-white overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out">
                            <a :href="service.href" class="absolute inset-0"></a>
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

                <div class="flex justify-center mt-16">
                    <a href="#"
                        class="rounded-full bg-primary hover:bg-secondary px-3.5 py-2.5 text-lg font-normal text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary transition-colors duration-300 ease-in-out">
                        Conoce más
                    </a>
                </div>
            </div>
        </section>

        <section class="relative isolate bg-muted py-16 lg:py-36 bg-secondary">

            <client-only>
                <Vue3Lottie animationLink="/Animation-1751030345179.json" height="95vh" :width="auto" v-motion="{
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
                        Nuestros números
                    </p>
                    <h2 class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white leading-tight sm:text-5xl"
                        v-motion-fadein-up-once :delay="300">
                        Lorem ipsum dolor sit amet.
                    </h2>
                </div>

                <div class="mt-16 lg:mt-32 flex items-center justify-center flex-wrap gap-y-28 gap-x-10 relative">
                    <div v-for="(stat, index) in stats" :key="index" v-motion-fadein-up-once
                        class="text-white text-center space-y-6 w-1/2 md:w-1/5">
                        <p class="text-6xl uppercase font-bold tracking-tight">{{ stat.value }}</p>

                        <p class="text-2xl">{{ stat.title }}</p>
                    </div>
                </div>
            </div>
        </section>

        <SectionHomeClients />
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