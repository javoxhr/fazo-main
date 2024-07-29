<template>
  <div>
    <loader v-if="store.loader"/>
    <div class="detail">
      <div class="container">
        <div class="detail__images-wrap">
          <div class="detail__imgaes-wrap__big-img big-img">
            <img :src="detail?.product?.imageUrl" alt="" />
          </div>
          <div class="detail__images-wrap__mini-images">
            <li v-for="item in detail?.product?.images" :key="item">
                <img class="mini-images-product" :src="item" alt="" />
            </li>
          </div>
        </div>

        <div class="detail__text-wrapper">
          <h1 class="detail__text-wrapper__title">
            {{ detail?.product?.name }}
          </h1>
          <div class="detail__text-wrapper__price">
            <span>{{detail?.product?.price}} cум</span>
            <div class="offers__cards-wrapper__card__btns detail__cart-btns">
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
                  <circle
                    cx="9"
                    cy="21"
                    r="1"
                    fill="#BDBDBD"
                    stroke="#BDBDBD"
                  />
                  <circle
                    cx="20"
                    cy="21"
                    r="1"
                    fill="#BDBDBD"
                    stroke="#BDBDBD"
                  />
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
          <div class="detail__text-wrapper__buy-btn">
            <button>Купить сейчас</button>
          </div>
          <div class="detail__text-wrapper__info">
            <span>Общая Информация</span>
            <p>
                {{ detail?.product?.description }}
            </p>
          </div>
          <div class="product-info" v-for="item in detail?.characterInfo" :key="item">
            <h1>{{ item?.groupName == 'Asosiy xarakteristikalar' ? item?.groupName : ''}}</h1>
          </div>
        </div>

        <div class="detail__info-cards">
          <div class="detail__info-cards__card">
            <h1><img src="./images/suporte.svg" alt="" />Есть вопросы?</h1>
            <div class="detail__items-wrap">
              <div class="detail__items-wrap__item">
                <span>Телефон:</span>
                <a href="#">+998 99 990 45 27</a>
              </div>

              <div class="detail__items-wrap__item">
                <span>Телеграм:</span>
                <a href="#">@mixel_uz</a>
              </div>

              <div class="detail__items-wrap__item">
                <span>Эл. почта:</span>
                <a href="#">mixel@emali.uz</a>
              </div>
            </div>
          </div>

          <div class="detail__deliver-card">
            <h1 class="detail__deliver-card__title">
              <img src="./images/delivery.svg" alt="" />Доставка:
              <span>Бесплатно</span>
            </h1>

            <h1 class="detail__deliver-card__info-deliver">
              <img src="./images/wallet.svg" alt="" />Cпособ оплаты:
            </h1>

            <div class="detail__deliver-card__items-wrap">
              <ul>
                <li>Наличными (При Доставке)</li>
                <li>Payme / Click</li>
                <li>Перечислением с НДС</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/store/store";
 import services from "~/services/services";
 const store = useStore()
 const route = useRoute()

 const detail = ref([])

 async function getDetail() {
    store.loader = true
    const res = await services.getDetail(route.params.slug)
    detail.value = res.data
    console.log(res)
    store.loader = false
 }
 getDetail()
</script>

<style lang="scss" scoped>
.mini-images-product {
    width: 80px;
}
.big-img {
  img {
    width: 250px;
    object-fit: cover;
  }
}
.product-info {
  h1 {
    font-weight: 500;
    font-size: 25px;
    margin-top: 20px;
  }
}
</style>