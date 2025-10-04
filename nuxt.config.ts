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

  runtimeConfig: {
    directusUrl: "https://admin.concentra.com.do",
    directusToken: "qatIDv-EeSN7j8OmRB8Ozl7IZ2qHcdWB",
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
