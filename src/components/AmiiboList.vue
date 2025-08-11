<script setup lang="ts">
import type { Amiibo } from '@/models/Amiibo';
import { findAmiibosBySerie } from '@/services/AmiiboService';
import { onMounted, ref } from 'vue';

const amiibos = ref<Amiibo[]>([])

onMounted(async () => {
    amiibos.value = await findAmiibosBySerie('Smash');
})

</script>

<template>
    <div>
        <h3 class="text-white">Amiibos</h3>
        <table class="table table-dark table-sm">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(amiibo, index) in amiibos" :key="index" class="pointer" v-hover>
                    <td>{{ index + 1 }}</td>
                    <td>{{ amiibo.name }}</td>
                    <td>
                        <a :href="`/amiibo/${amiibo.name}`" class="text-decoration-none text-white">View</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
</style>