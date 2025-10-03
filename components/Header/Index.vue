<template>
    <!-- <header v-motion-fadein-down-enter :duration="1000" -->
    <header
        class="z-40 bg-white fixed transform top-0 -translate-x-1/2 left-1/2 drop-shadow-xs shadow shadow-primary/5 w-full">
        <nav class="mx-auto flex items-center container justify-between px-5 py-8 space-x-10" aria-label="Global">
            <div class="flex lg:flex-1">
                <NuxtLink to="/" class="-m-1.5 p-1.5">
                    <span class="sr-only">Concentra</span>
                    <Logo class="h-10 lg:h-14 w-auto" />
                </NuxtLink>
            </div>

            <div class="hidden xl:flex lg:gap-x-8 xl:gap-x-10 mr-0">
                <ClientOnly v-for="(item, index) in menu" :key="index">
                    <NuxtLink v-if="!item.float" :to="item.hash"
                        :class="['text-lg lg:text-xl font-normal font-poppins', isActive(item.hash) ? 'text-primary underline underline-offset-8' : 'text-paragraph']">
                        {{ item.label }}
                    </NuxtLink>
                    <HeaderFloatMenu v-else :item="item" />
                </ClientOnly>
            </div>

            <div class="flex lg:flex-1 lg:justify-end">
                <NuxtLink to="/solicitudes/empleo"
                    class="hidden sm:flex items-center justify-center rounded-full bg-primary px-3.5 py-2.5 text-lg lg:text-xl font-normal
                     text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary transition-colors duration-300 ease-in-out">
                    ¡Empléate!
                </NuxtLink>

                <button type="button" @click="mobileOpen = true"
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
        <!-- Mobile off-canvas menu (teleport to body to avoid header transform clipping) -->
        <transition name="fade">
            <Teleport to="body">
                <div v-if="mobileOpen" class="fixed inset-0 z-50 xl:hidden">
                    <div class="absolute inset-0 bg-black/40" @click="mobileOpen = false"></div>
                    <div
                        class="absolute inset-y-0 right-0 w-full sm:max-w-sm bg-white shadow-xl ring-1 ring-gray-200 px-5 py-8 overflow-y-auto">
                        <div class="flex items-center justify-between">
                            <NuxtLink to="/" class="-m-1.5 p-1.5">
                                <span class="sr-only">Concentra</span>
                                <Logo class="h-10 w-auto" />
                            </NuxtLink>
                            <button type="button"
                                class="inline-flex items-center justify-center rounded-md p-2.5 text-primary"
                                @click="mobileOpen = false">
                                <span class="sr-only">Cerrar menú</span>
                                <svg class="size-8 md:size-10" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <nav class="mt-4 space-y-6">
                            <NuxtLink to="/nosotros" @click="closeMobile"
                                :class="['flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50', isActive('/nosotros') && 'bg-gray-50 text-primary font-medium']">
                                Nosotros</NuxtLink>

                            <div>
                                <button type="button"
                                    :class="['flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50', isActive('/soluciones') && 'bg-gray-50']"
                                    @click="open.solutions = !open.solutions">
                                    <span
                                        class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Soluciones</span>
                                    <svg class="size-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <ul v-show="open.solutions" class="mt-2 grid grid-cols-1 gap-2">
                                    <li v-for="(s, i) in solutions" :key="`m-sol-${i}`">
                                        <NuxtLink :to="`/soluciones/${s.slug}`" @click="closeMobile"
                                            :class="['flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50', isActive(`/soluciones/${s.slug}`) && 'bg-gray-50 text-primary font-medium']">
                                            <img v-if="s.isotipo"
                                                :src="directusAsset(s.isotipo, { width: 28, height: 28, fit: 'contain' })"
                                                :alt="s.name" class="h-7 w-7 object-contain" />
                                            <span class="text-base text-paragraph">{{ s.name }}</span>
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <button type="button"
                                    :class="['flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50', isActive('/servicios') && 'bg-gray-50']"
                                    @click="open.services = !open.services">
                                    <span
                                        class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Servicios</span>
                                    <svg class="size-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <ul v-show="open.services" class="mt-2 grid grid-cols-1 gap-2">
                                    <li v-for="(s, i) in services" :key="`m-serv-${i}`">
                                        <NuxtLink :to="`/servicios/${s.slug}`" @click="closeMobile"
                                            :class="['flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50', isActive(`/servicios/${s.slug}`) && 'bg-gray-50 text-primary font-medium']">
                                            <img v-if="s.isotipo"
                                                :src="directusAsset(s.isotipo, { width: 28, height: 28, fit: 'contain' })"
                                                :alt="s.name" class="h-7 w-7 object-contain" />
                                            <span class="text-base text-paragraph">{{ s.name }}</span>
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <button type="button"
                                    :class="['flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50', isActive('/consultorias') && 'bg-gray-50']"
                                    @click="open.consultancies = !open.consultancies">
                                    <span
                                        class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Capacitaciones</span>
                                    <svg class="size-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <ul v-show="open.consultancies" class="mt-2 grid grid-cols-1 gap-2">
                                    <li v-for="(c, i) in consultancies" :key="`m-cons-${i}`">
                                        <NuxtLink :to="`/consultorias/${c.slug}`" @click="closeMobile"
                                            :class="['flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50', isActive(`/consultorias/${c.slug}`) && 'bg-gray-50 text-primary font-medium']">
                                            <img v-if="c.isotipo"
                                                :src="directusAsset(c.isotipo, { width: 28, height: 28, fit: 'contain' })"
                                                :alt="c.name" class="h-7 w-7 object-contain" />
                                            <span class="text-base text-paragraph">{{ c.name }}</span>
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </div>

                            <div class="pt-4">
                                <NuxtLink to="/solicitudes/empleo" @click="closeMobile"
                                    class="block w-full text-center rounded-full bg-primary px-4 py-3 text-white shadow-xs">
                                    ¡Empléate!</NuxtLink>
                            </div>
                        </nav>
                    </div>
                </div>
            </Teleport>
        </transition>
    </header>
