<template>
  <div>
    <div class="buy">
      <div class="container">
        <div class="buy__left">
          <h1 class="buy__left__title">{{ t("purchase") }}</h1>
          <div class="buy__left__edit">
            <div class="your-deliver">
              <span>1</span>
              <h3>{{ t("YourOrder") }}</h3>
            </div>
            <!-- <button>Изменить</button> -->
          </div>

          <div class="buy__left__products-wrapper">
            <orderProduct
              v-for="item in store.cart"
              :key="item"
              :productOrder="item"
            />
          </div>

          <div class="credit-card">
            <div class="crediat-top">
              <span>2</span>
              <h3>{{ t("SelectPaymentMethod") }}</h3>
            </div>
            <div class="credit-card__cards-wrap">
              <div class="card-radio">
                <input name="price" id="radio1" type="radio" />
                <label for="radio1" class="credit-card__cards-wrap__card">
                  <span class="circle"></span>
                  <h2>Оплата через Payme</h2>
                  <img src="~/assets/images/svg/pay-me.svg" alt="" />
                </label>
              </div>
              <div class="card-radio">
                <input name="price" id="radio2" type="radio" />
                <label for="radio2" class="credit-card__cards-wrap__card">
                  <span class="circle"></span>
                  <h2>Онлайн оплата по карте UZCARD и HUMO</h2>
                  <img src="~/assets/images/svg/wal.svg" alt="" />
                </label>
              </div>
              <div class="card-radio">
                <input name="price" id="radio3" type="radio" />
                <label for="radio3" class="credit-card__cards-wrap__card">
                  <span class="circle"></span>
                  <h2>Оплата через Payme</h2>
                  <img src="~/assets/images/svg/cash.svg" alt="" />
                </label>
              </div>
              <div class="card-radio">
                <input name="price" id="radio4" type="radio" />
                <label for="radio4" class="credit-card__cards-wrap__card">
                  <span class="circle"></span>
                  <h2>Наличными при получении</h2>
                  <img src="~/assets/images/svg/terminal.svg" alt="" />
                </label>
              </div>
              <div class="card-radio">
                <input name="price" id="radio5" type="radio" />
                <label for="radio5" class="credit-card__cards-wrap__card">
                  <span class="circle"></span>
                  <h2>Наличными при получении</h2>
                  <img src="~/assets/images/svg/clock.svg" alt="" />
                </label>
              </div>
            </div>

            <div class="method-of-obtaining">
              <div class="method-of-o-info-wrap">
                <span class="method-of-o-number">3</span>
                <h3>{{ t("MethoDofObtaining") }}</h3>
              </div>
              <div class="method-of-obtaining__wrapper">
                <span>{{ t("YourCity") }}</span>
                <label class="location">
                  <input type="radio" />
                  <h2>Ташкент</h2>
                  <span>Доставка Fazo </span>
                </label>

                <span class="deliver-adress">{{ t("EnterYourDeliveryAddress") }}</span>

                <div class="buy__left__deliver-btns">
                  <div class="deliver-adres-wrap">
                    <div
                      class="deliver-adres"
                      @click="regionShow = !regionShow"
                    >
                      <span>Регион / Область*</span>
                      <img src="./images/order-arrow.svg" alt="" />
                      <button class="region-name">{{ nameRigion }}</button>
                    </div>
                    <ul class="regions-wrap" v-if="regionShow">
                      <li
                        v-for="item in region"
                        :key="item"
                        @click="
                          (regionId = item?.id), (nameRigion = item?.name), regionShow = false
                        "
                      >
                        {{ item?.name }}
                      </li>
                    </ul>
                  </div>
                  <div class="deliver-adres-wrap">
                    <div
                      class="deliver-adres"
                      @click="regionDistShow = !regionDistShow"
                    >
                      <span>Город / Район*</span>
                      <img src="./images/order-arrow.svg" alt="" />
                      <button class="region-name">{{ regionDistName }}</button>
                    </div>
                    <ul class="region-dist-wrap" v-if="regionDistShow">
                      <li
                        v-for="item in regionDist"
                        :key="item"
                        @click="priceDeliverFunc(item?.id), regionDistName = item?.name, regionDistShow = false"
                      >
                        {{ item?.name }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="buy__order-total">
          <h1 class="buy__order-total__title">{{ t("yourData") }}</h1>
          <div class="buy__order-total__wrapper">
            <div class="count-product">
              <span>{{ t("TotalPayable") }} {{ store.cart.length }} {{ t("pieces") }} {{ t("prod") }}</span>
              <h2>{{ allPriceOrder }} cум</h2>
            </div>
            <div class="deliver-free">
              <span>{{ t("delivery") }}</span>
              <h2
                v-if="
                  regionDist.length > 0 &&
                  regionDist.some((item) => priceDeliver[item?.id])
                "
              >
                {{
                  regionDist.find((item) => priceDeliver[item?.id])
                    ?.deliveryPriceFormat
                }}
              </h2>
              
              <h2 v-else>{{ t("priceDelivery") }}</h2>
            </div>
            <span class="order-total-linie"></span>
            <div class="all-paymet">
              <span>{{ t("TotalPayable") }}</span>
              <h2>{{ allPriceOrder }} cум</h2>
            </div>

            <button class="buy__order-total__buy-btn" @click="delivery()">{{ t("purchase") }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import services from "~/services/services";
import { useStore } from "~/store/store";

const store = useStore();

const {locale, locales, t} = useI18n()

const regionShow = ref(false);
const regionDistShow = ref(false);

const allPriceOrder = computed(() => {
  let price = 0;
  store.cart.forEach((el) => {
    price += el.price * el.quantity;
  });
  return price;
});

const priceDeliver = reactive({});

function priceDeliverFunc(itemId) {
  priceDeliver[itemId] = !priceDeliver[itemId];
}

const region = ref([]);

const regionId = ref(1);

const nameRigion = ref("");

async function regions() {
  const res = await services.regions();
  region.value = res?.data || [];
  nameRigion.value = res?.data[0]?.name || "";
  console.log(res);
}

const regionDist = ref([]);

const regionDistName = ref("");

const distRegion = async function () {
  const res = await services.regionDist(regionId.value);
  regionDist.value = res?.data || [];
  regionDistName.value = res?.data[0]?.name || "";
  console.log(res);
};

const pymentType = ref({})

const paymentTypes = async function() {
  const res = await services.paymentTypes()
  pymentType.value = res.data
  console.log(res)
}

async function delivery() {
  const body = {
    'payment_type': 2
  }
  const res = await services.delivery(store.token, locale.value, body)
  console.log(res)
}

onMounted(() => {
  paymentTypes()
  distRegion();
  regions();
});

watch(
  () => regionId.value,
  () => {
    distRegion();
  }
);
</script>


<style lang="scss" scoped>
.region-dist-wrap {
  width: 100%;
  max-width: 335px;
  height: 120px;
  padding: 12px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border: 1px solid #e0e0e0;
  position: absolute;
  li {
    cursor: pointer;
  }
}
.region-name {
  font-weight: 400;
  font-size: 14px;
  padding: 0 30px 0 0;
  border: none;
  background: none;
}
.regions-wrap {
  width: 100%;
  max-width: 335px;
  height: 120px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  padding: 12px;
  gap: 10px;
  position: absolute;
  li {
    cursor: pointer;
  }
}
</style>