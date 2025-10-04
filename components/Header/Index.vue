<template>
    <!-- <header v-motion-fadein-down-enter :duration="1000" -->
    <header
        class="z-40 bg-white fixed transform top-0 -translate-x-1/2 left-1/2 drop-shadow-xs shadow-sm shadow-primary/5 w-full">
        <nav class="mx-auto flex items-center coverer justify-between px-5 py-8 space-x-10" aria-label="Global">
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
                            <template v-for="(item, i) in menu" :key="`m-${i}`">
                                <NuxtLink v-if="!item.float" :to="item.hash" @click="closeMobile"
                                    :class="['flex w-full items-center gap-3 uppercase tracking-wide text-paragraph rounded-lg px-3 py-2 hover:bg-gray-50', isActive(item.hash) && 'bg-gray-50']">
                                    {{ item.label }}
                                </NuxtLink>
                                <div v-else>
                                    <button type="button"
                                        :class="['flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50', isGroupActive(item) && 'bg-gray-50']"
                                        @click="openFloat[i] = !openFloat[i]">
                                        <span
                                            class="flex w-full items-center gap-3 uppercase font-medium tracking-wide text-paragraph rounded-lg hover:bg-gray-50">{{
                                            item.label }}</span>
                                        <svg class="size-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd"
                                                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z" />
                                        </svg>
                                    </button>
                                    <ul v-show="openFloat[i]" class="mt-2 grid grid-cols-1 gap-2">
                                        <li v-for="(opt, j) in item.options" :key="`m-sub-${i}-${j}`">
                                            <NuxtLink :to="opt.hash" @click="closeMobile"
                                                :class="['flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50', isActive(opt.hash) && 'bg-gray-50 text-primary font-medium']">
                                                <img v-if="opt.image"
                                                    :src="directusAsset(opt.image, { width: 45, height: 45, fit: 'cover' })"
                                                    :alt="opt.label" class="h-7 w-7 object-cover" />
                                                <span class="text-base text-paragraph">{{ opt.label }}</span>
                                            </NuxtLink>
                                        </li>
                                    </ul>
                                </div>
                            </template>

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

// collapsible state (mobile float groups)
const openFloat = reactive<Record<number, boolean>>({})

const closeMobile = () => { mobileOpen.value = false }

const isActive = (path: string) => {
    if (!path) return false
    if (path === '/') return route.path === '/'
    return route.path === path || route.path.startsWith(path + '/')
}

const isGroupActive = (item: any) => {
    if (!item?.options) return false
    return item.options.some((o: any) => isActive(o.hash))
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
        },
        {
            float: false,
            label: 'Contacto',
            hash: '/contacto'
        },
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