</template>

<script setup lang="ts">

const dataStore = useDataStore();
const mobileOpen = ref(false)
import { directusAsset } from '~/utils/directusAsset'
const route = useRoute()

// expose lists for mobile menu
const solutions = computed(() => dataStore.data.solutions ?? [])
const services = computed(() => dataStore.data.services ?? [])
const consultancies = computed(() => dataStore.data.consultancies ?? [])

// collapsible state
const open = reactive({ solutions: false, services: false, consultancies: false })

const closeMobile = () => { mobileOpen.value = false }

const isActive = (path: string) => {
    if (!path) return false
    if (path === '/') return route.path === '/'
    return route.path === path || route.path.startsWith(path + '/')
}

type MENU = {
    id: number
    name: string
    slug: string
    intro?: string | null
    isotipo?: any
    featured?: boolean
    card_title?: string | null
    card_intro?: string | null
    card_image?: any
}

const menu = computed(() => {
    const solutions = dataStore.data.solutions ?? []
    const services = dataStore.data.services ?? []
    const consultancies = dataStore.data.consultancies ?? []

    return [
        {
            float: false,
            label: 'Nosotros',
            hash: '/nosotros'
        },
        {
            float: true,
            grid: true,
            label: 'Soluciones',
            hash: '#',
            options: solutions.map((s) => ({
                label: s.name,
                hash: `/soluciones/${s.slug}`,
                icon: false,
                intro: s.intro || '',
                image: s.isotipo,
                featured: s.featured,
                card_title: s.card_title,
                card_intro: s.card_intro,
                card_image: s.card_image
            })),
            ctas: [
                { label: 'Soluciones', hash: '#', icon: '' },
                { label: 'Contácta con ventas', hash: '#', icon: '' }
            ]
        },
        {
            float: true,
            grid: false,
            label: 'Servicios',
            hash: '#',
            options: services.map((s) => ({
                label: s.name,
                hash: `/servicios/${s.slug}`,
                icon: false,
                intro: s.intro || '',
                image: s.isotipo,
                featured: s.featured,
                card_title: s.card_title,
                card_intro: s.card_intro,
                card_image: s.card_image
            })),
            ctas: [
                { label: 'Servicios', hash: '#', icon: '' },
                { label: 'Contácta con ventas', hash: '#', icon: '' }
            ]
        },
        {
            float: true,
            grid: false,
            label: 'Consultorías',
            hash: '#',
            options: consultancies.map((s) => ({
                label: s.name,
                hash: `/consultorias/${s.slug}`,
                icon: false,
                intro: s.intro || '',
                image: s.isotipo,
                featured: s.featured,
                card_title: s.card_title,
                card_intro: s.card_intro,
                card_image: s.card_image
            })),
            ctas: [
                { label: 'Consultorías', hash: '#', icon: '' },
                { label: 'Contácta con ventas', hash: '#', icon: '' }
            ]
        }
    ]
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
