import { defineStore } from 'pinia';
const soluciones = useSolutionsStore();

export const useMainStore = defineStore('index', {
  state: () => ({
    currentMenuFloatItem: null
  }),
  getters: {
    menuCardItem: state => state.currentMenuFloatItem || soluciones.list[0]
  },
  actions: {
    setCurrentMenuFloatItem(item) {
      this.currentMenuFloatItem = item
    },
  },
});