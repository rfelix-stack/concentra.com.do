import tailwindcss from "@tailwindcss/vite";

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
  ],

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
    directusUrl: "https://admin.concentra.com.do",
    directusToken: "PnaJ58-mXSHQTY5LP9rKJ6qL2Hbpzoy2",
    public: {
      directusUrl: "https://admin.concentra.com.do",
      directusStaticToken: "PnaJ58-mXSHQTY5LP9rKJ6qL2Hbpzoy2",
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
