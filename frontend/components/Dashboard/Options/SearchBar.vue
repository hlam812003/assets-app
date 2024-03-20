<template>
    <div class="search__bar">
        <input type="text" name="searchAsset" id="searchAsset" :class="[props.color]" v-model="searchQuery" :placeholder="props.placeholder" />
        <button :class="['search__btn', props.color]" @click="handleSearchClick">
            <img src="/searchIcon.png">
        </button>
    </div>
</template>

<script setup>
import { debounce } from 'lodash';

const props = defineProps({
    color: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        required: true
    },
});

const searchQuery = ref('');
const emit = defineEmits(['search']);

const toast = useToast();

const emitSearch = debounce(() => {
  emit('search', searchQuery.value.trim());
}, 500);

const handleSearchClick = () => {
    if (searchQuery.value.trim() === '') {
        toast.add({
            title: 'Failed!',
            icon: 'i-heroicons-no-symbol-solid',
            color: 'red',
            description: "You can't search an empty string!",
            timeout: 1500
        });
        return;
    };

    emitSearch();
};

watch(searchQuery, (newValue) => {
    if (newValue.trim() === '') {
        emitSearch();
    };
});
</script>

<style scoped>
@import url("~/assets/css/Dashboard/Options/SearchBar.css");
</style>