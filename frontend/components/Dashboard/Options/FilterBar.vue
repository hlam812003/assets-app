<template>
    <button id="FilterBar" class="filter__bar">
        <p class="filter__bar--header">{{ content }}</p>
        <img src="/ele2.png">
    </button>
</template>

<script setup>
defineProps({
    content: {
        type: String,
        required: true,
    }
});
</script>

<style scoped>
@import url("~/assets/css/Dashboard/Options/FilterBar.css");
</style>