<script setup lang="ts">
import UserAdd from './UserAdd.vue';
import UserList from './UserList.vue';
import { getUsers } from '@/services/UserService';

let storedUsers = getUsers();

</script>

<template>
    <div class="ms-3">
        <h1 class="text-white">User Details</h1>
        <UserAdd />
        <UserList :users="storedUsers" />
    </div>
</template>

<style scoped></style>