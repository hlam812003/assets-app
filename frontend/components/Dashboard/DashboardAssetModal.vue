<template>
    <div id="DashboardAssetModal" class="asset__modal--container">
        <div :class="[
            'asset__modal--wrapper', 
            'animate__animated', 
            isClosing ? 'animate__fadeOutUp' : 'animate__fadeInDown', 
            'animate__fast']"
            >
            <div class="asset__modal--header">
                <img src="/leaveIcon.png" class="close__modal" @click="emitClose">
                <p class="asset__modal--headerText">{{ asset.asset_type }} / {{ asset.asset_name }} / {{ asset.asset_id }}</p>
            </div>
            <div class="asset__modal--body">
                <div class="asset__modal--bodyTop">
                    <div class="asset__modal--bodyTop-left">
                        <div class="asset__modal--bodyTop-leftItem">
                            <div class="asset__modal--bodyTop-leftItemTitle">Id:</div>
                            <input type="text" :value="asset.asset_id" name="assetId" id="assetId" readonly/>
                        </div>
                        <div class="asset__modal--bodyTop-leftItem">
                            <div class="asset__modal--bodyTop-leftItemTitle">Asset name:</div>
                            <input type="text" :value="asset.asset_name" name="assetName" id="assetName" readonly/>
                        </div>
                        <div class="asset__modal--bodyTop-leftItem">
                            <div class="asset__modal--bodyTop-leftItemTitle">Asset type:</div>
                           <div class="modal__select--btn">
                                <span>{{ asset.asset_type }}</span>
                                <img src="/caretIcon.png">
                           </div> 
                        </div>
                        <div class="asset__modal--bodyTop-leftItem">
                            <div class="asset__modal--bodyTop-leftItemTitle">Status:</div>
                           <div class="modal__select--btn">
                                <span>{{ asset.status }}</span>
                                <img src="/caretIcon.png">
                           </div> 
                        </div>
                        <div class="asset__modal--bodyTop-leftItem">
                            <div class="asset__modal--bodyTop-leftItemTitle">Price:</div>
                            <input type="text" :value="asset.price" name="assetPrice" id="assetPrice" readonly/>
                        </div>
                    </div>
                    <div class="asset__modal--bodyTop-right">
                        <img :src="isErrorImg ? '/errorImg.png' : asset.asset_img" class="asset__img">
                        <button class="asset__import--btn">import photo</button>
                    </div>
                </div>
                <div class="asset__modal--description">
                    <div class="asset__modal--descriptionTitle">Description:</div>
                    <div class="asset__modal--descriptionContent">{{ asset.description }}</div>
                </div>
                <div class="asset__modal--actions">
                    <button class="asset__btn add">accept</button>
                    <button class="asset__btn edit">edit</button>
                    <button class="asset__btn delete">delete</button>
                </div>
            </div>
            <div class="asset__modal--footer">
                Input Day : 16-03-2024
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const isClosing = ref(false);
const isErrorImg = ref(true);

const emit = defineEmits(['close']);

defineProps({
  asset: {
    type: Object,
    default: () => ({})
  }
});
const emitClose = () => {
    isClosing.value = true;
    setTimeout(() => {
        emit('close');
    }, 750);
};
</script>

<style scoped>
@import url("~/assets/css/Dashboard/DashboardAssetModal.css");
</style>