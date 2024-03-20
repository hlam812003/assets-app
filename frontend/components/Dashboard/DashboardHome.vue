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

const chartData = reactive({
    labels: ['In using', 'Available'],
    datasets: [
        {
            label: 'Stauts',
            data: [50, 50],
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
                let sum = 0;
                let dataArr = ctx.chart.data.datasets[0].data;
                dataArr.map(data => {
                    sum += data;
                });
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
        count: 25,
        label: "Type of asset",
        color: "asset"
    },
    {
        icon: "availableIcon",
        count: 6,
        label: "Available",
        color: "available"
    },
    {
        icon: "maintenanceIcon",
        count: 6,
        label: "Under Maintenance",
        color: "under-maintenance"
    },
    {
        icon: "userIcon2",
        count: 6,
        label: "User",
        color: "total-user"
    }
];

</script>

<style scoped>
@import url("~/assets/css/Dashboard/DashboardHome.css");
</style>