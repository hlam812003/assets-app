<template>
    <div class="main__sidebar">
        <div class="sidebar__item" :class="{ active: isActive('DashboardHome') }" @click="setSelectedTab('DashboardHome')">
            <img src="/homeIcon.png">
            <p>dashboard</p>
        </div>
        <div class="sidebar__item" :class="{ active: isActive('DashboardAssets') }" @click="setSelectedTab('DashboardAssets')">
            <img src="/assetsIcon.png">
            <p>asset management</p>
        </div>
        <div class="sidebar__item" v-if="isAdmin" :class="{ active: isActive('DashboardUsers'), hidden: !isAdmin }" @click="setSelectedTab('DashboardUsers')">
            <img src="/userIcon.png">
            <p>User management</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/User';

const userStore = useUserStore();

const isAdmin = computed(() => {
  return userStore.userInfo?.role === 'Admin';
});

const emit = defineEmits(['update-page']);

const props = defineProps({
    activePage: String
});

const setSelectedTab = (componentName: string) => {
    emit('update-page', componentName);
};

const isActive = (pageName: string) => {
    return props.activePage === pageName;
};
</script>

<style scoped>
@import url("~/assets/css/Dashboard/DashboardSidebar.css");
</style>