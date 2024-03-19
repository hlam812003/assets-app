<template>
    <section class="main__login">
        <div class="login__wrapper animate__animated animate__fadeIn">
            <slot />
        </div>
        <div class="contact__wrapper animate__animated animate__fadeIn">
            <p class="contact__text">Contact us via:</p>
            <img src="/socialIcons.png">
        </div>
    </section>
</template>

<style scoped>
@import url("~/assets/css/LoginPage.css");
</style>