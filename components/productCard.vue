<template>
  <div class="card-container">
    <div class="offers__cards-wrapper__card one-card" id="product" @mouseover="hoverAnimation" @mouseleave="resetAnimation">
      <img class="card-img" :src="product?.imageUrl" alt="" />
      <div class="offers__cards-wrapper__card__price-wrap">
        <span class="before-price" v-if="product?.discount"
          >{{ product?.oldPrice }} Сум</span
        >
        <span class="lin-price" v-if="product?.discount"></span>
        <span class="sale-price">{{ product?.price }} Сум</span>
      </div>
      <NuxtLink :to="`${locale}/product/${product.slug}`">
        <h1 class="offers__cards-wrapper__card__title card-title">
          {{ product?.name }}
        </h1>
      </NuxtLink>
      <span class="sale-p" v-if="product?.discount" style="color: #fff">{{ product?.discount.toFixed() }}%</span>
      <span class="btns-linia"></span>
      <div class="offers__cards-wrapper__card__btns">
        <button
          class="cart-svg"
          :class="{ 'active-cart-svg': checkSaved }"
          @click="addToCart(item)"
        >
          <svg
            class="feather feather-shopping-cart"
            fill="none"
            height="24px"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="9" cy="21" r="1" fill="#BDBDBD" stroke="#BDBDBD" />
            <circle cx="20" cy="21" r="1" fill="#BDBDBD" stroke="#BDBDBD" />
            <path
              stroke="#BDBDBD"
              d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2
                            2 0 0 0 2-1.61L23 6H6"
            />
          </svg>
        </button>
        <span class="card-btns-lin"></span>
        <button @click="createSaved()" v-if="store.token" :class="{'active-like': checkLike}">
          <svg
            enable-background="new 0 0 128 128"
            height="25px"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 128 128"
            width="25px"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M127,44.205c0-18.395-14.913-33.308-33.307-33.308c-12.979,0-24.199,7.441-29.692,18.276  c-5.497-10.835-16.714-18.274-29.694-18.274C15.912,10.898,1,25.81,1,44.205C1,79,56.879,117.104,64.001,117.104  C71.124,117.104,127,79.167,127,44.205z"
              fill="rgb(107, 105, 105)"
            />
          </svg>
        </button>

        <button @click="store.registerOpen = true" v-if="!store.token"  :class="{'active-like': checkLike}">
          <svg
            enable-background="new 0 0 128 128"
            height="25px"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 128 128"
            width="25px"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M127,44.205c0-18.395-14.913-33.308-33.307-33.308c-12.979,0-24.199,7.441-29.692,18.276  c-5.497-10.835-16.714-18.274-29.694-18.274C15.912,10.898,1,25.81,1,44.205C1,79,56.879,117.104,64.001,117.104  C71.124,117.104,127,79.167,127,44.205z"
              fill="rgb(107, 105, 105)"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import services from "~/services/services";
import { useStore } from "~/store/store";
import { addToCart } from "~/composables/addToCart";
import { gsap } from 'gsap';
const { product } = defineProps(["product"]);

const store = useStore();

const {locale, locales, t} = useI18n()

const hoverAnimation = (event) => {
  gsap.to(event.currentTarget, {
    scale: 1.1,
    duration: 0.2,
    ease: "power1.out",
  });
};

const resetAnimation = (event) => {
  gsap.to(event.currentTarget, {
    scale: 1,
    duration: 0.5,
    ease: "power1.out",
  });
};


const item = computed(() => {
  const item = {
    image: product?.imageUrl,
    title: product?.name,
    price: product?.price,
    quantity: 1,
    limit: product?.residue_store,
    id: product?.id,
  };
  return item;
});

const checkSaved = computed(() => {
  const item = store.cart?.find((el) => el.id == product.id);
  if (item) {
    return true;
  } else {
    return false;
  }
});

const checkLike = computed(() => {
  const item = store.savedProducts?.items?.find((el) => el.id == product.id);
  if (item) {
    return true;
  } else {
    return false;
  }
});

async function getSavedProduct() {
  const res = await services.getSavedProduct(store?.token);
  store.savedProducts = res?.data;
}
const createSaved = async () => {
  const res = await services.createSaved(store?.token, product?.slug, locale.value);
  getSavedProduct();
};
</script>

<style lang="scss">
.card-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-img {
  width: 140px;
  height: 160px;
  object-fit: contain;
}
.card-title {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  margin-top: 15px;
  &:hover {
    color: rgb(0, 123, 255);
  }
}

@media screen and (max-width: 650px) {
  .card-img {
    width: 120px;
    height: 140px;
  }
  .card-title {
    margin-top: 0;
  }
}
</style>