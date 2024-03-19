<template>
  <button class="loading__btn relative">
        <svg v-show="isLoading" class="w-5 h-5 text-white animate-spin" fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"></path>
        </svg>
        <span :class="{'hidden': isLoading}">
            <slot />
        </span>
  </button>
</template>

<script setup lang="ts">
defineProps({
    isLoading: {
        type: Boolean,
        default: false
    }
})
</script>

<style scoped>
.loading__btn {
    @apply w-full h-[34px] cursor-pointer rounded-[50px] bg-[#656ED3] flex items-center justify-center hover:opacity-75 transition-all;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    & span {
        @apply capitalize font-sans font-light text-[16px] text-white;
    }
}
</style>