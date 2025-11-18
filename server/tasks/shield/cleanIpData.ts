/**
 * Scheduled task: Limpia datos de IPs antiguos del storage
 * Se ejecuta diariamente a medianoche según configuración en nuxt.config.ts
 */
export default defineTask({
  meta: {
    name: 'shield:cleanIpData',
    description: 'Limpia datos de IPs antiguos del API shield diariamente'
  },
  async run() {
    const storage = useStorage('shield')
    const keys = await storage.getKeys()

    let cleaned = 0
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000)

    for (const key of keys) {
      // Limpiar datos de rate limiting que no sean bans activos
      if (!key.startsWith('ban:')) {
        const data = await storage.getItem(key)
        if (data && typeof data === 'object' && 'lastAccess' in data) {
          if (data.lastAccess < oneDayAgo) {
            await storage.removeItem(key)
            cleaned++
          }
        }
      }
    }

    return { result: `Cleaned ${cleaned} old IP data entries` }
  }
})
