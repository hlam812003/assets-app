<template>
    <div id="DashboardNavbar" class="main__nav">
        <div class="nav__logo--wrapper">
            <img src="/logo3.png">
            <img src="/menuIcon.png" class="menu__icon">
        </div>
        <div class="nav__actions--wrapper">
            <p>{{ userInfo }}</p> 
            <img src="/dropdownIcon.png">
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    userInfo: {
        type: String,
        required: true,
    }
});
</script>

<style scoped>
@import url("~/assets/css/DashboardNavbar.css");
</style>