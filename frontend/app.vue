<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtPage />
    <UNotifications />
  </div>
</template>

<script setup>
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/logo2.png'
    }
  ],
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - AMS` : 'Trang Không Tồn Tại';
  },
  // bodyAttrs: {
  //   class: 'test'
  // },
});
</script>

<style>
@import url("animate.css");
</style>