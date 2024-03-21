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
    <div v-else-if="!pending && !error && assets.length === 0" class="w-full h-[192px] flex items-center justify-center gap-[6px]">
      <Icon icon="material-symbols:error-outline" style="color: #ff0000" class="text-[18px]"/>
      <p class="font-sans text-[16px] text-[red] font-normal">An error occurred while loading data.</p>
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
                <div class="dashboard__assets--content dashboard__assets--view" @click="showModal(asset)">
                    <img src="/ele3.png">
                </div>
            </div>
        </div>
        <DashboardAssetModal 
          v-if="isModalVisible"
          :asset="selectedAsset"
          @close="closeModal"
        />
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
import DashboardAssetModal from '~/components/Dashboard/DashboardAssetModal.vue';
import { Icon } from '@iconify/vue';

const currentPage = ref(1);
const limit = ref(5);
const isRefreshing = ref(false);
const selectedAsset = ref({});
const isModalVisible = ref(false);

const props = defineProps({
  searchQuery: String
});

interface AssetData {
  asset_id: number;
  asset_name: string;
  asset_type: string;
  department_id: string;
  image: string;
  status: string;
};

const { data: assetsData, pending, error, refresh } = await useAsyncData(
  'asset',
  () => $fetch('/api/asset', {
    params: {
      page: currentPage.value,
      limit: limit.value,
      search: props.searchQuery
    }
  }),
  {
    watch: [currentPage, limit, () => props.searchQuery],
  }
);

const assets = computed(() => (assetsData.value as { assets: AssetData[]; total: number }).assets ?? []);
console.log(assetsData.value);
const totalItems = computed(() => (assetsData.value as { assets: AssetData[]; total: number }).total ?? 0);

const showModal = (asset: AssetData) => {
  selectedAsset.value = asset;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const nextPage = () => {
  if (currentPage.value * limit.value < totalItems.value) {
    currentPage.value++;
    refresh();
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    refresh();
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

// watch([currentPage, limit, props.searchQuery], async () => {
//   console.log("Fetching new data...");
//   await refresh().then(() => {
//     console.log("Data refreshed:", fetchData.value);
//   }).catch((error) => {
//     console.error("Error refreshing data:", error);
//   });
// }, { immediate: true });

</script>

<style scoped>
@import url("~/assets/css/Dashboard/DashboardAssetTable.css");
</style>