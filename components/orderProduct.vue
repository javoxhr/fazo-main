<template>
  <div>
    <div class="buy__left__products-wrapper__card">
      <img class="oreder-product-img" :src="productOrder?.image" alt="" />
      <h1 class="buy__products-wrapper__card__title">
        {{ productOrder?.title }}
      </h1>
      <span>{{ productOrder?.quantity }} шт</span>
      <h2>{{ productOrder?.price * productOrder?.quantity }} Сум</h2>
    </div>
  </div>
</template>

<script setup>
const {productOrder} = defineProps(["productOrder"])
</script>

<style lang="scss" scoped>

.oreder-product-img {
    width: 100px;
}
</style>