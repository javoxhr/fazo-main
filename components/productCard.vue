<template>
  <div>
    <div class="offers__cards-wrapper__card">
      <img class="card-img" :src="product?.imageUrl" alt="" />
      <div class="offers__cards-wrapper__card__price-wrap">
        <span class="before-price"
          >{{ product?.price * (1.2).toFixed() }} Сум</span
        >
        <span class="lin-price"></span>
        <span class="sale-price">{{ product?.price }} Сум</span>
      </div>
      <NuxtLink :to="`/product/${product?.slug}`">
        <h1 class="offers__cards-wrapper__card__title card-title">
          {{ product?.name }}
        </h1>
      </NuxtLink>
      <span class="sale-p">3%</span>
      <span class="btns-linia"></span>
      <div class="offers__cards-wrapper__card__btns">
        <button>
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
        <button>
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
const { product } = defineProps(["product"]);
</script>

<style lang="scss">
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