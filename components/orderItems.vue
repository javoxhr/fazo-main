<template>
    <div>
        <div class="order-product">
            <div class="delivery-id">
                #{{ orderItem?.id }}
            </div>
            <div class="order-product__wrapper">
                <div class="order-product__wrapper-items">
                    <div class="order-product-items-wrapper-items-item">
                        <span>Holat</span>
                        <span>{{orderItem?.statusName}}</span>
                    </div>
                    <div class="order-product-items-wrapper-items-item">
                        <span>Yetkazib berish sa'nasi</span>
                        <span></span>
                    </div>
                    <div class="order-product-items-wrapper-items-item">
                        <span>Qabul qiluvchi</span>
                        <span>{{ orderItem?.user }}</span>
                    </div>
                    <div class="order-product-items-wrapper-items-item">
                        <span>Yetkazib berish manzil</span>
                        <span>{{ orderItem?.address }}</span>
                    </div>
                </div>
                <div class="order-product-image">
                    <img v-for="item in orderItem?.orderItems" :key="item" :src="item?.imageUrl" alt="image">
                </div>
                <div class="deliveryAllPrice">
                    <span>Buyurtma narxi</span>
                    <span>{{ orderItem?.totalSumFormat }}</span>
                </div>
                <button class="replayPaymet">Qayta to'lov qilish</button>
            </div>
        </div>
    </div>
</template>

<script setup>
const {orderItem} = defineProps(['orderItem'])
</script>

<style lang="scss" scoped>
.order-product {
    width: 100%;
    border: 1px solid #c9c9c9;
    padding: 30px;
    border-radius: 8px;
    &__wrapper {
        width: 100%;
        &-items {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 20px;
            span {
                font-weight: 400;
                font-size: 11px;
            }
        }
    }
}
.order-product-items-wrapper-items-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.deliveryAllPrice {
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
        font-weight: 400;
        font-size: 14px;
    }
}

.order-product-image {
    display: flex;
    align-items: center;
    width: 100%;
    overflow: auto;
    padding: 20px 0;
    img {
        width: 90px;
        height: 100px;
        @media screen and (max-width: 500px) {
            width: 70px;
            height: 80px;
        }
    }
}

.replayPaymet {
    width: 100%;
    margin-top: 20px;
    padding: 8px;
    border-radius: 5px;
    border: none;
    color: #fff;
    background: rgb(0, 123, 255);
    font-weight: 600px;
    font-size: 14px;
    cursor: pointer;
    &:hover {
        opacity: 0.9;
    }
    &:active {
        opacity: 0.8;
    }
}
</style>