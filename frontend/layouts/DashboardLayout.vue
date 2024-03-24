<template>
    <section class="main__dashboard animate__animated animate__fadeIn">
        <!--  -->
        <DashboardNavbar v-if="userInfo" :userInfo="full_name"/>
        <div class="main__dashboard--body">
            <slot />
        </div>
    </section>
</template>

<script setup lang="ts">
import DashboardNavbar from '~/components/Dashboard/DashboardNavbar.vue';
import type { UserInfo } from '../types/User';

import { useUserStore } from '~/stores/User';

const userStore = useUserStore();
const userInfo: ComputedRef<UserInfo | null> = computed(() => userStore.userInfo);

const full_name = computed(() => {
    const user = userStore.userInfo;
    console.log(user);
    if (user && user.first_name && user.last_name) {
        return `${user.first_name} ${user.last_name}`;
    };
    return 'Unknown User';
});

</script>

<style scoped>
@import url("~/assets/css/Dashboard/DashboardPage.css");
</style>