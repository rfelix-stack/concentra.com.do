<template>
    <section class="py-24 md:py-44">
        <div class="container mx-auto">
            <section class="space-y-6">
                <!-- FILTROS -->
                <form class="flex flex-wrap gap-4 items-end bg-white/70 p-4 rounded-xl shadow" @change.prevent v-motion-fadein-up-once>
                    <FilterSelect v-model="filters.segmento" label="Segmento" :options="segmentos" />
                    <FilterSelect v-model="filters.producto" label="Producto" :options="productos" />
                    <FilterSelect v-model="filters.pais" label="País" :options="paises" />
                    <FilterSelect v-model="filters.vendedor" label="Vendedor" :options="vendedores" />

                    <button v-if="somethingSelected" type="button" @click="reset" class="flex ml-auto items-center justify-center rounded-full bg-primary px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                        Limpiar filtros
                    </button>
                </form>
                <ClientsGrid :clients="filteredClients" />
            </section>
        </div>
    </section>
</template>

<script setup lang="ts">
import { clients as rawClients } from '~/utils/clients'

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

const segmentos = computed(() =>
    uniq(rawClients.map(c => c.segmento)).sort()
)
const paises = computed(() =>
    uniq(rawClients.map(c => c.pais)).sort()
)
const vendedores = computed(() =>
    uniq(rawClients.map(c => c.vendedor)).sort()
)
const productos = computed(() =>
    uniq(rawClients.flatMap(c => splitProductos(c.productos))).sort()
)

/* ---------- filtering ---------- */
const filteredClients = computed(() =>
    rawClients.filter(c => {
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
