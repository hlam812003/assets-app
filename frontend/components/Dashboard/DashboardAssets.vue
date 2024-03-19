<template>
    <!-- animate__animated animate__fadeInUp animate__fast -->
    <div id="DashboardAssets" class="dashboard__assets ">
        <div class="assets__header">asset management</div>
        <div class="assets__options--wrapper">
            <div class="assets__options--left">
                <FilterBar content="Show by department" class="w-[237px]"/>
                <FilterBar content="Show by type" class="w-[217px]"/>
            </div>
            <SearchBar />
        </div>
        <div class="w-full flex items-center justify-center mt-[19px]">
            <DashboardTable />
        </div>
    </div>
</template>

<script setup lang="ts">
import FilterBar from './Options/FilterBar.vue';
import SearchBar from './Options/SearchBar.vue';
import DashboardTable from './DashboardTable.vue';
</script>

<style scoped>
@import url("~/assets/css/Dashboard/DashboardAssets.css");
</style>