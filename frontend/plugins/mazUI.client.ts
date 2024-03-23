import { vFullscreenImgInstall } from 'maz-ui'

export default defineNuxtPlugin(NuxtApp => {
    NuxtApp.vueApp.use(vFullscreenImgInstall);
})