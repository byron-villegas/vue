<script setup lang="ts">
import { useRoute } from 'vue-router';

let currentYear = new Date().getFullYear();
const route = useRoute();
</script>

<template>
    <footer className="container py-5 mt-5">
        <div className="row">
            <div className="col-12 col-md">
                <img className="mb-2" src="/images/favicon.ico" alt="Footer Logo" width="24" height="24" />
                <small className="d-block mb-3 text-white">© {{ currentYear }} - {{ currentYear + 1 }}</small>
            </div>
            <div className="col-6 col-md text-white">
                <h5>MENU</h5>
                <ul className="list-unstyled text-small">
                    <li><a :class="'link-secondary link-white text-decoration-none ' + (route.path === '/' ? 'text-white' : '')"
                            href="/">HOME</a></li>
                </ul>
                <ul className="list-unstyled text-small">
                    <li><a :class="'link-secondary link-white text-decoration-none ' + (route.path === '/users' ? 'text-white' : '')"
                            href="/users">USERS</a></li>
                </ul>
                <ul className="list-unstyled text-small">
                    <li><a :class="'link-secondary link-white text-decoration-none ' + (route.path === '/about' ? 'text-white' : '')"
                            href="/about">ABOUT</a></li>
                </ul>
            </div>
            <div className="col-6 col-md text-white">
                <h5>MENU2</h5>
                <ul className="list-unstyled text-small">
                    <li><a :class="'link-secondary link-white text-decoration-none ' + (route.path === '/' ? 'text-white' : '')"
                            href="/">HOME</a></li>
                </ul>
            </div>
        </div>
        <div className="container-fluid text-center vertical-line">
            <p className="fw-light text-white mt-2">Copyright © {{ currentYear }}. Todos los derechos reservados.</p>
        </div>
    </footer>
</template>

<style scoped></style>