<template>
  <!-- <button class="refresh__btn" @click="handleRefresh">
    <img src="/refreshIcon.png" class="w-[22px] h-[22px]" :class="{'animate-spin': isRefreshing}">
  </button>
    <div v-if="pending">
      <div class="w-full h-[192px] flex items-center justify-center gap-[12px]">
        <p class="font-sans text-[16px] text-[#000] font-normal">Loading data...</p>
        <Icon icon="ant-design:loading-outlined" style="color: black" class="animate-spin text-[18px]"/>
      </div>
    </div> -->
    <!-- <div v-else-if="!pending && !error && assets.length === 0" class="w-full h-[192px] flex items-center justify-center gap-[6px]">
      <Icon icon="material-symbols:error-outline" style="color: #ff0000" class="text-[18px]"/>
      <p class="font-sans text-[16px] text-[red] font-normal">An error occurred while loading data.</p>
    </div> -->
    <div class="dashboard__table--wrapper">
        <div class="dashboard__table--header">
            <div class="dashboard__table--headerItem">user id</div>
            <div class="dashboard__table--headerItem">user name</div>
            <div class="dashboard__table--headerItem">department</div>
            <div class="dashboard__table--headerItem">role</div>
            <div class="dashboard__table--headerItem">edit</div>
        </div>
        <div class="dashboard__users--list">
          <!-- <div class="dashboard__users--item">
              <div class="dashboard__users--content dashboard__users--id">1</div>
              <div class="dashboard__users--content dashboard__users--name">123</div>
              <div class="dashboard__users--content dashboard__users--department">123</div>
              <div class="dashboard__users--content dashboard__users--role">23</div>
              <div class="dashboard__users--content dashboard__users--edit">
                  <img src="/editIcon.png">
              </div>
          </div> -->
            <!-- <div class="dashboard__users--item" v-for="asset in assets" :key="asset.asset_id">
                  <div class="dashboard__users--content dashboard__users--id">{{ asset.asset_id }}</div>
                  <div class="dashboard__users--content dashboard__users--name">{{ asset.asset_name }}</div>
                  <div class="dashboard__users--content dashboard__users--department">{{ asset.department_id }}</div>
                  <div class="dashboard__users--content dashboard__users--role">{{ asset.status }}</div>
                  <div class="dashboard__users--content dashboard__users--edit" @click="showModal(asset)">
                      <img src="/editIcon.png">
                  </div>
            </div> -->
        </div>
        <!-- <DashboardAssetModal 
          v-if="isModalVisible"
          :asset="selectedAsset"
          @close="closeModal"
        /> -->
        <!-- <div class="dashboard__users--footer">
          <div class="dashboard__users--footerContent">
              Show up {{ startIndex }} to {{ endIndex }} of {{ totalItems }} users
          </div>
          <div class="dashboard__users--navigation">
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
        </div> -->
    </div>
</template>

<script setup lang="ts">
import DashboardAssetModal from '~/components/Dashboard/DashboardAssetModal.vue';
import { Icon } from '@iconify/vue';

// const currentPage = ref(1);
// const limit = ref(5);
// const isRefreshing = ref(false);
// const selectedAsset = ref({});
// const isModalVisible = ref(false);

// const props = defineProps({
//   searchQuery: String
// });

// interface AssetData {
//   asset_id: number;
//   asset_name: string;
//   asset_type: string;
//   department_id: string;
//   status: string;
// };

// const { data: fetchData, pending, error, refresh } = useFetch('/api/asset', {
//   params: computed(() => ({ 
//     limit: limit.value, 
//     page: currentPage.value,
//     search_query: props.searchQuery 
//   })),
//   lazy: true
// });

// const assets = computed(() => (fetchData.value as { assets: AssetData[]; totalAssets: number }).assets ?? []);
// const totalItems = computed(() => (fetchData.value as { assets: AssetData[]; totalAssets: number }).totalAssets ?? 0);

// const showModal = (asset: AssetData) => {
//   selectedAsset.value = asset;
//   isModalVisible.value = true;
// };

// const closeModal = () => {
//   isModalVisible.value = false;
// };

// const nextPage = () => {
//   if (currentPage.value * limit.value < totalItems.value) {
//     currentPage.value++;
//   };
// };

// const prevPage = () => {
//   if (currentPage.value > 1) {
//     currentPage.value--;
//   }
// };

// const startIndex = computed(() => {
//   return (currentPage.value - 1) * limit.value + 1;
// });

// const endIndex = computed(() => {
//   return Math.min(startIndex.value + limit.value - 1, totalItems.value);
// });

// const isLastPage = computed(() => {
//   return currentPage.value * limit.value >= totalItems.value;
// });

// const handleRefresh = async () => {
//   isRefreshing.value = true;
//   await refresh().finally(() => {
//     isRefreshing.value = false;
//   });
// };
</script>

<style scoped>
@import url("~/assets/css/Dashboard/DashboardUserTable.css");
</style>