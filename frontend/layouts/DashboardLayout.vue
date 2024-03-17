<template>
    <section class="main__dashboard">
        <!-- v-if="userInfo" :userInfo="userInfo.username ?? 'Unknown User'" -->
        <DashboardNavbar />
        <div class="main__dashboard--body">
            <DashboardSidebar />
            <DashboardContent>

            </DashboardContent>
        </div>
    </section>
</template>

<script setup lang="ts">
import DashboardSidebar from '~/components/DashboardSidebar.vue';
import DashboardNavbar from '~/components/DashboardNavbar.vue';
import DashboardContent from '~/components/DashboardContent.vue';

import { useUserStore } from '~/stores/User';

const userStore = useUserStore();
// const isLoggedIn = computed(() => userStore.isLoggedIn);
const userInfo: ComputedRef<UserInfo | null> = computed(() => userStore.userInfo);

</script>

<style scoped>
@import url("~/assets/css/DashboardPage.css");
</style>