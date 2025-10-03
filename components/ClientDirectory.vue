<template>
    <section class="py-24">
        <div class="container mx-auto">
            <section class="space-y-6">
                <!-- FILTROS -->
                <form
                    class="sticky top-24 md:top-32 z-30 flex flex-wrap gap-4 items-end bg-white/70 backdrop-blur p-4 rounded-xl shadow"
                    @change.prevent v-motion-fadein-up-once>
                    <FilterSelect v-model="filters.segmento" label="Segmento" :options="segmentos" />
                    <FilterSelect v-model="filters.producto" label="Producto" :options="productos" />
                    <FilterSelect v-model="filters.pais" label="País" :options="paises" />
                    <FilterSelect v-model="filters.vendedor" label="Vendedor" :options="vendedores" />

                    <button v-if="somethingSelected" type="button" @click="reset"
                        class="flex ml-auto items-center justify-center rounded-full bg-primary px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                        Limpiar filtros
                    </button>
                </form>
                <!-- Skeleton while loading -->
                <div v-if="pendingClients"
                    class="grid grid-flow-dense gap-4 grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] auto-rows-[8rem]">
                    <div v-for="n in 12" :key="`sk-${n}`"
                        class="relative rounded-xl bg-white shadow flex items-center justify-center p-4 overflow-hidden">
                        <div class="skeleton w-full h-full"></div>
                    </div>
                </div>
                <ClientsGrid v-else :clients="filteredClients" />
            </section>
        </div>
    </section>
</template>

<script setup lang="ts">
import { clients as fallbackClients } from '~/utils/clients'
import { directusAsset } from '~/utils/directusAsset'

/* ---------- helpers ---------- */
function uniq<T>(arr: T[]) {
    return [...new Set(arr)]
}
function splitProductos(p: string) {
    return p.split(',').map(v => v.trim())
}

/* ---------- data ---------- */
const filters = reactive({
    segmento: '',
    producto: '',
    pais: '',
    vendedor: ''
})

// Fetch all clients from Directus and map to current structure
const { data: fetchedClients, pending: pendingClients } = await useAsyncData(
    'clients-directory',
    () => $fetch('/api/directus/getItems', {
        method: 'POST',
        body: {
            collection: 'clients',
            fields: [
                'id', 'name', 'logo',
                'country.name',
                'segment.name',
                'seller.name',
                'product.collection',
                'product.item.name'
            ]
        }
    }),
    {
        server: false,
        lazy: false,
        default: () => [],
        transform: (payload) => {
            const rows = Array.isArray(payload) ? payload : payload?.data ?? []

            return rows.map((i: any) => {
                const productNames = Array.isArray(i?.product)
                    ? i.product.map((p: any) => p?.item?.name).filter(Boolean)
                    : []

                return {
                    nombre: i?.name ?? '',
                    logo: directusAsset(i?.logo, { format: 'webp' }),
                    segmento: i?.segment?.name ?? '',
                    productos: productNames.join(', '),
                    pais: i?.country?.name ?? '',
                    vendedor: i?.seller?.name ?? ''
                }
            })
        }
    }
)

// Use fetched clients only
const clients = computed(() => fetchedClients.value ?? [])

const segmentos = computed(() => uniq(clients.value.map(c => c.segmento)).sort())
const paises = computed(() => uniq(clients.value.map(c => c.pais)).sort())
const vendedores = computed(() => uniq(clients.value.map(c => c.vendedor)).sort())
const productos = computed(() => uniq(clients.value.flatMap(c => splitProductos(c.productos))).sort())

/* ---------- filtering ---------- */
const filteredClients = computed(() =>
    clients.value.filter(c => {
        const bySegmento = filters.segmento
            ? c.segmento === filters.segmento
            : true
        const byPais = filters.pais
            ? c.pais === filters.pais
            : true
        const byVendedor = filters.vendedor
            ? c.vendedor === filters.vendedor
            : true
        const byProducto = filters.producto
            ? splitProductos(c.productos).includes(filters.producto)
            : true

        return bySegmento && byPais && byVendedor && byProducto
    })
)

const somethingSelected = computed(() =>
    Object.values(filters).some(Boolean)
)

function reset() {
    Object.assign(filters, {
        segmento: '',
        producto: '',
        pais: '',
        vendedor: ''
    })
}
</script>

<style scoped>
.skeleton {
    position: relative;
    background: #eee;
    overflow: hidden;
}

.skeleton::after {
    content: '';
    position: absolute;
    top: 0;
    left: -150px;
    height: 100%;
    width: 150px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
    animation: shimmer 1.2s infinite;
}

@keyframes shimmer {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(300%);
    }
}
</style>
