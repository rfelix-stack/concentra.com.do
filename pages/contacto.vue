<template>
  <div class="relative isolate bg-white">
    <div class="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
      <div class="relative px-6 py-16 lg:static lg:px-8">
        <div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
          <div class="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-primary-50 ring-1 ring-primary-100 lg:w-1/2">
            <svg class="absolute inset-0 size-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-primary-100" aria-hidden="true">
              <defs>
                <pattern id="contacto-pattern" width="200" height="200" x="100%" y="-1" patternUnits="userSpaceOnUse">
                  <path d="M130 200V.5M.5 .5H200" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" stroke-width="0" fill="white" />
              <svg x="100%" y="-1" class="overflow-visible fill-primary-50">
                <path d="M-470.5 0h201v201h-201Z" stroke-width="0" />
              </svg>
              <rect width="100%" height="100%" stroke-width="0" fill="url(#contacto-pattern)" />
            </svg>
          </div>
          <h1 class="text-4xl font-semibold tracking-tight text-pretty text-secondary sm:text-5xl" v-motion-fadein-up-once>
            Contáctanos
          </h1>
          <p class="mt-6" v-motion-fadein-up-once>
            ¿Tienes alguna consulta o requieres información? Completa el formulario y nuestro equipo se pondrá en contacto contigo.
          </p>
          <dl class="mt-10 space-y-4 text-base/7 text-gray-600">
            <div class="flex gap-x-4" v-motion-fadein-up-once>
              <dt class="flex-none">
                <span class="sr-only">Dirección</span>
                <svg class="h-7 w-6 text-paragraph" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                </svg>
              </dt>
              <dd>
                Acrópolis Center, Piso 8, <br />
                Av. Winston Churchill, esquina Av. Rafael A. Sanchez <br />
                Santo Domingo, República Dominicana
              </dd>
            </div>
            <div class="flex gap-x-4" v-motion-fadein-up-once>
              <dt class="flex-none">
                <span class="sr-only">Teléfono</span>
                <svg class="h-7 w-6 text-paragraph" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </dt>
              <dd><a class="hover:text-secondary" href="tel:+1 809-731-8115">+1 809-731-8115</a></dd>
            </div>
            <div class="flex gap-x-4" v-motion-fadein-up-once>
              <dt class="flex-none">
                <span class="sr-only">Email</span>
                <svg class="h-7 w-6 text-paragraph" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15A2.25 2.25 0 0 1 2.25 17.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </dt>
              <dd><a class="hover:text-secondary" href="mailto:info@concentra.com.do">info@concentra.com.do</a></dd>
            </div>
          </dl>
        </div>
      </div>

      <form @submit.prevent="submit" class="px-6 py-16 sm:py-24 lg:px-8">
        <div class="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
          <h2 class="text-2xl font-semibold tracking-tight text-secondary">Escríbenos</h2>

          <p v-if="successMsg" class="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-700">{{ successMsg }}</p>
          <p v-if="errorMsg" class="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{{ errorMsg }}</p>

          <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
            <div>
              <label for="name" class="block text-sm/6 font-semibold text-secondary">Nombre</label>
              <div class="mt-2.5">
                <input v-model="form.name" type="text" id="name" name="name" autocomplete="given-name" required
                  class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-secondary outline-1 -outline-offset-1 outline-primary-100 placeholder:text-paragraph focus:outline-2 focus:-outline-offset-2 focus:outline-primary" />
              </div>
            </div>

            <div>
              <label for="lastname" class="block text-sm/6 font-semibold text-secondary">Apellido</label>
              <div class="mt-2.5">
                <input v-model="form.lastname" type="text" id="lastname" name="lastname" autocomplete="family-name" required
                  class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-secondary outline-1 -outline-offset-1 outline-primary-100 placeholder:text-paragraph focus:outline-2 focus:-outline-offset-2 focus:outline-primary" />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="email" class="block text-sm/6 font-semibold text-secondary">Email</label>
              <div class="mt-2.5">
                <input v-model="form.email" type="email" id="email" name="email" autocomplete="email" required
                  class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-secondary outline-1 -outline-offset-1 outline-primary-100 placeholder:text-paragraph focus:outline-2 focus:-outline-offset-2 focus:outline-primary" />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="phone" class="block text-sm/6 font-semibold text-secondary">Teléfono</label>
              <div class="mt-2.5">
                <input v-model="form.phone" type="tel" id="phone" name="phone" autocomplete="tel" 
                  class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-secondary outline-1 -outline-offset-1 outline-primary-100 placeholder:text-paragraph focus:outline-2 focus:-outline-offset-2 focus:outline-primary" />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="message" class="block text-sm/6 font-semibold text-secondary">Mensaje</label>
              <div class="mt-2.5">
                <textarea v-model="form.message" id="message" name="message" rows="4" required
                  class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-secondary outline-1 -outline-offset-1 outline-primary-100 placeholder:text-paragraph focus:outline-2 focus:-outline-offset-2 focus:outline-primary"></textarea>
              </div>
            </div>
          </div>

          <div class="mt-8 flex justify-end">
            <button type="submit" :disabled="submitting"
              class="rounded-full bg-primary px-3.5 py-2.5 text-sm font-light text-white shadow-xs hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary transition-colors duration-300 ease-in-out">
              Enviar
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
// Fetch SEO singleton for Contacto (if present)
const { data: contacto } = await useAsyncData(
  'contacto',
  () => $fetch('/api/directus/getSingleton', {
    method: 'POST',
    body: { collection: 'contacto', fields: ['seo'] }
  }),
  { server: true, lazy: false, default: () => ({}) }
)

useDirectusSeo(computed(() => contacto.value?.seo), { title: 'Contáctanos', description: 'Completa el formulario y nuestro equipo te contactará.' })

const form = reactive({ name: '', lastname: '', email: '', phone: '', message: '' })
const submitting = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

const submit = async () => {
  successMsg.value = ''
  errorMsg.value = ''
  if (!form.name || !form.lastname || !form.email || !form.message) {
    errorMsg.value = 'Por favor completa los campos requeridos.'
    return
  }
  try {
    submitting.value = true
    await $fetch('/api/directus/createItem', {
      method: 'POST',
      body: {
        collection: 'contact_leads',
        item: {
          status: 'published',
          name: form.name,
          lastname: form.lastname,
          email: form.email,
          phone: form.phone,
          message: form.message
        }
      }
    })
    successMsg.value = '¡Gracias! Hemos recibido tu mensaje.'
    form.name = ''
    form.lastname = ''
    form.email = ''
    form.phone = ''
    form.message = ''
  } catch (e) {
    errorMsg.value = 'No pudimos enviar tu mensaje. Inténtalo nuevamente.'
  } finally {
    submitting.value = false
  }
}
</script>
