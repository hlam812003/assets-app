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
                <p class="asset__modal--headerText">{{ localAsset.asset_type }} / {{ localAsset.asset_name }} / {{ localAsset.asset_id }}</p>
            </div>
            <div class="asset__modal--body">
                <div class="asset__modal--bodyTop">
                    <div class="asset__modal--bodyTop-left">
                        <div class="asset__modal--bodyTop-leftItem">
                            <div class="asset__modal--bodyTop-leftItemTitle">Id:</div>
                            <input type="text" :value="localAsset.asset_id" class="bg-[#dbdbdb]" name="assetId" id="assetId" readonly/>
                        </div>
                        <div class="asset__modal--bodyTop-leftItem">
                            <div class="asset__modal--bodyTop-leftItemTitle">Asset name:</div>
                            <input type="text" v-model="localAsset.asset_name" :class="{ 'disabled': !isEditable }" name="assetName" id="assetName" :readonly="!isEditable"/>
                        </div>
                        <div class="asset__modal--bodyTop-leftItem">
                            <div class="asset__modal--bodyTop-leftItemTitle">Asset type:</div>
                            <input type="text" v-model="localAsset.asset_type" :class="{ 'disabled': !isEditable }" name="assetType" id="assetType" :readonly="!isEditable"/>
                        </div>
                        <div class="asset__modal--bodyTop-leftItem">
                            <div class="asset__modal--bodyTop-leftItemTitle">Status:</div>
                           <div class="modal__select--btn" :class="{ 'disabled': !isEditable }" :disabled="!isEditable" @click="isEditable && (showMenu = !showMenu)">
                                <span>{{ localAsset.status }}</span>
                                <img src="/caretIcon.png">
                                <div class="select__menu--wrapper" v-if="showMenu">
                                    <div class="select__menu--item" v-for="status in statusOptions" :key="status" @click="updateStatus(status)">
                                      {{ status }}
                                    </div>
                                </div>
                           </div> 
                        </div>
                        <div class="asset__modal--bodyTop-leftItem">
                            <div class="asset__modal--bodyTop-leftItemTitle">Price:</div>
                            <input type="text" v-model="localAsset.price" :class="{ 'disabled': !isEditable }" name="assetPrice" id="assetPrice" :readonly="!isEditable"/>
                        </div>
                    </div>
                    <div class="asset__modal--bodyTop-right">
                        <img :src="isErrorImg ? '/errorImg.png' : localAsset.asset_img" class="asset__img">
                        <button class="asset__import--btn" :disabled="!isEditable" @click="isEditable && (showImportPhotoWrapper = !showImportPhotoWrapper)">import photo</button>
                    </div>
                </div>
                <div class="asset__modal--description">
                    <div class="asset__modal--descriptionTitle">Description:</div>
                    <div class="asset__modal--descriptionContent">{{ localAsset.description }}</div>
                </div>
                <div class="asset__modal--actions">
                    <button class="asset__btn add" @click="handleUpdate">accept</button>
                    <button class="asset__btn edit" @click="toggleEdit">edit</button>
                    <button class="asset__btn delete" @click="handleDelete">delete</button>
                  </div>
            </div>
            <div class="asset__modal--footer">
                Input Day : {{ localAsset.purchased_date }}
            </div>
            <div class="import__photo--container" v-if="showImportPhotoWrapper">
                <div class="import__photo--wrapper"
                    :class="[
                        'asset__modal--wrapper', 
                        'animate__animated',
                        isCloseImportPhoto ? 'animate__zoomOut' : 'animate__zoomIn',
                        'animate__fast', 
                    ]">
                    <div class="import__photo--header">
                        <img src="/leaveIcon.png" class="close__modal" @click="closeImportPhotoWrapper">
                        <p class="import__photo--headerText">Import photo</p>
                    </div>                    
                    <div class="w-full flex items-center justify-center mt-[36px]">
                        <input type="text" v-model="localAsset.asset_img" class="import__photo--input"/>
                    </div>
                    <div class="w-full flex items-center justify-center mt-[28px]">
                        <button class="import__photo--btn" @click="acceptImportPhoto">accept</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import assetService from '~/server/services/asset.services';
