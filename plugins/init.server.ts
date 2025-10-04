import { useDataStore } from '~/stores/data'

export default defineNuxtPlugin(async () => {
  try {
    const dataStore = useDataStore()
    // Fetch when base lists or configs are missing
    const hasBase = !!(dataStore.data?.solutions?.length && dataStore.data?.services?.length && dataStore.data?.consultancies?.length)
    const hasConfigs = !!(dataStore.data?.configs && Object.keys(dataStore.data.configs).length)
    if (hasBase && hasConfigs) return

    const payload = await $fetch('/api/directus/init', { method: 'POST' })
    dataStore.setBaseData(payload)
  } catch (e) {
    // Do not block the app on init failures
    console.error('plugins/init.server.ts failed to preload base data', e)
  }
})
