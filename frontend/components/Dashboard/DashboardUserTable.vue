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
    <div v-else-if="!pending && (error || users.length === 0)">
      <div class="w-full h-[192px] flex items-center justify-center gap-[6px]">
        <Icon icon="material-symbols:error-outline" style="color: #ff0000" class="text-[18px]"/>
        <p class="font-sans text-[16px] text-[red] font-normal">No data or users found.</p>
      </div>
    </div>
    <div v-else class="dashboard__table--wrapper">
        <div class="dashboard__table--header">
            <div class="dashboard__table--headerItem">user id</div>
            <div class="dashboard__table--headerItem">user name</div>
            <div class="dashboard__table--headerItem">department</div>
            <div class="dashboard__table--headerItem">role</div>
            <div class="dashboard__table--headerItem">edit</div>
        </div>
        <div class="dashboard__users--list">
          <div class="dashboard__users--item" v-for="user in users" :key="user.user_id">
                <div class="dashboard__users--content dashboard__users--id">{{ user.user_id }}</div>
                <div class="dashboard__users--content dashboard__users--name" :style="{ color: user.username === null ? 'red' : '' }">{{ user.username ?? "Unknown User" }}</div>
                <div class="dashboard__users--content dashboard__users--department">{{ user.department_id }}</div>
                <div class="dashboard__users--content dashboard__users--role">{{ user.role }}</div>
                <div class="dashboard__users--content dashboard__users--edit" @click="showModal(user)">
                    <img src="/editIcon.png">
                </div>
          </div>
        </div>
        <DashboardUserModal 
            v-if="isModalVisible"
            :user="selectedAsset"
            @close="closeModal"
            @updateSuccess="refreshTable"
        />
        <div class="dashboard__users--footer">
          <div class="dashboard__users--footerContent">
              Show up {{ startIndex }} to {{ endIndex }} of {{ totalUsers }} users
          </div>
          <div class="dashboard__users--navigation">
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
import DashboardUserModal from '~/components/Dashboard/DashboardUserModal.vue';
import { type UserInfo } from '~/types/User';
import { Icon } from '@iconify/vue';

const currentPage = ref(1);
const limit = ref(5);
const isRefreshing = ref(false);
const selectedAsset = ref({});
const isModalVisible = ref(false);

const props = defineProps({
  search: String
});

const { data: usersData, pending, error, refresh } = await useLazyAsyncData(
  'user',
  () => $fetch('/api/admin/user', {
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

const users = computed(() => (usersData.value as { assets: UserInfo[]; total: number }).assets ?? []);
const totalUsers = computed(() => (usersData.value as { users: UserInfo[]; total: number }).total ?? 0);

const showModal = (user: UserInfo) => {
  selectedAsset.value = { ...user };
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const nextPage = () => {
  if (currentPage.value * limit.value < totalUsers.value) {
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
  return Math.min(startIndex.value + limit.value - 1, totalUsers.value);
});

const isLastPage = computed(() => {
  return currentPage.value * limit.value >= totalUsers.value;
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

</script>

<style scoped>
@import url("~/assets/css/Dashboard/DashboardUserTable.css");
</style>