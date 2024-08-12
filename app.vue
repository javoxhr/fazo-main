<template>
  <div>
    <NuxtLayout />
  </div>
</template>

<script setup>
import { useStore } from "./store/store";

const store = useStore();

onMounted(() => {
  if (process.client) {
    store.cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
});
</script>
