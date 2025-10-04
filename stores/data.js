import { defineStore } from 'pinia';

export const useDataStore = defineStore('index', {
  state: () => ({
    data: {
      solutions: [],
      services: [],
      consultancies: [],
      featuredClients: [],
      configs: {}
    },
    currentMenuFloatItem: null
  }),
  getters: {  
    menuCardItem: state => state.currentMenuFloatItem
  },
  actions: {
    setCurrentMenuFloatItem(item) {
      this.currentMenuFloatItem = item
    },
    setBaseData(payload) {
      this.data.solutions = payload?.solutions ?? []
      this.data.services = payload?.services ?? []
      this.data.consultancies = payload?.consultancies ?? []
      this.data.configs = payload?.configs ?? {}
    },
    async fetchFeaturedClients() {
      // avoid refetch if already present
      if (Array.isArray(this.data.featuredClients) && this.data.featuredClients.length) return this.data.featuredClients

      try {
        const resp = await $fetch('/api/directus/getItems', {
          method: 'POST',
          body: {
            collection: 'clients',
            fields: ['id', 'name', 'logo'],
            filter: { featured: { _eq: true } }
          }
        })

        const rows = Array.isArray(resp) ? resp : resp?.data ?? []
        this.data.featuredClients = rows.map((r) => ({ id: r.id, name: r.name, logo: r.logo }))
        return this.data.featuredClients
      } catch (e) {
        console.error('Failed to fetch featured clients', e)
        return []
      }
    }
  },
});
