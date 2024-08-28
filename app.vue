<template>
  <div class="body">
    <NuxtLayout />
  </div>
</template>

<script setup>
import { useStore } from "./store/store";

import { useHead } from '#app'

// Устанавливаем мета-теги для всего приложения
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' }
  ]
})

const store = useStore();

onMounted(() => {
  if (process.client) {
    store.cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
});
</script>

<style lang="scss" scoped>
.body {
  background: #fff;
}
</style>
