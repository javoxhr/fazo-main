<template>
  <div>
    <div class="category-name">
      <div class="container">
        <h1>{{ category?.category?.name }}</h1>
        <div class="category-name__btns">
          <button class="grid-3">
            <img src="~/assets/images/svg/grid.svg" alt="" />
          </button>
          <button class="grid-1">
            <img src="~/assets/images/svg/grid-menu.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
    <div class="filter">
      <div class="container">
        <div class="filter__body">
          <div class="price">
            <span>Цена (cум)</span>
          </div>
          <div class="to-from">
            <span>от 300 000</span>
            <span>до 103 300 000</span>
          </div>
          <Slider v-model="value" range class="w-14rem" />
          <!-- <Slider v-model="value" range class="w-56" /> -->
          <div class="pick-up">
            <h1>Наличие</h1>
            <div class="up">
              <input type="checkbox" />
              <h2>Забрать сегодня</h2>
            </div>
          </div>
          <div class="breand-filter">
            <h1>Бренд</h1>
            <button><img src="./images/png/top-arrow.png" alt="" /></button>
          </div>
          <div class="filter__list">
            <ul>
              <li v-for="brand in category?.brands" :key="brand">
                <input type="checkbox" />
                <a href="#">{{ brand?.name }}</a>
              </li>
            </ul>
          </div>

          <div class="filter__botter">
            <div class="filter__botter__wrap">
              <h1>Емкость аккумулятора</h1>
              <button><img src="./images/png/top-arrow.png" alt="" /></button>
            </div>
            <div class="botter-width">
              <label class="botter-width__item">
                <input type="checkbox" name="check" />
                <h2>1821 мА⋅ч</h2>
              </label>

              <label class="botter-width__item">
                <input type="checkbox" />
                <h2>3000 мА⋅ч</h2>
              </label>

              <label class="botter-width__item">
                <input type="checkbox" />
                <h2>4500 мА⋅ч</h2>
              </label>

              <label class="botter-width__item">
                <input type="checkbox" />
                <h2>5000 мА⋅ч</h2>
              </label>
            </div>
          </div>
          <button class="check-btn">Показать</button>
        </div>
        <div class="filter__cards-wrapper">
          <productCard
            class="filter-card"
            v-for="item in category?.products?.items"
            :key="item"
            :product="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Slider from "primevue/slider";

import { useStore } from "~/store/store";
import services from "~/services/services";

const { slug } = useRoute().params;

const {locale, t} = useI18n()

const store = useStore();
const value = ref([20, 80]);
const category = ref({});

async function getCategorysProduct() {
  const res = await services.getCategorysProducts(slug, locale.value);
  category.value = res.data;
  console.log(res.data);
}

getCategorysProduct();
</script>

<style lang="scss" scoped>
.filter-card {
  width: 230px;
}
</style>