import { useUserStore } from '~/stores/User';

export default defineNuxtRouteMiddleware(async(to, from) => {
    const userStore = await useUserStore();

    if (!userStore.isLoggedIn && to.path !== '/login') {
      return navigateTo('/login');
    };
});