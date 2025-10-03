<template>
  <section class="grid grid-flow-dense gap-4
           grid-cols-[repeat(auto-fill,minmax(9rem,1fr))]
           auto-rows-[8rem]">
    <article v-motion-fadein-up-once :delay="1000" v-for="c in clients" :key="c.nombre" @click="toggle(c)" :class="[
      // estilos compartidos
      'relative cursor-pointer rounded-xl bg-white shadow transition',
      'flex items-center justify-center p-4 overflow-hidden',

      // si está seleccionada = crece
      isSelected(c)
        ? 'col-span-2 sm:col-span-3 row-span-2 h-auto'
        : 'hover:ring-2 hover:ring-primary-400'
    ]">
      <!-- TARJETA SIN SELECCIONAR = solo logo -->
      <template v-if="!isSelected(c)">
        <NuxtImg :src="c.logo" format="webp" :alt="`Logo de ${c.nombre}`"
          class="max-h-full max-w-full object-contain text-xs text-paragraph/15" />
      </template>

      <!-- TARJETA EXPANDIDA -->
      <template v-else>
        <!-- botón cerrar -->
        <button @click.stop="selected = null" class="absolute top-2 right-2 text-gray-500 hover:text-black">
          ✕
        </button>

        <div class="flex flex-col items-center text-center gap-2 w-full">
          <NuxtImg v-if="c?.logo" :src="c.logo" format="webp" :alt="`Logo de ${c?.nombre}`"
            class="w-24 h-auto object-contain" />

          <h3 class="text-base font-semibold">{{ c?.nombre }}</h3>

          <ul class="text-sm space-y-0.5">
            <li v-if="c?.segmento"><strong>Segmento:</strong> {{ c.segmento }}</li>
            <li v-if="c?.productos"><strong>Productos:</strong> {{ c.productos }}</li>
            <li v-if="c?.pais"><strong>País:</strong> {{ c.pais }}</li>
            <li v-if="c?.vendedor"><strong>Vendedor:</strong> {{ c.vendedor }}</li>
          </ul>
        </div>
      </template>
    </article>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Client {
  nombre: string
  logo: string
  segmento: string
  productos: string
  pais: string
  vendedor: string
}

const props = defineProps<{ clients: Client[] }>()
const selected = ref<Client | null>(null)

function toggle(client: Client) {
  selected.value = isSelected(client) ? null : client
}
function isSelected(client: Client) {
  return selected.value?.nombre === client.nombre
}
</script>

<style scoped>
/* Entradas / salidas suaves (opcional) */
article {
  transition-property: transform, box-shadow, grid-column, grid-row;
  transition-duration: 250ms;
  transition-timing-function: ease;
}
</style>
