ƒ<template>
    <div ref="dropdownRef" class="w-full">
        <button @click.prevent="toggleDropdown" type="button"
            class="flex items-center gap-x-1 text-lg lg:text-xl font-normal text-paragraph font-poppins" aria-expanded="false">
            {{ item.label }}
            <svg class="size-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                data-slot="icon">
                <path fill-rule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd" />
            </svg>
        </button>

        <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
            <div v-if="isOpen" :class="[
                'absolute top-full left-1/2 transform -translate-x-1/2 z-10 w-full overflow-hidden bg-white ring-1 shadow-lg ring-primary/5',
            ]">
                <div class="grid grid-cols-3 gap-10">
                    <div :class="[
                        'p-4 col-span-2 h-[75vh] overflow-y-auto',
                        { 'grid grid-cols-2 gap-4': item.grid }
                    ]">
                        <HeaderFloatMenuItem v-for="(subitem, index) in featuredItems" :key="index" :item="subitem"
                            @close-dropdown="toggleDropdown" />
                        <HeaderFloatMenuItem v-for="(subitem, index) in normalItems" :key="index" :item="subitem"
                            @close-dropdown="toggleDropdown" />
                    </div>

                    <div class="col-span-1 p-5">
                        <div class="bg-primary-100 rounded-3xl h-full">

                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});

const featuredItems = computed(() => {
    return props.item.options.filter((item) => item.featured);
});
const normalItems = computed(() => {
    return props.item.options.filter((item) => !item.featured);
});

const isOpen = ref(false);

const dropdownRef = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
