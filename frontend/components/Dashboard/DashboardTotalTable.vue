<template>
    <div id="DashboardTotalTable" class="dashboard__total--table">
        <div class="total__table--header">
            <div class="table__header--item">
                Department
            </div>
            <div class="table__header--item">
                Type of asset
            </div>
            <div class="table__header--item">
                Total assets
            </div>
        </div>
        <div class="total__table--list">
            <div class="total__table--item" v-for="(item, index) in generalData" :key="index">
                <div class="total__table--content department">{{ item.department_name }}</div>
                <div class="total__table--content asset__type">{{ item["COUNT(DISTINCT asset_type)"] }}</div>
                <div class="total__table--content asset__total">{{ item["COUNT(asset_id)"] }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import generalService from '~/server/services/general.services';

const generalData = await generalService.getAllDepartments();
</script>

<style scoped>
@import url("~/assets/css/Dashboard/DashboardTotalTable.css");
</style>