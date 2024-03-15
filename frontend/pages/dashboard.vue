<template>
    <NuxtLayout name="dashboard-layout">
        
    </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
    layout: false,
    middleware: 'auth'
});
</script>