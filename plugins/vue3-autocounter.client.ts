import { defineNuxtPlugin } from '#app'
import Vue3Autocounter from 'vue3-autocounter'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('vue3-autocounter', Vue3Autocounter)
})