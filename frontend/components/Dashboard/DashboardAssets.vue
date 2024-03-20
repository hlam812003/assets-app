<template>
    <div id="DashboardAssets" class="dashboard__assets animate__animated animate__fadeInUp animate__fast">
        <div class="assets__header">asset management</div>
        <div class="assets__options--wrapper">
            <div class="assets__options--left">
                <FilterBar icon="ele2" iconSize="8" content="Show by department" color="assets" class="w-[237px]" />
                <FilterBar icon="ele2" iconSize="8" content="Show by type" color="assets" class="w-[217px]"/>
            </div>
            <SearchBar color="assets" placeholder="Input asset name..." @search="handleSearch" />
        </div>
        <div class="w-full flex items-center justify-center mt-[19px]">
            <DashboardAssetTable :search-query="searchQuery"/>
        </div>      
    </div>
</template>

<script setup lang="ts">
import FilterBar from './Options/FilterBar.vue';
import SearchBar from './Options/SearchBar.vue';
import DashboardAssetTable from './DashboardAssetTable.vue';

const searchQuery = ref('');

const handleSearch = (query: string) => {
  searchQuery.value = query;
};

</script>

<style scoped>
@import url("~/assets/css/Dashboard/DashboardAssets.css");
</style>