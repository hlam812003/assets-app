<template>
    <ClientOnly fallback="Loading...">
        <Doughnut 
            :data="props.chartData"
            :options="props.chartOptions"
            class="dashboard__chart"
        />
    </ClientOnly>
</template>

<script setup>
import { Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  DoughnutController
} from 'chart.js';

import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  ArcElement,
  DoughnutController,
  ChartDataLabels
);

const props = defineProps({
    chartData: {
        type: Object,
        default: null
    },
    chartOptions: {
        type: Object,
        default: null
    }
});

defineComponent({
    name: 'DashboardChart',
    extends: Doughnut,
});
</script>

<style scoped>
@import url("~/assets/css/Dashboard/DashboardChart.css");
</style>