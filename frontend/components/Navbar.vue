<template>
    <div id="Navbar" class="main__nav animate__animated animate__fadeInDown">
        <img src="/logo.png">
        <div class="nav__buttons--wrapper">
            <div>
                <!-- <p>{{ userInfo.value?.username }}</p> -->
            </div>
            <div else>
                <NuxtLink to="/login">
                    <button class="font-sans border-[#2A2B3A] hover:border-[#7241FF] hover:shadow hover:shadow-[#74F] transition-all"> 
                        sign in
                    </button>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type Ref, ref, watch, computed } from 'vue';

// const userStore = useUserStore();
// const isLoggedIn = computed(() => userStore.isLoggedIn);
// const userInfo: ComputedRef<UserInfo | null> = computed(() => userStore.userInfo);
</script>

<style scoped>
@import url("~/assets/css/Navbar.css");
</style>