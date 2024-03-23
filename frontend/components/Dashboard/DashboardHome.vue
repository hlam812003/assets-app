<template>
    <div id="DashboardHome" class="dashboard__home animate__animated animate__fadeIn animate__fast">
        <div class="assets__header">asset management</div>
        <div class="assets__body">
            <div class="assets__body--header">
                <DashboardHomeTotalItem 
                    v-for="asset in assetsList" 
                    :key="asset.icon" 
                    :icon="asset.icon" 
                    :count="asset.count" 
                    :label="asset.label"
                    :color="asset.color" 
                />
            </div>
            <div class="assets__body--bottom">
                <div class="assets__body--bottomLeft">
                    <div class="bottomLeft__header">The chart shows the device ratio by status</div>
                    <div class="bottomLeft__chart">
                        <DashboardChart
                            :chartData="chartData"
                            :chartOptions="chartOptions"
                        />
                    </div>
                </div>
                <div class="assets__body--bottomRight">
                    <div class="bottomRight__header">Total number of asset in use (by department)</div>
                    <DashboardTotalTable />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import DashboardHomeTotalItem from './DashboardHomeTotalItem.vue';
import DashboardChart from './DashboardChart.vue';
import DashboardTotalTable from './DashboardTotalTable.vue';

import generalService from '~/services/general.services';

const generalData = await generalService.getAllGenerals();
const pieChartData = await generalService.getPieChart();

const chartData = reactive({
    labels: ['In using', 'Available'],
    datasets: [
        {
            label: 'Stauts',
            data: [pieChartData.in_using, pieChartData.available],
            backgroundColor: [
                '#517EFF',
                '#5252FD',
            ],
            hoverOffset: 4,
        }
    ]
});

const chartOptions = reactive({
    responsive: true,
    maintainAspectRatio: false,
    spacing: 0,
    plugins: {
        legend: {
            position: 'right',
            display: true,
            align: 'start',
            labels: {
                usePointStyle: true,
                padding: 17,
                fontSize: 13,
            }
        },
        datalabels: {
            formatter: (value, ctx) => {
                let sum = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                let percentage = Math.round((value * 100) / sum) + "%";
                return percentage;
            },
            color: '#fff',
        }
    }
});

const assetsList = [
    {
        icon: "assetIcon",
        count: `${generalData.type_of_asset}`,
        label: "Type of asset",
        color: "asset"
    },
    {
        icon: "availableIcon",
        count: `${generalData.available}`,
        label: "Available",
        color: "available"
    },
    {
        icon: "maintenanceIcon",
        count: `${generalData.under_maintenance}`,
        label: "Under Maintenance",
        color: "under-maintenance"
    },
    {
        icon: "userIcon2",
        count: `${generalData.user_count}`,
        label: "User",
        color: "total-user"
    }
];

</script>

<style scoped>
@import url("~/assets/css/Dashboard/DashboardHome.css");
</style>