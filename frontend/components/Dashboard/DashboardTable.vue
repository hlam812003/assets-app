<template>
  <button class="refresh__btn" @click="handleRefresh">
    <img src="/refreshIcon.png" class="w-[22px] h-[22px]" :class="{'animate-spin': isRefreshing}">
  </button>
    <div v-if="pending">
      <div class="w-full h-[192px] flex items-center justify-center gap-[12px]">
        <p class="font-sans text-[16px] text-[#000] font-normal">Loading data...</p>
        <Icon icon="ant-design:loading-outlined" style="color: black" class="animate-spin text-[18px]"/>
      </div>
    </div>
    <div v-else-if="error">
      <div class="w-full h-[192px] flex items-center justify-center gap-[12px]">
        <p class="font-sans text-[16px] text-[red] font-normal">An error occurred while loading data.</p>
        <Icon icon="material-symbols:error-outline" style="color: #ff0000" class="text-[18px]"/>
      </div>
    </div>
    <div v-else class="dashboard__table--wrapper">
        <div class="dashboard__table--header">
            <div class="dashboard__table--headerItem">asset id</div>
            <div class="dashboard__table--headerItem">asset name</div>
            <div class="dashboard__table--headerItem">type</div>
            <div class="dashboard__table--headerItem">department</div>
            <div class="dashboard__table--headerItem">status</div>
            <div class="dashboard__table--headerItem">view</div>
        </div>
        <div class="dashboard__assets--list">
            <div class="dashboard__assets--item" v-for="asset in assets" :key="asset.asset_id">
                <div class="dashboard__assets--content dashboard__assets--id">{{ asset.asset_id }}</div>
                <div class="dashboard__assets--content dashboard__assets--name">{{ asset.asset_name }}</div>
                <div class="dashboard__assets--content dashboard__assets--type">{{ asset.asset_type }}</div>
                <div class="dashboard__assets--content dashboard__assets--department">{{ asset.department_id }}</div>
                <div class="dashboard__assets--content dashboard__assets--status">{{ asset.status }}</div>
                <div class="dashboard__assets--content dashboard__assets--view">
                    <img src="/ele3.png">
                </div>
            </div>
        </div>
        <div class="dashboard__assets--footer">
          <div class="dashboard__assets--footerContent">
              Show up {{ startIndex }} to {{ endIndex }} of {{ totalItems }} items
          </div>
          <div class="dashboard__assets--navigation">
            <button
              class="navigation__btn navigation__btn--left"
              :class="{ 'opacity-50': currentPage <= 1 }"
              @click="prevPage"
              :disabled="currentPage <= 1"
            >
              <img src="/leftIcon.png">
              back
            </button>
            <button
              class="navigation__btn navigation__btn--right"
              :class="{ 'opacity-50': isLastPage }"
              @click="nextPage"
              :disabled="isLastPage"
              >
              next
              <img src="/rightIcon.png">
            </button>
          </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

const currentPage = ref(1);
const limit = ref(5);
const isRefreshing = ref(false);

interface AssetData {
  asset_id: number;
  asset_name: string;
  asset_type: string;
  department_id: string;
  status: string;
};

const { data: fetchData, pending, error, refresh } = useFetch('/api/assets', {
  params: computed(() => ({ limit: limit.value, page: currentPage.value })),
  lazy: true
});

const assets = computed(() => (fetchData.value as { assets: AssetData[]; totalAssets: number }).assets ?? []);
const totalItems = computed(() => (fetchData.value as { assets: AssetData[]; totalAssets: number }).totalAssets ?? 0);

const nextPage = () => {
  if (currentPage.value * limit.value < totalItems.value) {
    currentPage.value++;
  };
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const startIndex = computed(() => {
  return (currentPage.value - 1) * limit.value + 1;
});

const endIndex = computed(() => {
  return Math.min(startIndex.value + limit.value - 1, totalItems.value);
});

const isLastPage = computed(() => {
  return currentPage.value * limit.value >= totalItems.value;
});

const handleRefresh = async () => {
  isRefreshing.value = true;
  await refresh().finally(() => {
    isRefreshing.value = false;
  });
};
</script>

<style scoped>
@import url("~/assets/css/Dashboard/DashboardTable.css");
</style>