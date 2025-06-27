<template>
    <div v-motion-fadein-up-once>
        <Carousel class="mt-12" v-bind="carouselConfig">
            <Slide v-for="(logo, index) in logos.slice(0, 10)" :key="index">
                <div class="carousel__item">
                    <a href="https://google.com" target="_blank" rel="noopener noreferrer">
                        <img class="w-full object-contain" :delay="200" :src="logo" alt="Logo name">
                    </a>
                </div>
            </Slide>

            <template #addons>
                <!-- <Navigation /> -->
                <!-- <Pagination /> -->
            </template>
        </Carousel>
        <Carousel class="" v-bind="carouselConfig">
            <Slide v-for="(logo, index) in logos.slice(11, 20)" :key="index">
                <div class="carousel__item">
                    <a href="https://google.com" target="_blank" rel="noopener noreferrer">
                        <img class="w-full max-h-32 object-contain" :delay="200" :src="logo" alt="Logo name">
                    </a>
                </div>
            </Slide>

            <template #addons>
                <!-- <Navigation /> -->
                <!-- <Pagination /> -->
            </template>
        </Carousel>
    </div>
</template>

<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'

const carouselConfig = {
    autoplay: 2000,
    itemsToShow: 2,
    wrapAround: true,
    snapAlign: 'start',
    // gap: '2rem',
    pauseAutoplayOnHover: true,
    breakpoints: {
        640: {
            itemsToShow: 3,
        },
        1024: {
            itemsToShow: 5,
        }
    }
}

const logos = [
    "https://concentra.com.do/images/clientes/45.jpg",
    "https://concentra.com.do/images/clientes/46.jpg",
    "https://concentra.com.do/images/clientes/39.jpg",
    "https://concentra.com.do/images/clientes/13.jpg",
    "https://concentra.com.do/images/clientes/22.jpg",
    "https://concentra.com.do/images/clientes/32.jpg",
    "https://concentra.com.do/images/clientes/21.jpg",
    "https://concentra.com.do/images/clientes/5.jpg",
    "https://concentra.com.do/images/clientes/9.jpg",
    // "https://concentra.com.do/images/clientes/44.jpg",
    "https://concentra.com.do/images/clientes/24.jpg",
    "https://concentra.com.do/images/clientes/3.jpg",
    "https://concentra.com.do/images/clientes/2.jpg",
    "https://concentra.com.do/images/clientes/6.jpg",
    "https://concentra.com.do/images/clientes/7.jpg",
    "https://concentra.com.do/images/clientes/8.jpg",
    "https://concentra.com.do/images/clientes/9.jpg",
    "https://concentra.com.do/images/clientes/10.jpg",
    "https://concentra.com.do/images/clientes/11.jpg",
    "https://concentra.com.do/images/clientes/12.jpg",
    "https://concentra.com.do/images/clientes/13.jpg",
    "https://concentra.com.do/images/clientes/14.jpg",
    "https://concentra.com.do/images/clientes/15.jpg",
    "https://concentra.com.do/images/clientes/16.jpg",
    "https://concentra.com.do/images/clientes/17.jpg",
    "https://concentra.com.do/images/clientes/18.jpg",
    "https://concentra.com.do/images/clientes/19.jpg",
    "https://concentra.com.do/images/clientes/20.jpg",
    "https://concentra.com.do/images/clientes/21.jpg",
    "https://concentra.com.do/images/clientes/22.jpg",
    "https://concentra.com.do/images/clientes/23.jpg",
    "https://concentra.com.do/images/clientes/24.jpg",
    "https://concentra.com.do/images/clientes/25.jpg",
    "https://concentra.com.do/images/clientes/26.jpg",
    "https://concentra.com.do/images/clientes/27.jpg",
    "https://concentra.com.do/images/clientes/28.jpg",
    "https://concentra.com.do/images/clientes/29.jpg",
    "https://concentra.com.do/images/clientes/30.jpg",
    "https://concentra.com.do/images/clientes/31.jpg",
    "https://concentra.com.do/images/clientes/32.jpg",
    "https://concentra.com.do/images/clientes/33.jpg",
    "https://concentra.com.do/images/clientes/34.jpg"
];
</script>

<style>
.carousel__pagination li {
    margin: 0 4px;
}

.carousel__pagination li button {
    background-color: var(--color-primary);
    border-radius: 50%;
    width: 10px;
    height: 10px;

}

.carousel__pagination li button:hover,
.carousel__pagination-button--active {
    background-color: var(--color-secondary);
}
</style>
