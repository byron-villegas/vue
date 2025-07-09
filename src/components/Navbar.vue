<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
    <nav class="navbar navbar-dark navbar-expand-lg mb-3" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Vue</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a :class="'nav-link ' + (route.path === '/' ? 'active' : '')" aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a :class="'nav-link ' + (route.path === '/users' ? 'active' : '')" href="/users">Users</a>
                    </li>
                    <li class="nav-item">
                        <a :class="'nav-link ' + (route.path === '/about' ? 'active' : '')" href="/about">About</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navbar-dark {
  background-color: #292929 !important;
}
</style>