<template>
  <button class="refresh__btn" @click="handleRefresh">
    <img src="/refreshIcon.png" class="w-[22px] h-[22px]" :class="{'animate-spin': isRefreshing}">
  </button>
  <button class="add__btn" @click="isCreateModalVisible = true">
    <img src="/addIcon.png" class="w-[22px] h-[22px]">
  </button>
  <UModal v-model="isCreateModalVisible" prevent-close>
    <UCard :ui="{ background: 'dark:bg-[#FCFCFA]', ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800'}">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-sans text-[17px] font-semibold text-gray-900 light:text-black">
            Create new asset
          </h3>
          <UButton color="black" variant="solid" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isCreateModalVisible = false" />
        </div>
      </template>
      <div class="p-4">
        <UForm :validate="validate" :state="state" class="space-y-4" @submit.prevent="onSubmit">
          <UFormGroup label="Email" name="email">
            <UInput v-model="state.email" />
          </UFormGroup>
      
          <UFormGroup label="Password" name="password">
            <UInput v-model="state.password" type="password" />
          </UFormGroup>
      
          <UButton type="submit">
            Submit
          </UButton>
        </UForm>
      </div>
    </UCard>
  </UModal>
    <div v-if="pending">
      <div class="w-full h-[192px] flex items-center justify-center gap-[12px]">
        <p class="font-sans text-[16px] text-[#000] font-normal">Loading data...</p>
        <Icon icon="ant-design:loading-outlined" style="color: black" class="animate-spin text-[18px]"/>
      </div>
    </div>
    <div v-else-if="!pending && (error || assets.length === 0)">
      <div class="w-full h-[192px] flex items-center justify-center gap-[6px]">
        <Icon icon="material-symbols:error-outline" style="color: #ff0000" class="text-[18px]"/>
        <p class="font-sans text-[16px] text-[red] font-normal">No data or assets found.</p>
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
                <div class="dashboard__assets--content dashboard__assets--name" :style="{ color: asset.asset_name === null ? 'red' : '' }">{{ asset.asset_name ?? "Unknow Asset" }}</div>
                <div class="dashboard__assets--content dashboard__assets--type">{{ asset.asset_type }}</div>
                <div class="dashboard__assets--content dashboard__assets--department">{{ asset.department_name }}</div>
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
          @updateSuccess="refreshTable"
        />
        <div class="dashboard__assets--footer">
          <div class="dashboard__assets--footerContent">
              Show up {{ startIndex }} to {{ endIndex }} of {{ totalItems }} items
          </div>
          <div class="dashboard__assets--navigation">
            <button
              class="navigation__btn navigation__btn--left"
              :style="{ 'display': currentPage <= 1 ? 'none' : '' }"
              @click="prevPage" 
              :disabled="currentPage <= 1"
            >
              <img src="/leftIcon.png">
              back
            </button>
            <span class="font-sans italic text-[12px] font-light text-[#2196F3]">{{ currentPage }}</span>
            <button
              class="navigation__btn navigation__btn--right"
              :style="{ 'display': isLastPage ? 'none' : '' }"
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
import type { AssetData } from '~/types/Asset';
import { Icon } from '@iconify/vue';
import type { FormError, FormSubmitEvent } from '#ui/types'

const state = reactive({
  email: undefined,
  password: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Required' })
  if (!state.password) errors.push({ path: 'password', message: 'Required' })
  return errors
}

const currentPage = ref(1);
const limit = ref(5);
const isRefreshing = ref(false);
const selectedAsset = ref({});
const isModalVisible = ref(false);
const isCreateModalVisible = ref(false);

const props = defineProps({
  search: String
});

const { data: assetsData, pending, error, refresh } = await useLazyAsyncData(
  'asset',
  () => $fetch('/api/asset', {
    params: {
      page: currentPage.value,
      limit: limit.value,
      search: props.search
    }
  }),
  {
    watch: [currentPage, limit, () => props.search],
  }
);

const assets = computed(() => (assetsData.value as { assets: AssetData[]; total: number }).assets ?? []);
const totalItems = computed(() => (assetsData.value as { assets: AssetData[]; total: number }).total ?? 0);

const showModal = (asset: AssetData) => {
  selectedAsset.value = { ...asset };
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

const refreshTable = () => {
  // currentPage.value = 1;
  handleRefresh();
};

async function onSubmit (event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)
}

</script>

<style scoped>
@import url("~/assets/css/Dashboard/DashboardAssetTable.css");
</style>