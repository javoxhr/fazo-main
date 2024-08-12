<template>
    <div>
        <div class="popular-card">
            <h3>{{ popular?.name }}</h3>
            <img :src="popular?.iconUrl" alt="">
        </div>
    </div>
</template>

<script setup>
const {popular} = defineProps(['popular'])
</script>

<style lang="scss" scoped>
.popular-card {
    width: 450px;
    height: 120px;
    border: 1px solid #f4f3f3;
    border-radius: 5px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 20px;
    @media screen and (max-width: 1287px) {
        width: 100%;
        * {
            font-size: 14px;
        }
    }
}
</style>