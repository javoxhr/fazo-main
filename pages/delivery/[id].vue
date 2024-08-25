<template>
    <div>
        <loader v-if="store.loader"/>
        <div class="container">
            <div class="wrapper">
                <div class="info">
                    <h1>Ma'lumot</h1>
                    <div class="info__card-wrap">
                        <div class="info-card" v-for="item in pageInfo" :key="item">
                        <NuxtLink :to="`/delivery/${item?.id}`">{{ item?.name }}</NuxtLink>
                    </div>
                    </div>
                </div>

                <div class="detail-info">
                    <div class="detail-info-item" v-for="item in detailInfo" :key="item">
                        <h2>{{ item?.title }}</h2>
                        <span>{{ item?.content }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import services from '~/services/services';
import { useStore } from '~/store/store';

const store = useStore()

const {locale, locales, t} = useI18n()

const {id} = useRoute().params

const detailInfo = ref({})

const pageCategoryDetail = async function() {
    store.loader = true
    const res = await services.pageCategoryDetail(id, locale.value)
    detailInfo.value = res?.data
    store.loader = false
    console.log(res)
}

const pageInfo = ref({})

const pageCtegory = async function() {
    store.loader = true
    const res = await services.pageCategory()
    pageInfo.value = res?.data
    store.loader = false
}

pageCategoryDetail()
pageCtegory()
</script>

<style lang="scss" scoped>
.info {
    width: 400px;
    padding: 10px 0 0;
    border: 1px solid #c9c9c9;
    border-radius: 5px;
    @media screen and (max-width: 1000px) {
        width: 100%;
    }
    h1 {
        font-weight: 500;
        font-size: 25px;
        padding-left: 20px;
    }
    &__card-wrap {
        margin-top: 20px;
    }
    &-card {
        background: #f9f8f8;
        padding: 22px 10px;
        cursor: pointer;
        * {
            font-weight: 500;
            font-size: 16px;
            color: #565555;
        }
        &:hover {
            background: #fff;
        }
    }
}
.detail-info {
    display: flex;
    flex-direction: column;
    gap: 53px;
    &-item {
        display: flex;
        flex-direction: column;
        gap: 20px;
        h2 {
            font-weight: 600;
            font-size: 23px;
            color: #444444;
            line-height: 1.2;
            @media screen and (max-width: 600px) {
                font-size: 18px;
            }
        }
        span {
            width: 100%;
            max-width: 1100px;
            font-size: 14px;
            line-height: 1.8;
            display: block;
        }
    }
}
.wrapper {
    padding: 60px 0;
    display: flex;
    align-items: flex-start;
    gap: 50px;
    @media screen and (max-width: 700px) {
        padding: 30px 0;
    }
    @media screen and (max-width: 1000px) {
        flex-direction: column;
    }
}
</style>