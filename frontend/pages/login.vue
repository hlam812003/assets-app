<template>
    <NuxtLayout name="login-layout">
        <h1 class="capitalize font-sans text-[47px] mb-[39px] text-[#1B2D75] font-bold">welcome back!</h1>
        <form action="">
            <input type="text" id="username" name="username" placeholder="username" autocomplete="off">
            <input type="password" id="password" name="password" placeholder="password" autocomplete="off">
            <div class="options__wrapper mt-[4px] mb-[4px] pl-2">
                <div class="remember__wrapper">
                    <input type="checkbox" id="remember" name="remember">
                    <label for="remember">Remember me</label>
                </div>
                <NuxtLink to="#">
                    <p class="forgot__text">forgot password?</p>
                </NuxtLink>
            </div>
            <input type="submit" id="submit" name="submit" value="login"> 
        </form>
    </NuxtLayout>
</template>

<script setup>
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
    @apply w-full h-[34px] cursor-pointer rounded-[50px] bg-[#656ED3] capitalize font-sans font-light text-[16px] text-white;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}
</style>