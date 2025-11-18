<script setup>
const dataStore = useDataStore();
const emit = defineEmits(['closeDropdown']);
</script>

<template>
    <div v-if="dataStore.menuCardItem" class="bg-white shadow-sm shadow-secondary/15 rounded-3xl">
        <div class="h-72 overflow-hidden rounded-t-lg">
            <NuxtImg
                :src="dataStore.menuCardItem?.card_image"
                provider="directus"
                preset="hero"
                sizes="sm:300px md:400px"
                :alt="dataStore.menuCardItem?.card_title"
                class="h-full w-full object-cover object-center"
                loading="lazy" />
        </div>

        <div class="p-5">
            <div>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-secondary">
                    {{ dataStore.menuCardItem?.card_title }}
                </h5>
                <p class="mb-3 font-normal text-paragraph">
                    {{ dataStore.menuCardItem?.card_intro }}
                </p>
            </div>
            <!-- <div class="mt-16">
                <a :href="dataStore.menuCardItem?.hash" @click.native="emit('closeDropdown', true)"
                    class="hidden sm:flex items-center justify-center rounded-full bg-primary hover:bg-secondary px-3.5 py-2.5 text-lg lg:text-xl font-normal
                     text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary transition-colors duration-300 ease-in-out">
                    Conocer más
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div> -->
        </div>
    </div>
</template>