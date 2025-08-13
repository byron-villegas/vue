<script setup lang="ts">
import type { User } from '@/models/User';

const props = defineProps<{ users: User[] }>();

function formatBalance(saldo: number): string {
    let numberValue = Number(saldo) || 0;
    return `$${numberValue.toLocaleString('es-CL')}`;
}
</script>

<template>
    <div>
        <h3 class="text-white">Users</h3>
        <table class="table table-dark table-sm">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>RUT</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Fecha Nacimiento</th>
                    <th>Edad</th>
                    <th>Sexo</th>
                    <th>Saldo</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in props.users" :key="index" class="pointer" v-hover>
                    <td>{{ index + 1 }}</td>
                    <td>{{ user.rut }}</td>
                    <td>{{ user.nombres }}</td>
                    <td>{{ user.apellidos }}</td>
                    <td>{{ user.fechaNacimiento }}</td>
                    <td>{{ user.edad }}</td>
                    <td>{{ user.sexo }}</td>
                    <td>{{ formatBalance(user.saldo) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped></style>