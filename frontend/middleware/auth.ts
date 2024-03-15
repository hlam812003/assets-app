import { useUserStore } from '~/stores/User';

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  if (userStore.isLoggedIn && to.path === '/login') {
    return navigateTo('/dashboard');
  }

  // console.log(to.fullPath);

  if (!userStore.isLoggedIn && to.path === '/dashboard') {
    return navigateTo('/login');
  }

})