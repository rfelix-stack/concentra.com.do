<template>
    <header v-motion-fadein-down-enter :duration="1000"
        class="z-40 bg-white fixed transform top-0 -translate-x-1/2 left-1/2 drop-shadow-xs shadow shadow-primary/5 w-full">
        <nav class="mx-auto flex items-center container justify-between px-5 py-8 space-x-10" aria-label="Global">
            <div class="flex lg:flex-1">
                <NuxtLink to="/" class="-m-1.5 p-1.5">
                    <span class="sr-only">Concentra</span>
                    <Logo class="h-8 lg:h-14 w-auto" />
                </NuxtLink>
                V2
            </div>
            <div class="hidden xl:flex lg:gap-x-12 mr-0">
                <client-only v-for="(item, index) in menu" :key="index">
                    <a v-if="!item.float" href="#" class="text-lg lg:text-xl font-normal text-paragraph font-poppins">{{
                        item.label }}</a>
                    <HeaderFloatMenu v-else :item="item" />
                </client-only>
            </div>
            <div class="flex lg:flex-1 lg:justify-end">
                <NuxtLink to="/solicitudes/empleo"
                    class="hidden sm:flex rounded-full bg-primary px-3.5 py-2.5 text-lg lg:text-xl font-normal
                     text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary transition-colors duration-300 ease-in-out">
                    ¡Empléate!
                </NuxtLink>

                <button type="button"
                    class="xl:hidden inline-flex items-center justify-center rounded-md p-2.5 text-primary">
                    <span class="sr-only">Open main menu</span>
                    <svg class="size-8 md:size-10" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" aria-hidden="true" data-slot="icon">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
        </nav>

        <!-- Mobile menu, show/hide based on menu open state. -->
        <!-- <div class="lg:hidden" role="dialog" aria-modal="true">
            <div class="fixed inset-0 z-10"></div>
            <div
                class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div class="flex items-center justify-between">
                    <NuxtLink to="/" class="-m-1.5 p-1.5">
                        <span class="sr-only">ConCentra</span>
                        <Logo class="h-8 w-auto" />
                    </NuxtLink>
                    <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
                        <span class="sr-only">Close menu</span>
                        <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            aria-hidden="true" data-slot="icon">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="mt-6 flow-root">
                    <div class="-my-6 divide-y divide-gray-500/10">
                        <div class="space-y-2 py-6">
                            <div class="-mx-3">
                                <button type="button"
                                    class="flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                    aria-controls="disclosure-1" aria-expanded="false">
                                    Product
                                    <svg class="size-5 flex-none" viewBox="0 0 20 20" fill="currentColor"
                                        aria-hidden="true" data-slot="icon">
                                        <path fill-rule="evenodd"
                                            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <div class="mt-2 space-y-2" id="disclosure-1">
                                    <a href="#"
                                        class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Analytics</a>
                                    <a href="#"
                                        class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Engagement</a>
                                    <a href="#"
                                        class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Security</a>
                                    <a href="#"
                                        class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Integrations</a>
                                    <a href="#"
                                        class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Automations</a>
                                    <a href="#"
                                        class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Watch
                                        demo</a>
                                    <a href="#"
                                        class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Contact
                                        sales</a>
                                </div>
                            </div>
                            <a href="#"
                                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Features</a>
                            <a href="#"
                                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Marketplace</a>
                            <a href="#"
                                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Company</a>
                        </div>
                        <div class="py-6">
                            <a href="#"
                                class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Log
                                in</a>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </header>
</template>

<script setup>
const solutions = useSolutionsStore();
const mainStore = useMainStore();

if (!solutions.loaded) {
    await solutions.fetchAll()
}

const menu = computed(() => {
    return [
        {
            float: false,
            label: "Nosotros",
            hash: "#"
        },
        {
            float: true,
            grid: true,
            label: "Soluciones",
            hash: "#",
            options: solutions.list.map(s => ({
                label: s.name,
                hash: `/soluciones/${s.slug}`,
                icon: false,
                intro: s.intro || "",
                image: s.isotipo,
                featured: s.featured,
                card: {
                    title: s.card_title,
                    intro: s.card_intro,
                    image: s.card_image
                }
            })),
            ctas: [
                {
                    label: "Soluciones",
                    hash: "#",
                    icon: ""
                },
                {
                    label: "Contácta con ventas",
                    hash: "#",
                    icon: ""
                }
            ]
        },
        {
            float: true,
            grid: false,
            label: "Servicios",
            hash: "#",
            options: [
                {
                    label: "Outsoursing",
                    hash: "/servicios/outsourcing",
                    featured: false,
                    icon: true,
                    intro: "Aumentar la eficiencia y la efectividad de tus servicios."
                },
                {
                    label: "Soporte técnico",
                    hash: "/servicios/soporte-tecnico",
                    featured: false,
                    icon: true,
                    intro: "Profesionales técnicos especializados en HW y SW con una elevada preparación y experiencia."
                },
                {
                    label: "Software factory",
                    hash: "/servicios/software-factory",
                    featured: false,
                    icon: true,
                    intro: "Desarrollo de productos o en proyectos para la obtención de aplicaciones a medida de las necesidades de nuestros clientes."
                },
            ],
            ctas: [
                {
                    label: "Lorem impsum",
                    hash: "#",
                    icon: ""
                },
                {
                    label: "Contáctanos",
                    hash: "#",
                    icon: ""
                }
            ]
        },
        {
            float: true,
            grid: false,
            label: "Consultorías",
            hash: "#",
            options: [
                {
                    label: "Prácticas TIC",
                    hash: "#",
                    icon: true,
                    intro: "Ayuda a implementar modelos y estándares para un buen gobierno de los procesos y decisiones empresariales."
                },
                {
                    label: "Prácticas corporativas",
                    hash: "#",
                    icon: true,
                    intro: "Consultoría integrada para la excelencia en la gestión y en el desempeño que habilita las organizaciones para pensar y actuar estratégicamente."
                },
            ],
            ctas: [
                {
                    label: "Nuestros clientes",
                    hash: "#",
                    icon: ""
                },
                {
                    label: "Contáctanos",
                    hash: "#",
                    icon: ""
                }
            ]
        },
        {
            float: false,
            label: "Capacitación",
            hash: "#"
        }
    ]
})
</script>