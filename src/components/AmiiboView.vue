<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { Amiibo } from '@/models/Amiibo';
import { findAmiiboById } from '@/services/AmiiboService';
import { onMounted, ref } from 'vue';

const route = useRoute()
const amiibo = ref<Amiibo | undefined>()

onMounted(async () => {
    const id = route.params.id as string
    amiibo.value = await findAmiiboById(id);
})

</script>

<template>
    <div className="ms-3">
        <h1 className="text-white">Amiibo Details</h1>
        <h2 className="text-white">Amiibo ID: {{ amiibo?.name }}</h2>
        <h2 className="text-white">Name: {{ amiibo?.name }}</h2>
        <h2 className="text-white">Character: {{ amiibo?.character }}</h2>
        <h2 className="text-white">Game Series: {{ amiibo?.gameSeries }}</h2>
        <h2 className="text-white">Amiibo Series: {{ amiibo?.amiiboSeries }}</h2>
        <h2 className="text-white">Type: {{ amiibo?.type }}</h2>
        <img :src="amiibo?.image" :alt="amiibo?.name" />
        <div className="row mt-2">
            <div className="col-6">
                <h3 className="text-white">Releases:</h3>
                <ul class="list-group">
                    <li v-for="(value, region) in amiibo?.release" :key="region"
                        class="list-group-item list-group-item-dark text-white">
                        {{ region }}: {{ value }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.list-group-item-dark {
    background-color: #292929 !important;
}
</style>