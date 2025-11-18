import tailwindcss from "@tailwindcss/vite";
import { ofetch } from "ofetch";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
compatibilityDate: "22025-07-15",
  devtools: { enabled: true },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      link: [
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/favicons/apple-icon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '60x60', href: '/favicons/apple-icon-60x60.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/favicons/apple-icon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/favicons/apple-icon-76x76.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/favicons/apple-icon-114x114.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicons/apple-icon-120x120.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/favicons/apple-icon-144x144.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicons/apple-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-icon-180x180.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicons/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' },
        { rel: 'manifest', href: '/favicons/manifest.json' },
        { rel: 'shortcut icon', href: '/favicons/favicon.ico' }
      ],
      meta: [
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'msapplication-TileImage', content: '/favicons/ms-icon-144x144.png' },
        { name: 'msapplication-config', content: '/favicons/browserconfig.xml' },
        { name: 'theme-color', content: '#ffffff' }
      ]
    }
  },

  modules: [
    "@vueuse/motion/nuxt",
    // "@nuxtjs/i18n",
    "@nuxt/image",
    "@pinia/nuxt",
    "nuxt-api-shield",
    "@nuxtjs/sitemap",
  ],

  // Configuración de rate limiting para proteger endpoints
  nuxtApiShield: {
    limit: {
      max: 100,           // Máximo 100 requests
      duration: 900,      // Ventana de 15 minutos (900 segundos)
      ban: 3600,          // Ban de 1 hora si excede el límite
    },
    delayOnBan: true,     // Delay de 1 segundo para IPs baneadas
    errorMessage: "Demasiadas solicitudes. Por favor, inténtalo más tarde.",
    retryAfterHeader: true, // Incluir header Retry-After
    log: {
      path: "logs",
      attempts: 50,       // Registrar IPs con 50+ intentos
    },
  },

  // Configuración de Nitro para storage y scheduled tasks
  nitro: {
    storage: {
      shield: {
        driver: "memory"  // Almacenamiento en memoria (considerar Redis en producción)
      }
    },
    experimental: {
      tasks: true         // Habilitar scheduled tasks
    },
    scheduledTasks: {
      "*/15 * * * *": ["shield:cleanBans"],      // Limpieza de bans cada 15 minutos
      "0 0 * * *": ["shield:cleanIpData"]        // Limpieza de datos de IPs diariamente
    }
  },

  // Configuración de Sitemap para SEO
  sitemap: {
    hostname: 'https://concentra.com.do',
    gzip: true,
    defaults: {
      changefreq: 'weekly',
      priority: 0.7,
    },
    // Generar URLs dinámicas desde Directus
    urls: async () => {
      const baseUrl = process.env.NUXT_PUBLIC_DIRECTUS_URL || 'https://admin.concentra.com.do'
      const token = process.env.DIRECTUS_TOKEN || ''

      if (!token) {
        console.warn('DIRECTUS_TOKEN no configurado, sitemap no incluirá rutas dinámicas')
        return []
      }

      try {
        // Fetch solutions, services, and consultancies
        const [solutions, services, consultancies] = await Promise.all([
          ofetch<{ data: Array<{ slug: string; date_updated?: string }> }>(`${baseUrl}/items/solutions`, {
            headers: { 'Authorization': `Bearer ${token}` },
            query: { fields: 'slug,date_updated', filter: { status: { _eq: 'published' } } }
          }),
          ofetch<{ data: Array<{ slug: string; date_updated?: string }> }>(`${baseUrl}/items/services`, {
            headers: { 'Authorization': `Bearer ${token}` },
            query: { fields: 'slug,date_updated', filter: { status: { _eq: 'published' } } }
          }),
          ofetch<{ data: Array<{ slug: string; date_updated?: string }> }>(`${baseUrl}/items/consultancies`, {
            headers: { 'Authorization': `Bearer ${token}` },
            query: { fields: 'slug,date_updated', filter: { status: { _eq: 'published' } } }
          }),
        ])

        const urls: any[] = []

        // Add solution URLs
        solutions.data?.forEach((item) => {
          urls.push({
            loc: `/soluciones/${item.slug}`,
            lastmod: item.date_updated,
            priority: 0.8,
          })
        })

        // Add service URLs
        services.data?.forEach((item) => {
          urls.push({
            loc: `/servicios/${item.slug}`,
            lastmod: item.date_updated,
            priority: 0.8,
          })
        })

        // Add consultancy URLs
        consultancies.data?.forEach((item) => {
          urls.push({
            loc: `/consultorias/${item.slug}`,
            lastmod: item.date_updated,
            priority: 0.6,
          })
        })

        return urls
      } catch (error) {
        console.error('Error fetching sitemap URLs from Directus:', error)
        return []
      }
    },
  },

  css: ["~/assets/css/main.css"],

  image: {
    // Provider personalizado de Directus
    provider: 'directus',
    providers: {
      directus: {
        provider: '~/providers/directus.ts',
        options: {
          baseURL: 'https://admin.concentra.com.do/assets'
        }
      }
    },

    // Formatos soportados (priorizar modernos para mejor compresión)
    formats: ['webp', 'avif'],

    // Calidad por defecto (balance entre calidad y tamaño)
    quality: 80,

    // Presets para casos comunes de uso
    presets: {
      logo: {
        modifiers: {
          format: 'webp',
          fit: 'contain',
          quality: 90
        }
      },
      thumbnail: {
        modifiers: {
          format: 'webp',
          width: 300,
          height: 120,
          fit: 'cover',
          quality: 80
        }
      },
      hero: {
        modifiers: {
          format: 'webp',
          width: 1280,
          fit: 'cover',
          quality: 85
        }
      },
      icon: {
        modifiers: {
          format: 'webp',
          width: 160,
          height: 160,
          fit: 'cover',
          quality: 85
        }
      },
      logoSmall: {
        modifiers: {
          format: 'webp',
          width: 45,
          height: 45,
          fit: 'cover',
          quality: 90
        }
      }
    },

    // Breakpoints responsive (alineados con Tailwind)
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536
    }
  },

  runtimeConfig: {
    // Server-only variables (NUNCA expuestas al cliente)
    // Lee desde: NUXT_PUBLIC_DIRECTUS_URL, DIRECTUS_TOKEN
    directusUrl: process.env.NUXT_PUBLIC_DIRECTUS_URL || "https://admin.concentra.com.do",
    directusToken: process.env.DIRECTUS_TOKEN || "",
    public: {
      // Variables públicas (accesibles desde el cliente)
      // Auto-mapeadas desde: NUXT_PUBLIC_DIRECTUS_URL, DIRECTUS_STATIC_TOKEN, NUXT_PUBLIC_SITE_URL
      directusUrl: "https://admin.concentra.com.do",
      directusStaticToken: process.env.DIRECTUS_STATIC_TOKEN || "",
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://concentra.com.do",
      motion: {
        directives: {
          "fadein-once": {
            initial: {
              opacity: 0,
            },
            visibleOnce: {
              opacity: 1,
              transition: {
                duration: 1000,
                delay: 200,
              },
            },
          },
          "fadein-up-once": {
            initial: {
              opacity: 0,
              y: 50,
            },
            visibleOnce: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 1000,
                delay: 200,
              },
            },
          },
          "fadein-down-enter": {
            initial: {
              opacity: 0,
              y: -100,
            },
            enter: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 500,
              },
            },
          },
        },
      },
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  // i18n: {
  //   bundle: {
  //     optimizeTranslationDirective: false,
  //   },
  // },
});
