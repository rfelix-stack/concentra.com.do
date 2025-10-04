<script setup>
import { directusAsset } from '~/utils/directusAsset'

// Obtener singleton "nosotros" desde Directus
const { data: aboutData } = await useAsyncData(
  'nosotros',
  () =>
    $fetch('/api/directus/getSingleton', {
      method: 'POST',
      body: {
        collection: 'nosotros',
        fields: [
          'title',
          'lead',
          'body',
          'image',
          'seo',
          // Cards (m2a -> card_content)
          'content.collection',
          'content.item.title',
          'content.item.text',
          // Valores (m2a -> card_content)
          'valores.collection',
          'valores.item.title',
          'valores.item.text'
        ]
      }
    }),
  { server: true, lazy: false, default: () => ({}) }
)

// Computed con fallbacks
const heroTitle = computed(() => aboutData.value?.title || 'Quiénes Somos')
const heroLead = computed(
  () =>
    aboutData.value?.lead ||
    'Somos una empresa consultora conformada por expertos de alto prestigio, calificación y capacidad para interactuar de manera interdisciplinaria en las distintas misiones que ejecuta.'
)
const heroBody = computed(() => {
  const raw =
    aboutData.value?.body ||
    'Estamos establecidos desde 2003, siempre trabajando proyectos de mejora de procesos y gestión usando las TIC.\n\nNuestros consultores son expertos de más de 15 años de experiencias con certificaciones de la industria.'
  return String(raw)
    .split(/\n\n|\r\n\r\n|\n|\r\n/g)
    .map((t) => t.trim())
    .filter(Boolean)
})
const heroImage = computed(() => {
  const id = aboutData.value?.image
  return id ? directusAsset(id, { format: 'webp', fit: 'cover', width: 1280 }) : '/outsourcing.jpg'
})

const cards = computed(() => {
  const m2a = Array.isArray(aboutData.value?.content) ? aboutData.value.content : []
  return m2a
    .filter((it) => it?.collection === 'card_content')
    .map((it, idx) => ({
      title: it?.item?.title || '',
      text: it?.item?.text || '',
      // impares -> dark; pares -> light
      variant: (idx + 1) % 2 === 1 ? 'dark' : 'light'
    }))
})

const valores = computed(() => {
  const m2a = Array.isArray(aboutData.value?.valores) ? aboutData.value.valores : []
  return m2a
    .filter((it) => it?.collection === 'card_content')
    .map((it) => ({
      title: it?.item?.title || '',
      text: it?.item?.text || ''
    }))
})

// SEO integration
useDirectusSeo(
  computed(() => aboutData.value?.seo),
  computed(() => ({
    title: heroTitle.value,
    description: heroLead.value,
    image: heroImage.value
  }))
)
</script>

<template>
  <div class="content">
    <!-- Intro / Nuestra historia -->
    <section class="relative isolate bg-muted py-12 lg:py-20">
      <div class="container mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <h1 class="text-secondary font-semibold tracking-tight">{{ heroTitle }}</h1>
          <p class="mt-6 text-xl lg:text-2xl font-semibold text-primary">
            {{ heroLead }}
          </p>
          <div class="mt-6 space-y-4 text-paragraph">
            <p v-for="(p, i) in heroBody" :key="i">{{ p }}</p>
          </div>
        </div>

        <div class="order-first lg:order-none">
          <img :src="heroImage" alt="Equipo Concentra"
            class="w-full h-72 lg:h-[360px] object-cover rounded-3xl shadow-md" />
        </div>
      </div>
    </section>

    <!-- Propósito / Misión / Visión -->
    <section class="relative isolate py-10 lg:py-14">
      <div class="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="(c, idx) in cards" :key="idx" :class="[
          'rounded-3xl p-6 shadow-sm shadow-secondary/10 border',
          c.variant === 'dark' ? 'bg-secondary text-white border-secondary-800' : 'bg-white text-paragraph border-gray-200'
        ]">
          <h3 :class="c.variant === 'dark' ? '!text-white' : '!text-secondary'" class="font-semibold">{{ c.title }}</h3>
          <p class="mt-3 leading-relaxed">{{ c.text }}</p>
        </div>
      </div>
    </section>

    <!-- Valores -->
    <section class="relative isolate bg-muted py-12 lg:py-16">
      <div class="container mx-auto px-5">
        <h2 class="text-secondary font-semibold">Valores</h2>
        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(v, i) in valores" :key="i" class="rounded-2xl bg-white p-6 shadow-sm shadow-secondary/10">
            <h3 class="text-secondary font-semibold">{{ v.title }}</h3>
            <p class="mt-3 text-paragraph">{{ v.text }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
