<template>
    <button id="FilterBar" :class="['filter__bar', props.color]">
        <p class="filter__bar--header">{{ content }}</p>
        <img :src="`/${props.icon}.png`" :style="`height: ${props.iconSize}px`">
    </button>
</template>

<script setup>
const props = defineProps({
    content: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    iconSize: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    }
});
</script>

<style scoped>
@import url("~/assets/css/Dashboard/Options/FilterBar.css");
</style>