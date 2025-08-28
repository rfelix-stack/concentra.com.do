export default defineNuxtPlugin((nuxtApp) => {
    const solutions = useSolutionsStore()

    nuxtApp.hook('app:created', async () => {
        if (!solutions.loaded) {
            try { await solutions.fetchAll() } catch (e) { console.error('Bootstrap solutions:', e) }
        }
    })
})

