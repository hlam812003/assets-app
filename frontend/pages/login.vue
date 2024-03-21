<template>
    <NuxtLayout name="login-layout">
        <h1 class="capitalize font-sans text-[47px] mb-[39px] text-[#1B2D75] font-bold">welcome back!</h1>
        <form @submit.prevent="onFormSubmit">
            <input type="text" id="username" name="username" v-model="userName" :class="{ 'error': formState.submitted && !userName }" :placeholder="formState.submitted && !userName ? 'username is required' : 'username'" autocomplete="off">
            <input type="password" id="password" name="password" v-model="passWord" :class="{ 'error': formState.submitted  && !passWord }" :placeholder="formState.submitted && !passWord ? 'password is required' : 'password'" autocomplete="off">
            <div class="options__wrapper mt-[4px] mb-[4px] pl-2">
                <div class="remember__wrapper">
                    <input type="checkbox" id="remember" name="remember">
                    <label for="remember">Remember me</label>
                </div>
                <NuxtLink to="#">
                    <p class="forgot__text">forgot password?</p>
                </NuxtLink>
            </div>
            <LoadingButton :isLoading="isLoading" id="submit" @submit="onFormSubmit">
                login
            </LoadingButton>
        </form>
    </NuxtLayout>
</template>

<script setup lang="ts">
import axios from "axios";

import LoadingButton from '~/components/LoadingButton.vue';

// import auth from '~/server/services/auth.services';
import { useUserStore } from '~/stores/User';

const router = useRouter();
const userStore = useUserStore();

const userName = ref('');
const passWord = ref('');
const formState = reactive({
  submitted: false,
});

const isLoading = ref(false);

const toast = useToast();

async function onFormSubmit(): Promise<void> {
    formState.submitted = true;
    isLoading.value = true;

    if (!userName.value || !passWord.value) {
        toast.add
        ({
            title: 'Error!',
            icon: 'i-heroicons-no-symbol-solid',
            color: 'red',
            description: 'Please enter the Username and Password!',
            timeout: 2500
        });

        isLoading.value = false;

        return;
    };

    try {
        const loginSuccess = await userStore.loginUser(userName.value, passWord.value);

        userStore.setUser({username: userName.value});
        
        if (!loginSuccess) {
            toast.add({
                title: 'Error!',
                icon: 'i-heroicons-no-symbol-solid',
                color: 'red',
                description: 'Incorrect username or password, please try again!',
                timeout: 2500
            });
            isLoading.value = false;
        } else {
            setTimeout(() => {
                isLoading.value = false;
        
                toast.add({
                    title: 'Logged in successfully!',
                    icon: 'i-heroicons-check-circle-solid',
                    color: 'green',
                    description: `Welcome back, ${userName.value}.`,
                    timeout: 3000
                });
        
                router.push('/dashboard');
            }, 2000);
        }

    } catch (err) {
        console.error(err);
        let errorMessage = 'An unexpected error occurred. Please try again later.';

        if (axios.isAxiosError(err)) {
            if (err.response && err.response.status === 401) {
                errorMessage = "Incorrect username or password, please try again!";
            } else if (err.response) {
                errorMessage = err.response.data.message || 'Network or server error!';
            }
        };

        toast.add({
            title: 'Login failed!',
            icon: 'i-heroicons-no-symbol-solid',
            color: 'red',
            description: errorMessage,
            timeout: 3000
        });

        setTimeout(() => isLoading.value = false, 1500);
    }
};

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
    &.error {
        @apply border-red-600;
        &::placeholder {
            @apply text-red-600;
        }
    }
}

form .options__wrapper {
    @apply w-full flex items-center justify-between;
}

form .options__wrapper .remember__wrapper {
    @apply flex items-center gap-[6px];
}

form .options__wrapper .remember__wrapper input[type="checkbox"] {
    @apply w-[23px] h-[23px] rounded-[5px] bg-[#B2B9D7] border-none outline-none appearance-none grid place-content-center transition-all;
    -webkit-appearance: none;
    margin: 0;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25) inset;  
    &::before {
        content: "";
        width: 0.85em;
        height: 0.85em;
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
        transform: scale(0);
        transform-origin: bottom left;
        transition: 120ms transform ease-in-out;
        background-color: #4BAE4D;
    }
    &:checked {
        background-color: #C8E6CA;
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
        border: .25px solid white;
    }
    &:checked::before {
        transform: scale(1);
    }
}

form .options__wrapper .remember__wrapper label,
form .options__wrapper .forgot__text {
    @apply text-[#000] font-light text-[14px] font-sans capitalize;
}

</style>