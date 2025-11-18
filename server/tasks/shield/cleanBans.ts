/**
 * Scheduled task: Limpia bans expirados del storage
 * Se ejecuta cada 15 minutos según configuración en nuxt.config.ts
 */
export default defineTask({
  meta: {
    name: 'shield:cleanBans',
    description: 'Limpia bans expirados del API shield cada 15 minutos'
  },
  async run() {
    const storage = useStorage('shield')
    const keys = await storage.getKeys()

    let cleaned = 0
    const now = Date.now()

    for (const key of keys) {
      if (key.startsWith('ban:')) {
        const banData = await storage.getItem(key)
        if (banData && typeof banData === 'object' && 'expiresAt' in banData) {
          if (banData.expiresAt < now) {
            await storage.removeItem(key)
            cleaned++
          }
        }
      }
    }

    return { result: `Cleaned ${cleaned} expired bans` }
  }
})
