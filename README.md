# ConCentra.com.do v2

> Sitio web corporativo oficial de ConCentra - Consultoría Tecnológica en República Dominicana

[![Nuxt 3](https://img.shields.io/badge/Nuxt-3.x-00DC82?logo=nuxt.js&logoColor=white)](https://nuxt.com)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Directus](https://img.shields.io/badge/Directus-CMS-263238?logo=directus&logoColor=white)](https://directus.io)

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Stack Tecnológico](#-stack-tecnológico)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#️-configuración)
- [Desarrollo](#-desarrollo)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Guía de Desarrollo](#-guía-de-desarrollo)
- [API y Directus](#-api-y-directus)
- [Componentes Principales](#-componentes-principales)
- [Estilos y Diseño](#-estilos-y-diseño)
- [SEO](#-seo)
- [Build y Deploy](#-build-y-deploy)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## 🎯 Descripción

**ConCentra** es una empresa consultora tecnológica dominicana especializada en la mejora de procesos empresariales mediante TIC, consultoría ITIL, soluciones de software empresarial, outsourcing TI y ciberseguridad.

Este proyecto es la **segunda versión del sitio web corporativo**, construido con tecnologías modernas para ofrecer:

- **Gestión de contenido dinámica** mediante Directus CMS headless
- **Experiencia de usuario fluida** con animaciones y transiciones
- **Optimización SEO** para cada página
- **Captación de leads** a través de múltiples formularios
- **Rendimiento optimizado** con SSR/SSG y lazy loading
- **Diseño responsive** mobile-first

---

## ✨ Características

### Funcionalidades Principales

- 🏠 **Homepage dinámica** con hero carousel, servicios, estadísticas y clientes
- 📄 **Páginas dinámicas** para soluciones, servicios y consultorías
- 🔍 **Directorio de clientes** con sistema de filtros avanzado
- 📝 **Formularios de conversión**:
  - Contacto
  - Solicitud de demo
  - Aplicación de empleo
  - Newsletter
- 🎨 **Animaciones fluidas** con Lottie y @vueuse/motion
- 📱 **Diseño responsive** adaptado a todos los dispositivos
- 🌐 **SEO optimizado** con meta tags dinámicos
- 💬 **WhatsApp flotante** con configuración dinámica
- 🎓 **Carruseles** para logos, certificaciones y contenido
- ⚡ **Performance optimizada** con SSR, lazy loading y optimización de imágenes

### Características Técnicas

- **SSR/SSG**: Renderizado server-side y generación estática
- **TypeScript**: Tipado estático para mayor robustez
- **Headless CMS**: Contenido gestionable sin tocar código
- **API Routes**: Endpoints server-side para operaciones seguras
- **State Management**: Pinia para estado global
- **Image Optimization**: @nuxt/image v1.11.0 con provider Directus, 5 presets configurados, srcset automático, WebP/AVIF
- **Motion Animations**: Directivas personalizadas para animaciones
- **Code Splitting**: Carga optimizada por rutas

---

## 🛠 Stack Tecnológico

### Core

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [Nuxt 3](https://nuxt.com) | 4.1.2 | Meta-framework Vue.js con SSR/SSG |
| [Vue 3](https://vuejs.org) | 3.x | Framework JavaScript reactivo |
| [TypeScript](https://www.typescriptlang.org) | 5.x | Tipado estático |
| [Vite](https://vitejs.dev) | 6.x | Build tool ultra-rápido |

### UI y Estilos

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [Tailwind CSS](https://tailwindcss.com) | 4.0.9 | Framework CSS utility-first |
| [@tailwindcss/vite](https://tailwindcss.com/docs/v4-beta) | 4.0.9 | Plugin Vite para Tailwind v4 |
| Google Fonts | - | Montserrat + Poppins |

### Estado y Datos

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [Pinia](https://pinia.vuejs.org) | 3.0.3 | Store oficial para Vue 3 |
| [@pinia/nuxt](https://pinia.vuejs.org/ssr/nuxt.html) | 0.11.2 | Integración Nuxt |
| [Directus SDK](https://docs.directus.io/guides/sdk/) | 20.0.3 | Cliente para Directus CMS |

### Animaciones y UX

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [@vueuse/motion](https://motion.vueuse.org) | 3.0.3 | Animaciones declarativas |
| [vue3-lottie](https://github.com/megasanjay/vue3-lottie) | 3.3.1 | Animaciones Lottie (JSON) |
| [vue3-carousel](https://ismail9k.github.io/vue3-carousel/) | 0.16.0 | Carruseles/sliders |
| [vue3-autocounter](https://github.com/zizifn/vue3-autocounter) | 1.0.8 | Contadores animados |

### Utilidades

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [@vueuse/core](https://vueuse.org) | 13.9.0 | Colección de composables |
| [@nuxt/image](https://image.nuxt.com) | 1.11.0 | Optimización de imágenes |

### Package Manager

- **Yarn** 1.22.22

---

## 📦 Requisitos Previos

Asegúrate de tener instalado:

- **Node.js** >= 18.x ([Descargar](https://nodejs.org))
- **Yarn** >= 1.22.x ([Instrucciones](https://classic.yarnpkg.com/en/docs/install))
- **Git** ([Descargar](https://git-scm.com))

Para verificar las versiones instaladas:

```bash
node --version    # v18.x o superior
yarn --version    # 1.22.x
git --version     # cualquier versión reciente
```

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd concentra.com.do\ v2
```

### 2. Instalar dependencias

```bash
yarn install
```

Este comando:
- Instala todas las dependencias del `package.json`
- Ejecuta automáticamente `postinstall` (genera tipos de TypeScript)

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env  # Si existe .env.example
# O crea el archivo manualmente
```

Contenido del `.env`:

```bash
# Directus CMS
NUXT_PUBLIC_DIRECTUS_URL=https://admin.concentra.com.do
DIRECTUS_STATIC_TOKEN=tu_token_aqui
```

> ⚠️ **Importante**: Nunca commitees el archivo `.env` al repositorio. Ya está incluido en `.gitignore`.

### 4. Iniciar servidor de desarrollo

```bash
yarn dev
```

El sitio estará disponible en: **http://localhost:3000**

---

## ⚙️ Configuración

### Variables de Entorno

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `NUXT_PUBLIC_DIRECTUS_URL` | Público | URL de la instancia de Directus |
| `DIRECTUS_STATIC_TOKEN` | Privado | Token de autenticación para Directus |

### nuxt.config.ts

Configuración principal del proyecto:

```typescript
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      // Favicons, meta tags de tema, etc.
    }
  },

  modules: [
    '@vueuse/motion/nuxt',
    '@nuxt/image',
    '@pinia/nuxt'
  ],

  runtimeConfig: {
    // Privado (solo server)
    directusUrl: process.env.NUXT_PUBLIC_DIRECTUS_URL,
    directusToken: process.env.DIRECTUS_STATIC_TOKEN,

    // Público (client + server)
    public: {
      directusUrl: process.env.NUXT_PUBLIC_DIRECTUS_URL,
      directusStaticToken: process.env.DIRECTUS_STATIC_TOKEN
    }
  }
})
```

### Tailwind CSS v4

Configuración en `assets/css/main.css`:

```css
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

@theme {
  --color-primary: #E76016;
  --color-secondary: #0F2048;
  --font-montserrat: Montserrat, serif;
  --font-poppins: Poppins, serif;
  /* ... más configuración */
}
```

---

## 💻 Desarrollo

### Comandos Disponibles

```bash
# Desarrollo
yarn dev                    # Inicia servidor de desarrollo (http://localhost:3000)

# Build
yarn build                  # Build SSR para producción
yarn generate               # Genera sitio estático (SSG)
yarn preview                # Preview del build de producción

# Utilidades
yarn postinstall            # Genera tipos de TypeScript (automático tras install)
```

### Flujo de Desarrollo

1. **Crear/modificar componentes** en `/components/`
2. **Agregar páginas** en `/pages/` (routing automático)
3. **Definir API routes** en `/server/api/`
4. **Estilos** con Tailwind CSS (clases utility)
5. **Estado global** en `/stores/data.js` (Pinia)
6. **Composables** en `/composables/` (auto-importados)

### Hot Module Replacement (HMR)

Nuxt 3 ofrece HMR automático:
- Cambios en componentes `.vue` se reflejan instantáneamente
- Cambios en `nuxt.config.ts` requieren reiniciar el servidor
- Cambios en `.env` requieren reiniciar el servidor

### DevTools

Nuxt DevTools está habilitado por defecto en desarrollo:
- Accede a `http://localhost:3000/__nuxt_devtools__`
- O abre el panel flotante (esquina inferior)

---

## 📁 Estructura del Proyecto

```
concentra.com.do v2/
│
├── .nuxt/                      # Archivos generados por Nuxt (gitignored)
├── .output/                    # Build de producción (gitignored)
│
├── assets/                     # Assets procesados
│   └── css/
│       └── main.css            # Tailwind CSS + custom theme
│
├── components/                 # 22 componentes Vue reutilizables
│   ├── Header/
│   │   ├── Index.vue           # Header principal con navegación
│   │   └── FloatMenu/
│   │       ├── Index.vue       # Mega-menu flotante
│   │       ├── Item.vue        # Item de menú flotante
│   │       └── Card.vue        # Card con imagen para menú flotante
│   ├── Section/Home/           # Secciones de homepage
│   │   ├── About.vue           # Sección sobre nosotros
│   │   ├── Clients.vue         # Sección de clientes destacados
│   │   ├── CTA.vue             # Call to action
│   │   ├── Solutions.vue       # Sección de soluciones
│   │   ├── Stats.vue           # Sección de estadísticas
│   │   ├── Team.vue            # Sección de equipo con galería
│   │   └── Testimonials.vue    # Testimonios de clientes
│   ├── Slider/
│   │   ├── HomeLogos.vue       # Carrusel de logos de clientes
│   │   ├── ServicesRelated.vue # Carrusel de servicios relacionados
│   │   └── SolutionsRelated.vue# Carrusel de soluciones relacionadas
│   ├── ClientDirectory.vue     # Directorio de clientes con filtros
│   ├── ClientsGrid.vue         # Grid de logos de clientes
│   ├── FilterSelect.vue        # Componente de select para filtros
│   ├── Footer.vue              # Footer con newsletter y certificaciones
│   ├── SlugContent.vue         # Template para páginas dinámicas
│   ├── Whatsapp.vue            # Botón flotante de WhatsApp
│   ├── Logo.vue                # Logo completo de ConCentra (SVG)
│   └── Isotipo.vue             # Isotipo de ConCentra (SVG)
│
├── composables/                # Composables de Vue
│   └── useDirectusSeo.ts       # Manejo de SEO dinámico desde Directus
│
├── layouts/
│   └── default.vue             # Layout principal (Header + Content + Footer)
│
├── pages/                      # Páginas (routing file-based)
│   ├── index.vue               # Home con hero carousel y secciones
│   ├── nosotros.vue            # Quiénes somos
│   ├── contacto.vue            # Formulario de contacto
│   ├── clientes.vue            # Directorio de clientes con filtros
│   ├── politicas-privacidad.vue# Políticas de privacidad
│   ├── terminos-condiciones.vue# Términos y condiciones
│   ├── soluciones/
│   │   └── [slug].vue          # Página dinámica de solución
│   ├── servicios/
│   │   └── [slug].vue          # Página dinámica de servicio
│   ├── consultorias/
│   │   └── [slug].vue          # Página dinámica de consultoría
│   └── solicitudes/
│       ├── demo.vue            # Formulario de solicitud de demo
│       └── empleo.vue          # Formulario de empleo con upload CV
│
├── plugins/                    # Plugins de Nuxt
│   ├── directus.js             # Cliente Directus global ($directus)
│   ├── init.server.ts          # Carga inicial de datos (SSR)
│   ├── Vue3Lottie.client.ts    # Plugin de Lottie (client-only)
│   └── vue3-autocounter.client.ts
│
├── public/                     # Assets estáticos
│   ├── Animation-1751023103783.json # Animación Lottie servicios
│   ├── Animation-1751030345179.json # Animación Lottie stats
│   ├── favicons/               # Favicons (múltiples tamaños)
│   └── WhatsApp.svg
│
├── server/                     # Server-side code
│   └── api/
│       └── directus/           # 6 API routes server-side
│           ├── init.post.js    # Carga inicial de datos base
│           ├── getSingleton.js # Obtener singleton
│           ├── getItems.post.js # Obtener items de colección
│           ├── getItem.post.js # Obtener item por slug
│           ├── createItem.post.js # Crear item (formularios)
│           └── upload.post.js  # Subir archivos
│
├── stores/                     # Pinia stores
│   └── data.js                 # Store global (solutions, services, etc.)
│
├── utils/                      # Funciones de utilidad
│   ├── directusAsset.ts        # Helper para assets de Directus
│   └── clients.ts              # Utilidades para clientes
│
├── .gitignore                  # Incluye CLAUDE.md
├── nuxt.config.ts              # Configuración de Nuxt
├── package.json
├── tsconfig.json               # Configuración de TypeScript
├── yarn.lock
├── CLAUDE.md                   # Contexto para IA (gitignored)
└── README.md                   # Documentación principal
```

---

## 🧑‍💻 Guía de Desarrollo

### Crear una Nueva Página

1. **Crear archivo** en `/pages/`:

```vue
<!-- pages/mi-pagina.vue -->
<template>
  <div class="container mx-auto px-5 py-16">
    <h1 class="text-4xl font-bold text-secondary">Mi Página</h1>
    <p>Contenido de la página...</p>
  </div>
</template>

<script setup>
// Opcional: SEO
useHead({
  title: 'Mi Página - ConCentra',
  meta: [
    { name: 'description', content: 'Descripción de mi página' }
  ]
})
</script>
```

2. **Acceder** en: `http://localhost:3000/mi-pagina`

### Crear un Componente

1. **Crear archivo** en `/components/`:

```vue
<!-- components/MiComponente.vue -->
<template>
  <div class="mi-componente">
    <h2>{{ titulo }}</h2>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  titulo: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.mi-componente {
  @apply p-4 bg-white rounded-lg shadow-md;
}
</style>
```

2. **Usar** en cualquier página/componente:

```vue
<template>
  <MiComponente titulo="Hola Mundo">
    Contenido del slot
  </MiComponente>
</template>
```

> 💡 Los componentes en `/components/` son auto-importados (no requieren `import`)

### Crear un API Route

1. **Crear archivo** en `/server/api/`:

```javascript
// server/api/mi-endpoint.post.js
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Lógica del endpoint
  const result = {
    success: true,
    data: body
  }

  return result
})
```

2. **Llamar** desde el cliente:

```javascript
const { data } = await useFetch('/api/mi-endpoint', {
  method: 'POST',
  body: {
    campo: 'valor'
  }
})
```

### Usar Pinia Store

1. **Acceder al store**:

```vue
<script setup>
import { useDataStore } from '~/stores/data'

const dataStore = useDataStore()
const solutions = computed(() => dataStore.solutions)
</script>
```

2. **Modificar estado**:

```javascript
// Acción simple
dataStore.solutions = newData

// Acción del store
dataStore.fetchClients({ segment: 'Banca' })
```

### Animaciones con @vueuse/motion

**Directivas disponibles**:

```vue
<!-- Fade in simple -->
<div v-motion-fadein-once>
  Contenido con fade in
</div>

<!-- Fade in + slide up -->
<div v-motion-fadein-up-once>
  Contenido con fade in y slide up
</div>

<!-- Para header (slide down) -->
<header v-motion-fadein-down-enter>
  Header con animación
</header>
```

**Custom animation**:

```vue
<script setup>
const customAnimation = {
  initial: { opacity: 0, scale: 0.8 },
  enter: { opacity: 1, scale: 1, transition: { duration: 500 } }
}
</script>

<template>
  <div v-motion="customAnimation">
    Contenido con animación custom
  </div>
</template>
```

### Estilos con Tailwind

**Uso básico**:

```vue
<template>
  <!-- Botón primary -->
  <button class="rounded-full bg-primary px-3.5 py-2.5 text-sm text-white hover:bg-secondary transition-colors">
    Click me
  </button>

  <!-- Card -->
  <div class="rounded-3xl shadow-md bg-white p-6">
    Contenido del card
  </div>

  <!-- Grid responsive -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div>Item 1</div>
    <div>Item 2</div>
  </div>
</template>
```

**Colores custom**:

```html
<!-- Colores de la marca -->
<div class="bg-primary text-white">Primary</div>
<div class="bg-secondary text-white">Secondary</div>
<div class="bg-azul-cobalto">Azul Cobalto</div>
<div class="bg-gris-aluminio">Gris Aluminio</div>
<div class="bg-verde-esmeralda">Verde Esmeralda</div>
```

---

## 🔌 API y Directus

### Conexión a Directus

**Plugin** ([plugins/directus.js](plugins/directus.js)):

```javascript
import { createDirectus, rest, staticToken } from '@directus/sdk'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const client = createDirectus(config.public.directusUrl)
    .with(staticToken(config.public.directusStaticToken))
    .with(rest())

  return {
    provide: {
      directus: client
    }
  }
})
```

**Uso** en componentes:

```javascript
const { $directus } = useNuxtApp()

// Ejemplo: Leer items
const items = await $directus.request(readItems('solutions'))
```

### API Routes Disponibles

#### 1. `/api/directus/init` (POST)

**Propósito**: Carga inicial de datos base (llamado en SSR)

**Body**:
```javascript
{
  // Los datos base se definen en el archivo
}
```

**Response**:
```javascript
{
  solutions: [...],
  services: [...],
  consultancies: [...],
  configs: {...}
}
```

#### 2. `/api/directus/getSingleton` (GET)

**Propósito**: Obtener un singleton de Directus

**Query**:
```javascript
{
  collection: 'home',
  fields: ['*', 'seo.*']
}
```

**Response**:
```javascript
{
  // Datos del singleton
}
```

#### 3. `/api/directus/getItems` (POST)

**Propósito**: Obtener items de una colección

**Body**:
```javascript
{
  collection: 'clients',
  fields: ['*'],
  filter: {
    status: 'published',
    segment: 'Banca'
  }
}
```

**Response**:
```javascript
[
  { id: 1, name: 'Cliente 1', ... },
  { id: 2, name: 'Cliente 2', ... }
]
```

#### 4. `/api/directus/getItem` (POST)

**Propósito**: Obtener un item por slug

**Body**:
```javascript
{
  collection: 'solutions',
  slug: 'erp-empresarial',
  fields: ['*', 'logo', 'seo.*']
}
```

**Response**:
```javascript
{
  id: 1,
  slug: 'erp-empresarial',
  title: 'ERP Empresarial',
  ...
}
```

#### 5. `/api/directus/createItem` (POST)

**Propósito**: Crear un item (usado en formularios)

**Body**:
```javascript
{
  collection: 'contact_leads',
  data: {
    name: 'Juan',
    email: 'juan@example.com',
    message: 'Hola...'
  }
}
```

**Response**:
```javascript
{
  id: 123,
  name: 'Juan',
  ...
}
```

#### 6. `/api/directus/upload` (POST)

**Propósito**: Subir archivos a Directus

**Body**: FormData con archivo

**Response**:
```javascript
{
  id: 'uuid-del-archivo'
}
```

### Optimización de Imágenes con @nuxt/image

**Sistema actual**: NuxtImg con provider de Directus + presets configurados

**Configuración** (en `nuxt.config.ts`):

```typescript
image: {
  directus: {
    baseURL: 'https://admin.concentra.com.do/assets'
  },
  formats: ['webp', 'avif'],
  quality: 80,
  presets: {
    logo: { modifiers: { format: 'webp', fit: 'contain', quality: 90 } },
    thumbnail: { modifiers: { format: 'webp', width: 300, height: 120, fit: 'cover', quality: 80 } },
    hero: { modifiers: { format: 'webp', width: 1280, fit: 'cover', quality: 85 } },
    icon: { modifiers: { format: 'webp', width: 160, height: 160, fit: 'cover', quality: 85 } },
    logoSmall: { modifiers: { format: 'webp', width: 45, height: 45, fit: 'cover', quality: 90 } }
  }
}
```

**Uso en componentes**:

```vue
<template>
  <!-- Uso básico con preset -->
  <NuxtImg
    :src="directusImageId"
    provider="directus"
    preset="hero"
    alt="Descripción"
    loading="lazy" />

  <!-- Con sizes responsive -->
  <NuxtImg
    :src="item.logo"
    provider="directus"
    preset="logo"
    sizes="xs:100vw sm:100vw md:50vw lg:50vw"
    alt="Logo"
    loading="eager" />
</template>
```

**Importante**:
- NO usar el helper `directusAsset()` (deprecado)
- Pasar IDs de Directus directos a NuxtImg
- NuxtImg genera srcset automáticamente
- Conversión a WebP/AVIF automática

### Colecciones de Directus

#### Singletons

| Colección | Propósito |
|-----------|-----------|
| `home` | Contenido de homepage |
| `nosotros` | Página "Quiénes somos" |
| `contacto` | Página de contacto |
| `configs` | Configuración global (WhatsApp, redes, etc.) |
| `policies` | Políticas de privacidad |
| `terms` | Términos y condiciones |

#### Collections

| Colección | Propósito |
|-----------|-----------|
| `solutions` | Soluciones tecnológicas |
| `services` | Servicios ofrecidos |
| `consultancies` | Capacitaciones/consultorías |
| `clients` | Directorio de clientes |
| `certifications` | Certificaciones de la empresa |

#### Leads

| Colección | Formulario |
|-----------|------------|
| `contact_leads` | Formulario de contacto |
| `demo_booking` | Solicitud de demo |
| `subscriptions` | Newsletter |
| `job_applications` | Formulario de empleo (TBD) |

---

## 🧩 Componentes Principales

### Header/Index.vue

**Propósito**: Navegación principal del sitio

**Características**:
- Menú responsive (desktop: inline, mobile: off-canvas)
- Mega-menus flotantes para Soluciones/Servicios/Consultorías
- Carga dinámica desde Directus (store)
- Detección de ruta activa (underline)
- Botón "¡Empléate!" destacado

**Uso**:
```vue
<template>
  <HeaderIndex />
</template>
```

### Footer.vue

**Propósito**: Footer con newsletter, certificaciones y links

**Características**:
- Formulario de newsletter (guarda en Directus)
- Carrusel de certificaciones
- Navegación secundaria (soluciones/servicios/legal)
- Redes sociales dinámicas
- Copyright

**Uso**:
```vue
<template>
  <Footer />
</template>
```

### SlugContent.vue

**Propósito**: Template reutilizable para páginas de soluciones/servicios/consultorías

**Props**:
```typescript
interface Props {
  item: {
    logo: string           // Directus ID
    title: string
    intro: string
    content: string        // HTML
    media_type?: 'image' | 'youtube' | 'video'
    media_image?: string   // Directus ID
    media_youtube?: string // URL
    media_video?: string   // Directus ID
    cta?: {
      demo: boolean
      brochure?: string    // Directus ID
      link?: string        // URL externa
    }
    related_items?: Array
  }
}
```

**Uso**:
```vue
<template>
  <SlugContent :item="solutionData" />
</template>
```

### ClientDirectory.vue

**Propósito**: Directorio de clientes con filtros

**Características**:
- Filtros: segmento, producto, país, vendedor
- Grid responsivo
- Skeleton loaders
- Integración con store

**Uso**:
```vue
<template>
  <ClientDirectory />
</template>
```

### Whatsapp.vue

**Propósito**: Botón flotante de WhatsApp

**Características**:
- Posición fija (bottom-right)
- Link con mensaje predefinido
- Configuración desde Directus

**Uso**:
```vue
<template>
  <Whatsapp />
</template>
```

---

## 🎨 Estilos y Diseño

### Paleta de Colores

**Colores de Marca**:

```css
Primary (Naranja):   #E76016
Secondary (Azul):    #0F2048
Azul Cobalto:        #1C3A81
Gris Aluminio:       #AAAEB7
Verde Esmeralda:     #46904E
```

**Escalas Completas**:

- `primary-50` a `primary-950`
- `secondary-50` a `secondary-950`
- `gray-50` a `gray-950`

### Tipografía

**Fuentes**:
- **Montserrat**: Párrafos, spans, inputs, li
- **Poppins**: Títulos, botones, labels

**Jerarquía**:
```css
h1: text-4xl lg:text-6xl (36px/60px)
h2: text-2xl lg:text-4xl (24px/36px)
h3: text-xl lg:text-2xl  (20px/24px)
p:  text-base            (16px)
```

### Componentes UI

**Botones**:

```html
<!-- Primary -->
<button class="rounded-full bg-primary px-3.5 py-2.5 text-sm text-white hover:bg-secondary transition-colors">
  Primary Button
</button>

<!-- Secondary -->
<button class="rounded-full border-2 border-primary px-3.5 py-2.5 text-sm text-primary hover:bg-primary hover:text-white transition-colors">
  Secondary Button
</button>
```

**Inputs**:

```html
<input type="text" class="w-full rounded-md bg-white px-3.5 py-2 text-base text-paragraph outline-primary-100 focus:outline-primary" />
```

**Cards**:

```html
<div class="rounded-3xl shadow-md bg-white p-6 hover:scale-105 transition-all">
  Card Content
</div>
```

### Clase .content

**Propósito**: Estilos para HTML renderizado desde Directus

**Ejemplo**:

```vue
<div class="content" v-html="item.content"></div>
```

**Estilos aplicados**:
- Headings (h1, h2, h3) con tamaños y márgenes
- Listas (ul, ol) con bullets/números
- Links con color primary y hover
- Strong/bold con font-semibold
- Párrafos con line-height optimizado

### Responsive Breakpoints

```css
sm:  640px   /* Móviles grandes */
md:  768px   /* Tablets */
lg:  1024px  /* Desktop */
xl:  1280px  /* Desktop grande */
```

**Uso**:

```html
<!-- Mobile: stack, Desktop: grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  ...
</div>

<!-- Mobile: text-sm, Desktop: text-base -->
<p class="text-sm lg:text-base">
  ...
</p>
```

---

## 🔍 SEO

### Composable: useDirectusSeo

**Propósito**: Configurar SEO dinámico desde datos de Directus

**Uso**:

```vue
<script setup>
import { useDirectusSeo } from '~/composables/useDirectusSeo'

const { data: pageData } = await useFetch('/api/directus/getSingleton', {
  query: {
    collection: 'nosotros',
    fields: ['seo.*']
  }
})

useDirectusSeo(pageData.value?.seo)
</script>
```

**Campos SEO en Directus**:

| Campo | Tipo | Propósito |
|-------|------|-----------|
| `meta_title` | String | Título de la página |
| `meta_description` | String | Descripción meta |
| `og_image` | File | Imagen Open Graph |
| `canonical_url` | String | URL canónica |
| `robots_index` | Boolean | index/noindex |
| `robots_follow` | Boolean | follow/nofollow |
| `meta_additional_fields` | JSON | Campos meta adicionales |

**Output**:

```html
<title>Título - ConCentra</title>
<meta name="description" content="Descripción...">
<meta property="og:title" content="Título">
<meta property="og:image" content="https://...">
<link rel="canonical" href="https://concentra.com.do/pagina">
<meta name="robots" content="index, follow">
```

### SEO Manual

Para páginas sin datos de Directus:

```vue
<script setup>
useHead({
  title: 'Título de la Página - ConCentra',
  meta: [
    { name: 'description', content: 'Descripción de la página...' },
    { property: 'og:title', content: 'Título de la Página' },
    { property: 'og:image', content: '/og-image.jpg' }
  ],
  link: [
    { rel: 'canonical', href: 'https://concentra.com.do/pagina' }
  ]
})
</script>
```

---

## 📦 Build y Deploy

### Build para Producción (SSR)

```bash
yarn build
```

Genera:
- `.output/` - Build completo
- `.output/server/` - Servidor Nitro
- `.output/public/` - Assets estáticos

**Iniciar servidor de producción**:

```bash
yarn preview
# O directamente:
node .output/server/index.mjs
```

### Generación Estática (SSG)

```bash
yarn generate
```

Genera:
- `.output/public/` - Sitio estático completo

**Preview**:

```bash
yarn preview
```

**Deploy**: Subir `.output/public/` a cualquier hosting estático (Netlify, Vercel, etc.)

### Variables de Entorno en Producción

Asegúrate de configurar las variables de entorno en tu plataforma de hosting:

```bash
NUXT_PUBLIC_DIRECTUS_URL=https://admin.concentra.com.do
DIRECTUS_STATIC_TOKEN=tu_token_de_produccion
```

### Optimizaciones

**Incluidas**:
- ✅ Minificación de JS/CSS
- ✅ Tree shaking
- ✅ Code splitting por ruta
- ✅ Lazy loading de componentes
- ✅ Optimización de imágenes
- ✅ Preload de recursos críticos

**Recomendaciones adicionales**:
- Configurar CDN para assets estáticos
- Habilitar compresión gzip/brotli en servidor
- Configurar cache headers apropiados
- Implementar Service Worker (PWA) si aplica

---

## 🧪 Testing

> ⚠️ **Nota**: Actualmente no hay tests configurados en el proyecto.

### Configuración Recomendada

**Unit Tests**: Vitest

```bash
yarn add -D vitest @vue/test-utils
```

**E2E Tests**: Playwright

```bash
yarn add -D @playwright/test
```

**Accesibilidad**: axe-core

```bash
yarn add -D @axe-core/playwright
```

### Ejemplo de Test

```javascript
// tests/components/Logo.test.js
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Logo from '~/components/Logo.vue'

describe('Logo', () => {
  it('renders correctly', () => {
    const wrapper = mount(Logo)
    expect(wrapper.find('svg').exists()).toBe(true)
  })
})
```

---

## 🐛 Troubleshooting

### Problema: Error al instalar dependencias

**Síntomas**: Errores durante `yarn install`

**Solución**:
```bash
# Limpiar cache de yarn
yarn cache clean

# Eliminar node_modules y reinstalar
rm -rf node_modules yarn.lock
yarn install
```

### Problema: Cambios en .env no se reflejan

**Síntomas**: Variables de entorno no actualizadas

**Solución**:
```bash
# Reiniciar servidor de desarrollo
# Ctrl+C para detener
yarn dev
```

### Problema: Página en blanco o error 500

**Síntomas**: Error al renderizar página

**Solución**:
```bash
# Limpiar caché de Nuxt
rm -rf .nuxt .output

# Reiniciar desarrollo
yarn dev
```

### Problema: Errores de TypeScript

**Síntomas**: Errores de tipos en editor

**Solución**:
```bash
# Regenerar tipos
yarn postinstall

# O manualmente:
nuxt prepare
```

### Problema: Directus no responde

**Síntomas**: Errores al cargar datos

**Solución**:
1. Verificar que `NUXT_PUBLIC_DIRECTUS_URL` sea correcta
2. Verificar que `DIRECTUS_STATIC_TOKEN` sea válido
3. Verificar conexión a internet
4. Revisar logs del servidor Directus

### Problema: Animaciones no funcionan

**Síntomas**: Directivas `v-motion-*` no aplican animaciones

**Solución**:
1. Verificar que `@vueuse/motion/nuxt` esté en [nuxt.config.ts](nuxt.config.ts:11)
2. Limpiar caché: `rm -rf .nuxt`
3. Reiniciar dev server

---

## 👥 Contribuir

### Flujo de Trabajo

1. **Fork** el repositorio
2. **Crear rama** para tu feature: `git checkout -b feature/mi-feature`
3. **Commit** cambios: `git commit -m 'Add: mi feature'`
4. **Push** a la rama: `git push origin feature/mi-feature`
5. **Abrir Pull Request**

### Convenciones

**Commits**:
- `Add: nueva funcionalidad`
- `Fix: corrección de bug`
- `Update: actualización de código existente`
- `Refactor: refactorización sin cambio de funcionalidad`
- `Docs: cambios en documentación`
- `Style: cambios de estilos (formato, lint)`

**Código**:
- Usar TypeScript cuando sea posible
- Seguir convenciones de Vue 3 (Composition API)
- Nombrar componentes en PascalCase
- Usar Tailwind CSS (evitar CSS custom sin razón)
- Documentar props/events con JSDoc si son complejos

---

## 📄 Licencia

© 2025 ConCentra - Consultoría Tecnológica. Todos los derechos reservados.

---

## 📞 Contacto y Soporte

**Sitio Web**: https://concentra.com.do
**Email**: info@concentra.com.do
**WhatsApp**: Ver configuración en Directus (`configs.whatsapp`)

---

## 🙏 Agradecimientos

- **Nuxt Team**: Por el increíble framework
- **Directus Team**: Por el CMS headless más flexible
- **Tailwind CSS**: Por el mejor framework CSS utility-first
- **Vue.js Core Team**: Por Vue 3 y su ecosistema

---

**Última actualización**: 2025-01-18
**Versión**: 2.0.0
**Rama actual**: v2
**Rama principal**: main
**Node**: >= 18.x
**Yarn**: 1.22.x