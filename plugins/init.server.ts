import { useDataStore } from '~/stores/data'

export default defineNuxtPlugin(async () => {
  try {
    const dataStore = useDataStore()
    // If already populated (e.g., client nav), skip fetch
    if (dataStore.data?.solutions?.length || dataStore.data?.services?.length || dataStore.data?.consultancies?.length) return

    const payload = await $fetch('/api/directus/init', { method: 'POST' })
    dataStore.setBaseData(payload)
  } catch (e) {
    // Do not block the app on init failures
    console.error('plugins/init.server.ts failed to preload base data', e)
  }
})
