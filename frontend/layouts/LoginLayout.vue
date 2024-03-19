<template>
    <section class="main__login">
        <div class="login__wrapper">
            <slot />
        </div>
        <div class="contact__wrapper">
            <p class="contact__text">Contact us via:</p>
            <img src="/socialIcons.png">
        </div>
    </section>
</template>

<style scoped>
@import url("~/assets/css/LoginPage.css");
</style>