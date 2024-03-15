<template>
    <NuxtLayout name="login-layout">
        <h1 class="capitalize font-sans text-[47px] mb-[39px] text-[#1B2D75] font-bold">welcome back!</h1>
        <form @submit.prevent="onFormSubmit">
            <input type="text" id="username" name="username" placeholder="username" v-model="userName" autocomplete="off">
            <input type="password" id="password" name="password" placeholder="password" v-model="passWord" autocomplete="off">
            <div class="options__wrapper mt-[4px] mb-[4px] pl-2">
                <div class="remember__wrapper">
                    <input type="checkbox" id="remember" name="remember">
                    <label for="remember">Remember me</label>
                </div>
                <NuxtLink to="#">
                    <p class="forgot__text">forgot password?</p>
                </NuxtLink>
            </div>
            <input type="submit" id="submit" name="submit" value="login" @submit="onFormSubmit"> 
        </form>
    </NuxtLayout>
</template>

<script setup lang="ts">
import auth from '~/server/services/auth.services';
import { useUserStore } from '~/stores/User';

const router = useRouter();
const userStore = useUserStore();

const userName = ref('');
const passWord = ref('');

const toast = useToast();

async function onFormSubmit(e: Event): Promise<void> {
    if (!userName.value || !passWord.value) {
            toast.add({
            title: 'Lỗi!',
            icon: 'i-heroicons-no-symbol-solid',
            color: 'red',
            description: 'Vui lòng nhập Username và Password!',
            timeout: 2500
        });
    } else {
        try {
            const loginData = await auth.login({ username: userName.value, password: passWord.value });
            userStore.setUser({ username: userName.value, password: passWord.value });

            toast.add({
                title: 'Đăng nhập thành công!',
                icon: 'i-heroicons-check-circle-solid',
                color: 'green',
                description: `Chào mừng ${userName.value} đã trở lại!`,
                timeout: 3000
            });

            userName.value = '';
            passWord.value = '';

            router.push('/dashboard');
        } catch (err) {
            toast.add({
                title: 'Đăng nhập thất bại!',
                icon: 'i-heroicons-no-symbol-solid',
                color: 'red',
                description: (err as any).data?.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau!',
                timeout: 3000
            });
        };
    };

};

// async function onFormSubmit(e: Event): Promise<void> {
//     e.preventDefault();
//     if (!formState.username || !formState.password) {
//         toast.add({
//             title: 'Lỗi!',
//             icon: 'i-heroicons-no-symbol-solid',
//             color: 'red',
//             description: 'Vui lòng nhập Username và mật khẩu!',
//             timeout: 2500
//         });
//     } else {
//         try {

//             const userData = await auth.login(formState);
//             userStore.setUser({ username: userData.username, password: userData.password });

//             toast.add({
//                 title: 'Đăng nhập thành công!',
//                 icon: 'i-heroicons-check-circle-solid',
//                 color: 'green',
//                 description: `Chào mừng ${userData.name} đã trở lại!`,
//                 timeout: 3000
//             });

//             router.push('/');

//         } catch (err) {
//             toast.add({
//                 title: 'Đăng nhập thất bại!',
//                 icon: 'i-heroicons-no-symbol-solid',
//                 color: 'red',
//                 description: (err as any).data?.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau!',
//                 timeout: 3000
//             });
//         }
//     }
// };

definePageMeta({
  layout: false,
});

useHead({
    title: 'Đăng Nhập',
});
</script>

<style scoped>
form {
    @apply w-[367px] flex items-center flex-col gap-[13px];
}

form input[type="text"],
form input[type="password"] {
    @apply w-full h-[40px] rounded-[50px] px-[18px] outline-none bg-[#EBEFFF] border border-solid border-[#656ED3] text-[16px] font-medium font-sans text-[#1b2d75e8];
    &::placeholder {
        @apply text-[#1b2d75e8] capitalize;
    }
}

form .options__wrapper {
    @apply w-full flex items-center justify-between;
}

form .options__wrapper .remember__wrapper {
    @apply flex items-center gap-[6px];
}

form .options__wrapper .remember__wrapper input[type="checkbox"] {
    @apply w-[23px] h-[23px] rounded-[5px] bg-[#B2B9D7] border-none outline-none appearance-none;
    -webkit-appearance: none;
    margin: 0;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25) inset;
}

form .options__wrapper .remember__wrapper label,
form .options__wrapper .forgot__text {
    @apply text-[#000] font-light text-[14px] font-sans capitalize;
}

form input[type="submit"] {
    @apply w-full h-[34px] cursor-pointer rounded-[50px] bg-[#656ED3] capitalize font-sans font-light text-[16px] text-white hover:opacity-75 transition-all;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}
</style>