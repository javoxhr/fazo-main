<template>
  <div>
    <loader v-if="store.loader" />
    <div class="hero">
      <div class="container">
        <Swiper
          :modules="[SwiperNavigation, SwiperAutoplay, SwiperPagination]"
          :loop="true"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false,
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

    <div class="menu-hero">
      <Swiper class="swiper-menu-banner"
        :modules="[SwiperNavigation, SwiperAutoplay, SwiperPagination]"
        :loop="true"
        :pagination="true"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
        }"
      >
        <SwiperSlide v-for="banner in banners?.data" :key="banner">
          <img style="width: 100%;" :src="banner?.imageUrl" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>

    <div class="offers">
      <div class="container">
        <div class="offers__text-wrapper">
          <h1>{{ t("flashOffers") }}</h1>
        </div>

        <div class="offers__cards-wrapper">
          <ProductCard
            v-for="item in productCategory"
            :key="item"
            :product="item"
          />
        </div>
      </div>
    </div>

    <div class="popular-cards">
      <div class="container">
        <h2 class="popular-cat-title">{{ t("PopularCategories") }}</h2>
        <button class="popular-nav prevEl">></button>
        <button class="popular-nav nextEl">></button>
        <div class="popular-cards-wrapper">
          <Swiper
            class="popular-swiper"
            :modules="[SwiperNavigation]"
            :slides-per-view="3"
            :space-between="20"
            :navigation="{
              prevEl: '.prevEl',
              nextEl: '.nextEl',
            }"
          >
            <SwiperSlide
              class="popular-slide"
              v-for="item in popularProduct"
              :key="item.id"
            >
              <PopularCard :popular="item" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>

    <div class="body-banners">
      <div class="container">
        <div class="body-swiper-nav">
          <button class="b-swp-prev">></button>
          <button class="b-swp-next">></button>
        </div>
        <Swiper
          class="body-banners-swiper"
          :modules="[SwiperNavigation]"
          :navigation="{
            prevEl: '.b-swp-prev',
            nextEl: '.b-swp-next',
          }"
        >
          <SwiperSlide
            class="body-banners-Slide"
            v-for="item in bodyBanners"
            :key="item"
          >
            <div class="body-banners-text-wrapper">
              <h2>{{ item?.title }}</h2>
              <p>{{ item?.description }}</p>
            </div>
            <div class="body-swiper-img-wrap">
              <img :src="item?.imageUrl" alt="" />
            </div>
            <div class="body-swiper-price-wrapper">
              <span>{{ item?.price }}</span>
              <a href="/" target="_blank" class="nxl">{{
                t("moreDetailes")
              }}</a>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>

    <div class="cheap-products">
      <div class="container">
        <h1 class="cheap-products-title">{{ t("CheapProducts") }}</h1>
        <div class="offers__cards-wrapper">
          <productCard
            v-for="item in cheapPorduct"
            :key="item"
            :product="item"
          />
        </div>
      </div>
    </div>

    <div class="breand">
      <div class="container">
        <div class="breand__text-wrapper">
          <h1>{{ t("Brands") }}</h1>
          <div class="breand-btns-wrap">
            <button>
              <img src="./images/png/breand-left-arrow.png" alt="" />
            </button>
            <button>
              <img src="./images/png/breand-right-arrow.png" alt="" />
            </button>
          </div>
        </div>

        <div class="brand-swiper-navigation">
          <button class="brand-prev">></button>
          <button class="brand-next">></button>
        </div>

        <div class="breand__cards-wrapper">
          <Swiper
            class="brand-swiper"
            :slides-per-view="5"
            :modules="[SwiperNavigation]"
            :navigation="{
              prevEl: '.brand-prev',
              nextEl: '.brand-next',
            }"
          >
            <SwiperSlide v-for="item in brands" :key="item">
              <brandCard :brand="item?.imageUrl" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/store/store";
import ProductCard from "~/components/productCard.vue";
import services from "~/services/services";
const { locale, t } = useI18n();
const store = useStore();

const banners = ref({});
const productCategory = ref({});

async function getBanners() {
  store.loader = true;
  const res = await services.getBanners(locale.value);
  console.log(res);
  banners.value = res;
  store.loader = false;
}

async function getProductCategory() {
  store.loader = true;
  const res = await services.getProductCategory(locale.value);
  console.log(res);
  productCategory.value = res.data;
  store.loader = false;
}

const popularProduct = ref({});

async function popularCategory() {
  const res = await services.popularCategory(locale.value);
  popularProduct.value = res.data;
  console.log(res);
}

const cheapPorduct = ref({});

async function cheapProduct() {
  const res = await services.cheapProduct(locale.value);
  cheapPorduct.value = res.data;
  console.log(res);
}

const bodyBanners = ref({});

async function bannersBody() {
  const res = await services.bodyBanners(locale.value);
  console.log(res);
  bodyBanners.value = res.data;
}

const brands = ref({});

async function getBarands() {
  const res = await services.getBrands();
  brands.value = res.data;
  console.log(res);
}
onMounted(() => {
  getBarands();
  bannersBody();
  cheapProduct();
  popularCategory();
  getProductCategory();
  getBanners();
});
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
.popular-cards-wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}

.popular-swiper {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 15px;
}
.popular-slide {
  width: 500px;
}

.popular-cards {
  padding: 70px 0;
  position: relative;
  @media screen and (max-width: 700px) {
    padding: 40px 0;
  }
  @media screen and (max-width: 600px) {
    padding: 30px 0;
  }
  .container {
    position: relative;
  }
}
@media screen and (max-width: 750px) {
  .popular-cat-title {
    font-size: 16px;
  }
}
.popular-nav {
  width: 60px;
  height: 60px;
  font-weight: 400;
  border: 1px solid rgb(0, 123, 255);
  background: transparent;
  cursor: pointer;
  color: rgb(0, 123, 255);
  font-size: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 5;
  right: -10px;
  bottom: 30px;
  @media screen and (max-width: 850px) {
    display: none;
  }
  @media screen and (max-width: 1287px) {
      right: 0;
    }
  &:nth-child(2) {
    bottom: 30px;
    left: -10px;
    rotate: 180deg;
    @media screen and (max-width: 1287px) {
      left: 0;
    }
  }
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
}

.breand__cards-wrapper {
  width: 100%;
}

.brand-swiper {
  width: 100%;
}
</style>