<template>
    <div class="fixed bottom-5 md:bottom-10 right-5 md:right-10 w-10 md:w-16 h-10 md:h-16 z-10" v-motion="{
        initial: {
            opacity: 0,
            scale: 0.2,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1000,
                delay: 2000
            }
        }
    }">
        <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="">
        </a>
    </div>
</template>

<script setup>

</script>
