<template>
  <div>
    <loader v-if="store.loader" />
    <div class="detail">
      <div class="container">
        <div class="detail__images-wrap">
          <Swiper
            v-if="detail?.product?.images?.length"
            :slides-per-view="1"
            class="big-swiper"
          >
            <SwiperSlide
              class="big-swiper-slide"
              v-for="(image, i) in detail.product.images"
              :key="i"
            >
              <div class="detail__images-wrap__big-img big-img">
                <img :src="detail.product.images[index]" alt="Product Image" />
              </div>
            </SwiperSlide>
          </Swiper>
          <div class="detail__images-wrap__mini-images">
            <Swiper
              slides-per-view="4"
              class="swiper-main-mini-images"
              :modules="[SwiperNavigation]"
              :navigation="true"
              :loop="true"
            >
              <SwiperSlide
                class="mini-images"
                v-for="(image, i) in detail?.product?.images"
                :key="i"
              >
                <li @click="index = i">
                  <img
                    class="mini-images-product"
                    :src="image"
                    alt="Mini Image"
                  />
                </li>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        <div class="detail__text-wrapper">
          <h1 class="detail__text-wrapper__title">
            {{ detail?.product?.name }}
          </h1>
          <div class="detail__text-wrapper__price">
            <span>{{ detail?.product?.price }} cум</span>
            <div class="offers__cards-wrapper__card__btns detail__cart-btns">
              <button
                class="detail-cart-btn"
                @click="addToCart(item)"
                :class="{ 'active-cart-detail': checkCart }"
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
                    d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                  />
                </svg>
              </button>
              <span class="card-btns-lin"></span>
              <button @click="createSaved">
                <svg
                  enable-background="new 0 0 128 128"
                  height="25px"
                  version="1.1"
                  viewBox="0 0 128 128"
                  width="25px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M127,44.205c0-18.395-14.913-33.308-33.307-33.308c-12.979,0-24.199,7.441-29.692,18.276  c-5.497-10.835-16.714-18.274-29.694-18.274C15.912,10.898,1,25.81,1,44.205C1,79,56.879,117.104,64.001,117.104  C71.124,117.104,127,79.167,127,44.205z"
                    fill="rgb(107, 105, 105)"
                  />
                </svg>
              </button>
            </div>
          </div>
          <span class="product-quantity">
            {{ t("Instock") }}:
            <span>{{ detail?.product?.residue_store }}</span>
            <span>{{ t("pieces") }}</span>
          </span>
          <NuxtLink v-if="store.token" :to="localePath('/order')">
            <div class="detail__text-wrapper__buy-btn">
              <button @click="buyNow(item)">{{ t("BuyNow") }}</button>
            </div>
          </NuxtLink>

          <NuxtLink @click="store.registerOpen = true" v-if="!store.token">
            <div class="detail__text-wrapper__buy-btn">
              <button @click="buyNow(item)">{{ t("BuyNow") }}</button>
            </div>
          </NuxtLink>
          <div class="detail__text-wrapper__info">
            <span>{{ t("GeneralInformation") }}</span>
            <p>{{ detail?.product?.description }}</p>
          </div>
          <ul
            class="product-info"
            v-for="(info, index) in detail?.characterInfo"
            :key="index"
          >
            <h2 class="product-info-name">{{ info?.groupName }}</h2>
            <li
              class="list-character"
              v-for="(character, charIndex) in info.characters"
              :key="charIndex"
            >
              <h4>{{ character.name }}</h4>
              <h5>{{ character.value }}</h5>
            </li>
          </ul>
        </div>

        <div class="detail__info-cards">
          <div class="detail__info-cards__card">
            <h1>
              <img src="~/assets/images/svg/suporte.svg" alt="Support" />{{
                t("AnyQuestions")
              }}
            </h1>
            <div class="detail__items-wrap">
              <div class="detail__items-wrap__item">
                <span>{{ t("phone") }}:</span>
                <a href="#">+998 99 990 45 27</a>
              </div>
              <div class="detail__items-wrap__item">
                <span>{{ t("telegram") }}:</span>
                <a href="#">@mixel_uz</a>
              </div>
              <div class="detail__items-wrap__item">
                <span>{{ t("gmail") }}:</span>
                <a href="#">mixel@emali.uz</a>
              </div>
            </div>
          </div>

          <div class="detail__deliver-card">
            <h1 class="detail__deliver-card__title">
              <img src="~/assets/images/svg/delivery.svg" alt="Delivery" />{{
                t("delivery")
              }}:
              <span>{{ t("priceDelivery") }}</span>
            </h1>
            <h1 class="detail__deliver-card__info-deliver">
              <img
                src="~/assets/images/svg/wallet.svg"
                alt="Payment Method"
              />{{ t("PaymentMethod") }}:
            </h1>
            <div class="detail__deliver-card__items-wrap">
              <ul>
                <li>{{ t("Cash") }} ({{ t("UponDelivery") }})</li>
                <li>Payme / Click</li>
                <li>{{ t("TransferWithVAT") }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { addToCart } from "~/composables/addToCart";
import { buyNow } from "~/composables/buyNow";
import { useStore } from "~/store/store";
import services from "~/services/services";

const store = useStore();
const route = useRoute();
const localePath = useLocalePath();
const { locale, t } = useI18n();

const index = ref(0);
const detail = ref({});
const item = ref({});

const getDetail = async () => {
  store.loader = true;
  try {
    const res = await services.getDetail(route.params.slug, locale.value);
    detail.value = res.data;
    item.value = {
      title: res?.data?.product?.name,
      price: res?.data?.product?.price,
      quantity: 1,
      image: res?.data?.product?.imageUrl,
      id: res?.data?.product?.id,
    };
  } catch (error) {
    console.error("Error fetching detail:", error);
  } finally {
    store.loader = false;
  }
};

const getSavedProduct = async () => {
  try {
    const res = await services.getSavedProduct(store?.token);
    store.savedProducts = res?.data;
  } catch (error) {
    console.error("Error fetching saved products:", error);
  }
};

const createSaved = async () => {
  try {
    await services.createSaved(
      store?.token,
      detail?.product?.slug,
      locale.value
    );
    await getSavedProduct();
  } catch (error) {
    console.error("Error creating saved product:", error);
  }
};

const checkCart = computed(() => {
  return !!store.cart?.find((el) => el.id == item.value?.id);
});


onMounted(() => {
  getDetail();
  getSavedProduct();
});
</script>

<style lang="scss" scoped>
.mini-images-product {
  width: 80px;
}

.mini-images {
  width: 100px !important;
}

.swiper-main-mini-images {
  width: 400px;
  box-sizing: border-box;
  height: 20%;
  padding: 10px 0;
  @media screen and (max-width: 500px) {
    width: 300px;
  }
}

.big-swiper-slide {
  width: 300px !important;
}

.big-swiper {
  width: 300px;
}

.big-img {
  img {
    width: 250px;
    object-fit: cover;
  }
}
.product-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  h1 {
    font-weight: 500;
    font-size: 25px;
    margin-top: 20px;
  }
}
.detail__text-wrapper {
  width: 100%;
  &__title {
    width: 100%;
  }
}

.detail-cart-btn {
  &:hover {
    svg {
      path {
        fill: rgb(0, 123, 255);
        stroke: rgb(0, 123, 255);
      }
      circle {
        fill: rgb(0, 123, 255);
        stroke: rgb(0, 123, 255);
        transition: all 0.1s ease;
      }
    }
  }
}


.active-cart-detail {
  svg {
    path {
      fill: rgb(0, 123, 255);
      stroke: rgb(0, 123, 255);
    }
    circle {
      fill: rgb(0, 123, 255);
      stroke: rgb(0, 123, 255);
      transition: all 0.1s ease;
    }
  }
}
</style>