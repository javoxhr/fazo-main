<template>
  <div>
    <loader v-if="store.loader" />
    <div class="container">
      <h1 class="page-name">{{ t("Saved") }}</h1>
      <div class="cards-wrapper">
        <ProductCard
          v-for="item in store.savedProducts?.items"
          :key="item"
          :product="item"
        />
      </div>
    </div>
  </div>
</template>


<script setup>
import services from "~/services/services";
import { useStore } from "~/store/store";

const store = useStore();

const {locale, t} = useI18n()

async function getSavedProduct() {
  store.loader = true;
  const res = await services.getSavedProduct(store.token);
  console.log(res)
  store.savedProducts = res?.data;
  store.loader = false;
}

getSavedProduct();
</script>


<style lang="scss">
.cards-wrapper {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 40px 0;
}

@media screen and (max-width: 1287px) {
  .cards-wrapper {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (max-width: 1150px) {
  .cards-wrapper {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 860px) {
  .cards-wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 550px) {
  .cards-wrapper {
    grid-template-columns: 1fr;
  }
}

.page-name {
  font-weight: 500;
  font-size: 25px;
  padding: 30px 0 0;
}

</style>