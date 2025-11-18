<template>
  <div class="relative isolate bg-white">
    <div class="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
      <div class="relative px-6 py-16 lg:static lg:px-8">
        <div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
          <div
            class="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-primary-50 ring-1 ring-primary-100 lg:w-1/2">
            <svg
              class="absolute inset-0 size-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-primary-100"
              aria-hidden="true">
              <defs>
                <pattern id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527" width="200" height="200" x="100%" y="-1"
                  patternUnits="userSpaceOnUse">
                  <path d="M130 200V.5M.5 .5H200" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" stroke-width="0" fill="white" />
              <svg x="100%" y="-1" class="overflow-visible fill-primary-50">
                <path d="M-470.5 0h201v201h-201Z" stroke-width="0" />
              </svg>
              <rect width="100%" height="100%" stroke-width="0" fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
            </svg>
          </div>

          <div>
            <NuxtImg
              :src="items[currentIndex]?.image"
              provider="directus"
              preset="logo"
              class="h-12 w-auto object-contain"
              v-motion-fadein-up-once
              alt=""
              loading="eager" />
          </div>

          <p class="mt-6" v-motion-fadein-up-once>
            {{ items?.[currentIndex]?.intro || 'Completa el formulario y nuestro equipo se pondrá en contacto para coordinar tu demostración.' }}
          </p>
        </div>
      </div>

      <form @submit.prevent="submit" class="px-6 py-16 lg:px-8">
        <div class="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
          <p v-if="successMsg" class="mb-6 rounded-md bg-green-50 text-green-700 px-3 py-2 text-sm">{{ successMsg }}</p>
          <p v-if="errorMsg" class="mb-6 rounded-md bg-red-50 text-red-700 px-3 py-2 text-sm">{{ errorMsg }}</p>
          <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div class="sm:col-span-2" v-if="items.length">
              <label for="item-select" class="block text-sm/6 font-semibold text-secondary">{{ selectLabel }}</label>
              <div class="mt-2.5">
                <select id="item-select" name="item-select" v-model="selectedSlug"
                  class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-secondary outline-1 -outline-offset-1 outline-primary-100 focus:outline-2 focus:-outline-offset-2 focus:outline-primary">
                  <option v-for="s in items" :key="s.slug" :value="s.slug">{{ s.label }}</option>
                </select>
              </div>
            </div>

            <div>
              <label for="first-name" class="block text-sm/6 font-semibold text-secondary">Nombres</label>
              <div class="mt-2.5">
                <input v-model="form.firstName" required type="text" name="first-name" id="first-name"
                  autocomplete="given-name"
                  class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-secondary outline-1 -outline-offset-1 outline-primary-100 placeholder:text-gris-aluminio focus:outline-2 focus:-outline-offset-2 focus:outline-primary" />
              </div>
            </div>
            <div>
              <label for="last-name" class="block text-sm/6 font-semibold text-secondary">Apellidos</label>
              <div class="mt-2.5">
                <input v-model="form.lastName" required type="text" name="last-name" id="last-name"
                  autocomplete="family-name"
                  class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-secondary outline-1 -outline-offset-1 outline-primary-100 placeholder:text-gris-aluminio focus:outline-2 focus:-outline-offset-2 focus:outline-primary" />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="email" class="block text-sm/6 font-semibold text-secondary">Email</label>
              <div class="mt-2.5">
                <input v-model="form.email" required type="email" name="email" id="email" autocomplete="email"
                  class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-secondary outline-1 -outline-offset-1 outline-primary-100 placeholder:text-gris-aluminio focus:outline-2 focus:-outline-offset-2 focus:outline-primary" />
              </div>
            </div>
            <div>
              <label for="phone" class="block text-sm/6 font-semibold text-secondary">Teléfono</label>
              <div class="mt-2.5">
                <input v-model="form.phone" type="text" name="phone" id="phone"
                  class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-secondary outline-1 -outline-offset-1 outline-primary-100 placeholder:text-gris-aluminio focus:outline-2 focus:-outline-offset-2 focus:outline-primary" />
              </div>
            </div>
            <div>
              <label for="company" class="block text-sm/6 font-semibold text-secondary">Empresa</label>
              <div class="mt-2.5">
                <input v-model="form.company" type="text" name="company" id="company"
                  class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-secondary outline-1 -outline-offset-1 outline-primary-100 placeholder:text-gris-aluminio focus:outline-2 focus:-outline-offset-2 focus:outline-primary" />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="message" class="block text-sm/6 font-semibold text-secondary">Mensaje</label>
              <div class="mt-2.5">
                <textarea v-model="form.message" name="message" id="message" rows="4"
                  class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-secondary outline-1 -outline-offset-1 outline-primary-100 placeholder:text-gris-aluminio focus:outline-2 focus:-outline-offset-2 focus:outline-primary"></textarea>
              </div>
            </div>
          </div>
          <div class="mt-8 flex justify-end">
            <button type="submit" :disabled="submitting"
              class="rounded-full bg-primary px-3.5 py-2.5 text-sm font-medium text-white shadow-xs hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary transition-colors duration-300 ease-in-out disabled:opacity-60">
              {{ submitting ? 'Enviando…' : 'Solicitar' }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const dataStore = useDataStore()

const src = computed(() => String(route.query.src || 'solutions'))
const selectedSlug = ref(route.query.item ? String(route.query.item) : '')

const ensureBase = async () => {
  if (!(dataStore.data?.solutions?.length) || !(dataStore.data?.services?.length) || !(dataStore.data?.consultancies?.length)) {
    try {
      const payload = await $fetch('/api/directus/init', { method: 'POST' })
      dataStore.setBaseData(payload)
    } catch { }
  }
}
await ensureBase()

// Page SEO (singleton: booking)
const { data: bookingPage } = await useAsyncData(
  'booking_page',
  () => $fetch('/api/directus/getSingleton', {
    method: 'POST',
    body: { collection: 'booking', fields: ['seo'] }
  }),
  { server: true, lazy: false, default: () => ({}) }
)

useDirectusSeo(
  computed(() => bookingPage.value?.seo),
  { title: 'Agenda una demostración', description: 'Completa el formulario para coordinar tu demo.' }
)

const mapRows = (rows) => (rows || []).map((s) => ({
  label: s.name,
  slug: s.slug,
  image: s.isotipo,
  intro: s.intro || ''
}))

const items = computed(() => {
  if (src.value === 'services') return mapRows(dataStore.data.services)
  if (src.value === 'consultancies') return mapRows(dataStore.data.consultancies)
  return mapRows(dataStore.data.solutions)
})

const selectLabel = computed(() => (src.value === 'services' ? 'Servicio' : src.value === 'consultancies' ? 'Capacitación' : 'Solución'))

const currentIndex = computed(() => {
  const idx = items.value.findIndex((s) => s.slug === selectedSlug.value)
  return idx >= 0 ? idx : 0
})

watch([selectedSlug, src], () => {
  const q = new URLSearchParams({ item: selectedSlug.value || '', src: src.value }).toString()
  const path = '/solicitudes/demo' + (q ? `?${q}` : '')
  navigateTo(path, { replace: true })
})

// form state + submit
const form = reactive({ firstName: '', lastName: '', email: '', phone: '', company: '', message: '' })
const submitting = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

const bookingType = computed(() => src.value === 'services' ? 'service' : src.value === 'consultancies' ? 'Training' : 'solution')

const submit = async () => {
  successMsg.value = ''
  errorMsg.value = ''
  if (!form.firstName || !form.lastName || !form.email || !selectedSlug.value) {
    errorMsg.value = 'Completa los campos requeridos.'
    return
  }
  try {
    submitting.value = true
    await $fetch('/api/directus/createItem', {
      method: 'POST',
      body: {
        collection: 'demo_booking',
        item: {
          status: 'published',
          name: form.firstName,
          lastname: form.lastName,
          email: form.email,
          phone: form.phone,
          company: form.company,
          message: form.message,
          booking_type: bookingType.value,
          item: items.value[currentIndex.value]?.label || ''
        }
      }
    })
    successMsg.value = '¡Gracias! Hemos recibido tu solicitud.'
    // clear
    form.firstName = form.lastName = form.email = form.phone = form.company = form.message = ''
  } catch (e) {
    errorMsg.value = 'No pudimos enviar tu solicitud. Inténtalo de nuevo.'
  } finally {
    submitting.value = false
  }
}
</script>
