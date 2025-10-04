<template>
    <div v-if="waLink" id="whatsapp-btn"
        class="fixed bottom-5 right-5 w-10 md:w-12 h-10 md:h-16 z-10" v-motion="{
            initial: {
                opacity: 0,
            },
            visible: {
                opacity: 1,
                transition: {
                    duration: 500,
                    delay: 500
                }
            }
        }">
        <a :href="waLink" target="_blank" rel="noopener noreferrer">
            <img src="/WhatsApp.svg" alt="">
        </a>
    </div>
</template>

<script setup>
const dataStore = useDataStore()
const cfg = computed(() => dataStore.data?.configs || {})
const phoneDigits = computed(() => String(cfg.value?.whatsapp_number || '').replace(/\D+/g, ''))
const message = computed(() => cfg.value?.whatsapp_message || '')
const waLink = computed(() => {
    if (!phoneDigits.value) return ''
    const base = `https://wa.me/${phoneDigits.value}`
    const q = message.value ? `?text=${encodeURIComponent(message.value)}` : ''
    return base + q
})
</script>
