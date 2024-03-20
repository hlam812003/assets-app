<template>
    <NuxtLayout name="dashboard-layout">
        <DashboardSidebar :activePage="activePageName" @update-page="setActivePage" />
        <DashboardContent>
            <component :is="activePage" />
        </DashboardContent>
    </NuxtLayout>
</template>

<script setup lang="ts">
import DashboardSidebar from '~/components/Dashboard/DashboardSidebar.vue';
import DashboardContent from '~/components/Dashboard/DashboardContent.vue';
// import { useUserStore } from '~/stores/User';

definePageMeta({
    layout: false,
    // middleware: 'auth'
});

useHead({
    title: 'Trang Quản Trị',
});

const activePageName = ref('DashboardAssets');

const activePage = computed(() => {
  return resolveComponent(activePageName.value);
});

const setActivePage = (newPage: string) => {
  activePageName.value = newPage;
};
</script>