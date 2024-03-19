<template>
    <section class="main__home">
        <Navbar />
        <main class="animate__animated animate__fadeIn">
            <slot />
        </main>
        <img src="/ele1.png">
    </section>
</template>

<script setup>
import Navbar from "~/components/Navbar.vue";
</script>

<style scoped>
@import url("~/assets/css/HomePage.css");
</style>