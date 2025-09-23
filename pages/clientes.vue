<script setup>
const { data: clients, status, pending, error, refresh } = await useAsyncData(
    'clients',
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
        server: true,
        lazy: false,
        default: () => [],
        transform: (payload) => {
            const rows = Array.isArray(payload) ? payload : payload?.data ?? []

            return rows.map(i => ({
                id: i.id,
                name: i.name,
                logo: i.logo ?? null,
                country: i?.country?.name ?? null,
                segment: i?.segment?.name ?? null,
                seller: i?.seller?.name ?? null,
                // if product can be one-to-many, adapt accordingly:
                product: i?.product?.[0]?.item?.name ?? null
            }))
        }
    }
)
</script>

<template>
    <div>
        <ClientDirectory :items="clients" />
    </div>
</template>