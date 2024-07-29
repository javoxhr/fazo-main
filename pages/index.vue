<template>
  <div>
    <loader v-if="store.loader"/>
    <div class="hero">
      <div class="container">
        <Swiper
          :modules="[SwiperNavigation, SwiperAutoplay, SwiperPagination]"
          :loop="true"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: true,
          }"
          :pagination="true"
          :navigation="{
            prevEl: '.prev',
            nextEl: '.next',
          }"
        >
          <SwiperSlide
            class="slide"
            v-for="banner in banners?.data"
            :key="banner"
          >
            <a href="#">
              <img class="hero__img slide-img" :src="banner?.imageUrl" alt="" />
            </a>
          </SwiperSlide>
        </Swiper>
        <div class="hero__swiper-btn">
          <button class="prev">
            <img src="@/assets/images/png/left-arrow.png" alt="" />
          </button>
          <button class="next">
            <img src="@/assets/images/png/right-arrow.png" alt="" />
          </button>
        </div>
      </div>
    </div>

    <!-- <div class="menu-hero">
      <Swiper
        :modules="[SwiperNavigation, SwiperAutoplay]"
        :loop="true"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: true,
        }"
      >
        <SwiperSlide v-for="banner in banners?.data" :key="banner">
          <img :src="banner?.imageUrl" alt="" />
        </SwiperSlide>
      </Swiper>
    </div> -->

    <div class="offers">
      <div class="container">
        <div class="offers__text-wrapper">
          <h1>Горящие предложения</h1>
          <a href="#"
            >Посмотреть все <img src="./images/png/arrow---.png" alt=""
          /></a>
        </div>

        <div class="offers__cards-wrapper">
          <ProductCard v-for="item in productCategory" :key="item" :product="item"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/store/store";
import ProductCard from "~/components/productCard.vue";
import services from "~/services/services";

const store = useStore()

const products = ref({});
const banners = ref({});
const productCategory = ref({})

async function getProduct() {
  store.loader = true
  const res = await services.getProduct();
  products.value = res;
  console.log(res);
  store.loader = false
}

async function getBanners() {
  store.loader = true
  const res = await services.getBanners();
  console.log(res);
  banners.value = res;
  store.loader = false
}

async function getProductCategory() {
  store.loader = true
  const res = await services.getProductCategory()
  console.log(res)
  productCategory.value = res.data
  store.loader = false
}

getProductCategory()
getBanners();
getProduct();
</script>

<style lang="scss">
.swiper-img {
  width: 100%;
  height: 333px;
  object-fit: cover;
  object-position: bottom;
}
.slide-img {
  width: 100%;
  object-fit: cover;
}
.slide {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>