<template>
  <div>
    <div class="cart-overlay" v-if="store.showCart"></div>
    <div class="cart" v-if="store.showCart">
      <div class="container">
        <div class="cart-header">
          <div class="cart-header__wrapper">
            <h1>{{ t("Cart") }}</h1>
            <button @click="store.showCart = false">
              <img src="../assets/images/svg/cart-close.svg" alt="" />
            </button>
          </div>
        </div>
        <div class="cart-wrapper">
          <h1 class="dont-product" v-if="!store.cart.length">
            {{ t("cartText") }} 😓
          </h1>
          <div class="cart-cards-wrapper">
            <CartItem
              class="cart-card"
              v-for="item in store?.cart"
              :key="item"
              :cartItem="item"
            />
          </div>
          <div class="total" v-if="store.cart.length">
            <div class="total-wrapper">
              <div class="total-text-wrapper">
                <span>{{ t("total") }} {{ store.cart.length }} {{ t("prod") }}</span>
                <h2>{{ totalProduct }} Сум</h2>
              </div>
              <NuxtLink :to="localePath('/order')" @click="store.showCart = false">
                <button>{{ t("purchase") }}</button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/store/store";
const localePath = useLocalePath();
const {locale, t} = useI18n()

const store = useStore();

const totalProduct = computed(() => {
  let price = 0;
  store.cart.forEach((el) => {
    price += Number(el.price) * el.quantity;
  });
  return price;
});
</script>

<style lang="scss" scoped>
</style>