<template>
  <div>
    <div class="breand__cards-wrapper__card">
      <a href="#"><img style="width: 80px;" :src="brand" alt="" /></a>
    </div>
  </div>
</template>

<script setup>
const {brand} = defineProps(['brand'])
</script>

<style lang="scss" scoped>
</style>