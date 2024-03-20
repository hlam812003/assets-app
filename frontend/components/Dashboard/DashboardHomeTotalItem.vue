<template>
    <div id="DashboardHomeTotalItem" :class="['dashboard__total--item', props.color]">
        <div class="total__item--icon">
            <img :src="getImgPath(props.icon)">
        </div>
        <div class="total__item--content">
            <div class="total__item--count">
                {{ animatedCount }}
            </div>
            <div class="total__item--label">
                {{ props.label }}
            </div>
        </div>
    </div>
</template>

<script setup>
const animatedCount = ref(0);

const props = defineProps({
    color: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,  
    },
    label: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    }
});

const getImgPath = (icon) => {
    return `/${icon}.png`;
};

onMounted(() => {
    const target = props.count;
    const step = target / 100;
    let currentCount = 0;

    const interval = setInterval(() => {
        currentCount += step;
        animatedCount.value = Math.min(target, Math.round(currentCount));
        if (animatedCount.value === target) {
            clearInterval(interval);
        }
    }, 15);

    watchEffect((onInvalidate) => {
        onInvalidate(() => {
            clearInterval(interval);
        });
    });
});

</script>

<style scoped>
@import url("~/assets/css/Dashboard/DashboardHomeTotalItem.css");
</style>