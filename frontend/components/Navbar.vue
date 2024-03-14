<template>
    <div id="Navbar" class="main__nav">
        <img src="/logo.png">
        <div class="nav__buttons--wrapper">
            <NuxtLink to="/login">
                <button class="font-sans border-[#2A2B3A]"> 
                    sign in
                </button>
            </NuxtLink>

            <NuxtLink to="/signup">
                <button class="font-sans border-[#7241FF] shadow shadow-[#74F]"> 
                    sign up
                </button>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
@import url("~/assets/css/Navbar.css");
</style>