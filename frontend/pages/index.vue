<template>
    <NuxtLayout name="home-layout">
        <h1 class="uppercase text-[42px] font-bold mb-2"><span class="bg-[#7241FF] px-[12px]">assets</span> management</h1>
        <p class="text-[16px] font-normal capitalize text-[#FFFFFFBF]">your trust, our quality</p>
    </NuxtLayout>
</template>

<script setup>
definePageMeta({
  layout: false,
  middleware: ['auth']
});

useHead({
    title: 'Trang Chủ',
});
</script>