const isClosing = ref(false);
const isErrorImg = ref(false);
const isEditable = ref(false);
const showMenu = ref(false);
const showImportPhotoWrapper = ref(false);
const isCloseImportPhoto = ref(false);

const statusOptions = [
    'in use', 
    'in stock', 
    'under maintenance', 
    'lost'
];

const emit = defineEmits(['close', 'updateSuccess']);

const props = defineProps({
  asset: {
    type: Object,
    required: true,
    default: () => ({})
  }
});

const localAsset = reactive({ ...props.asset });

const emitClose = () => {
    isClosing.value = true;
    setTimeout(() => {
        emit('close');
    }, 750);
};

const toggleEdit = () => {
    isEditable.value = !isEditable.value;
    showMenu.value = false;
};

const toast = useToast();

const handleUpdate = async () => {
    const updateData = {
        assetName: localAsset.asset_name,
        assetType: localAsset.asset_type,
        assetImage: localAsset.asset_img,
        description: localAsset.description,
        price: localAsset.price,
        departmentId: localAsset.department_id,
        status: localAsset.status,
    };

        await assetService.updateAsset(localAsset.asset_id, updateData).then(() => {
        toast.add({
            title: 'Logged in successfully!',
            icon: 'i-heroicons-check-circle-solid',
            color: 'green',
            description: `Asset ${localAsset.asset_id} updated successfully!`,
            timeout: 3000
        });
        isEditable.value = false;
        emit('close');
        emit('updateSuccess');
  }).catch((err) => {
    toast.add({
        title: 'Error!',
        icon: 'i-heroicons-no-symbol-solid',
        color: 'red',
        description: 'Failed to update asset, please try again!',
        timeout: 3000
    })
    console.error('Failed to update asset', err);
  });
};

const handleDelete = async () => {
    await assetService.deleteAsset(localAsset.asset_id).then(() => {
        toast.add({
            title: 'Delete Successfully!',
            icon: 'i-heroicons-check-circle-solid',
            color: 'green',
            description: `Asset ${localAsset.asset_id} deleted successfully!`,
            timeout: 3000
        });
        emit('close');
        emit('updateSuccess');
    }).catch((err) => {
        toast.add({
            title: 'Error!',
            icon: 'i-heroicons-no-symbol-solid',
            color: 'red',
            description: 'Failed to delete asset, please try again!',
            timeout: 3000
        })
        console.error('Failed to delete asset', err);  
    })
};

function updateStatus(status: string) {
  localAsset.status = status;
  showMenu.value = false; 
};

const closeImportPhotoWrapper = () => {
    isCloseImportPhoto.value = true;
    setTimeout(() => {
        showImportPhotoWrapper.value = false;
        isCloseImportPhoto.value = false;
    }, 500);
};

const acceptImportPhoto = async () => {
    if (!localAsset.asset_img) {
        isErrorImg.value = true;
        return;
    };

    try {
        await assetService.updateAsset(localAsset.asset_id, { asset_img: localAsset.asset_img });
        toast.add({
            title: 'Photo Update Successful!',
            icon: 'i-heroicons-check-circle-solid',
            color: 'green',
            description: `Photo URL updated successfully for Asset ${localAsset.asset_id}.`,
            timeout: 3000
        });
        closeImportPhotoWrapper();
    } catch (err) {
        toast.add({
            title: 'Error Updating Photo URL!',
            icon: 'i-heroicons-no-symbol-solid',
            color: 'red',
            description: 'Failed to update photo URL, please try again!',
            timeout: 3000
        });
        console.error('Failed to update photo URL', err);
    }
};

// const assetRefs = toRefs(localAsset);
</script>

<style scoped>
@import url("~/assets/css/Dashboard/DashboardAssetModal.css");
</style>