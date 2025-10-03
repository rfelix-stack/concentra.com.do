<script setup>
// Terms & Conditions: singleton "terms" with fields: title, content (HTML)
const { data } = await useAsyncData(
  'terms',
  () =>
    $fetch('/api/directus/getSingleton', {
      method: 'POST',
      body: {
        collection: 'terms',
        fields: ['title', 'content']
      }
    }),
  { server: true, lazy: false, default: () => ({}) }
)

const title = computed(() => data.value?.title || 'Términos y Condiciones')
const html = computed(() => data.value?.content || '')
</script>

<template>
  <div class="content">
    <section class="relative isolate bg-muted py-12 lg:py-20">
      <div class="container mx-auto px-5 max-w-5xl">
        <h1 class="text-secondary font-semibold tracking-tight">{{ title }}</h1>
        <div class="mt-8">
          <div class="content max-w-none space-y-6" v-html="html"></div>
        </div>
      </div>
    </section>
  </div>

</template>
