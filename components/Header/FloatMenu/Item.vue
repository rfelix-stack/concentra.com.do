<template>
    <div @mouseenter="setActive" :class="[
        'group relative flex items-center gap-x-4 rounded-lg p-4 text-base cursor-pointer',
        { 'bg-white hover:bg-primary': !item.featured },
        { 'bg-secondary': item.featured },
        isActive && !item.featured ? 'ring-2 ring-primary' : '',
        isActive && item.featured ? 'outline-2 outline-white/60' : ''
    ]">
        <div :class="[
            'flex size-16 lg:size-20 flex-none items-center justify-center rounded-lg',
            { 'bg-primary-50 group-hover:bg-white': !item.featured },
            { 'bg-primary-50 group-hover:bg-primary-50': item.featured },
        ]">
            <svg v-if="item?.icon" class="size-6 text-paragraph group-hover:text-primary" fill="none"
                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
            </svg>
            <img v-if="item?.image" :src="directusAsset(item?.image)" :alt="item?.label"
                class="size-14 lg:size-16 object-contain object-center">
        </div>
        <div class="flex-auto">
            <!-- <NuxtLink :to="item.hash" @click.native="emit('closeDropdown', true)" :class="['block lg:hidden font-semibold font-poppins',
                { 'text-secondary': !item.featured },
                { 'text-white': item.featured },
            ]">
                {{ item?.label }}
                <span class="absolute inset-0"></span>
            </NuxtLink> -->

            <span :class="['hidden lg:block font-semibold font-poppins',
                isActive && !item.featured ? 'text-primary' : '',
                { 'text-secondary group-hover:!text-white': !item.featured },
                { 'text-white': item.featured },
            ]">
                {{ item?.label }}
            </span>
            <p :class="['mt-1 font-normal',
                isActive && !item.featured ? 'text-secondary' : '',
                { 'text-paragraph group-hover:!text-white font-montserrat': !item.featured },
                { 'text-white': item.featured },
            ]">{{ item.intro }}</p>

            <NuxtLink :to="item.hash" @click="emit('closeDropdown', true)" class="absolute inset-0">
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
const dataStore = useDataStore();
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['closeDropdown']);

const isActive = computed(() => {
    const current = dataStore.menuCardItem
    if (!current) return false
    return current?.label === props.item?.label || current?.hash === props.item?.hash
})

const setActive = () => {
    dataStore.setCurrentMenuFloatItem(props.item)
}
</script>
