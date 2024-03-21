<template>
    <div id="DashboardUsers" class="dashboard__users">
        <div class="users__header">user management</div>
        <div class="users__options--wrapper">
            <div class="users__options--left">
                <FilterBar icon="ele4" iconSize="19" content="Show by user ID" color="users" class="w-[236px]"/>
                <FilterBar icon="ele2" iconSize="8" content="Show by department" color="users" class="w-[227px]"/>
            </div>
            <SearchBar color="users" placeholder="Input username..." @search="handleSearch" />
        </div>
        <div class="w-full flex items-center justify-center mt-[19px]">
            <DashboardUserTable :search-query="search"/>
        </div>    
    </div>
</template>

<script setup lang="ts">
import FilterBar from './Options/FilterBar.vue';
import SearchBar from './Options/SearchBar.vue';
import DashboardUserTable from './DashboardUserTable.vue';

const search = ref('');

const handleSearch = (query: string) => {
  search.value = query;
};

</script>

<style scoped>
@import url("~/assets/css/Dashboard/DashboardUsers.css");
</style>