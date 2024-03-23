import { useUserStore } from '~/stores/User';

export default defineNuxtRouteMiddleware(async(to, from) => {
  const userStore = await useUserStore();

  if (!userStore.isLoggedIn) {
      return navigateTo('/login');
  };

});