<template>
    <section class="main__dashboard animate__animated animate__fadeIn">
        <!--  -->
        <DashboardNavbar v-if="userInfo" :userInfo="userInfo.username ?? '👤'"/>
        <div class="main__dashboard--body">
            <slot />
        </div>
    </section>
</template>

<script setup lang="ts">
import DashboardNavbar from '~/components/Dashboard/DashboardNavbar.vue';

import { useUserStore } from '~/stores/User';

const userStore = useUserStore();
// const isLoggedIn = computed(() => userStore.isLoggedIn);
const userInfo: ComputedRef<UserInfo | null> = computed(() => userStore.userInfo);

</script>

<style scoped>
@import url("~/assets/css/Dashboard/DashboardPage.css");
</style>