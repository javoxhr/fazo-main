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
                <input
                  @change="radioChange = pymentType[1]?.id"
                  name="price"
                  id="radio1"
                  type="radio"
                />
                <label for="radio1" class="credit-card__cards-wrap__card">
                  <div class="crs-wrp">
                    <span class="circle"></span>
                    <h2>Оплата через Payme</h2>
                  </div>
                  <img src="~/assets/images/svg/pay-me.svg" alt="" />
                </label>
              </div>
              <div class="card-radio">
                <input
                  @change="radioChange = pymentType[0]?.id"
                  name="price"
                  id="radio2"
                  type="radio"
                />
                <label for="radio2" class="credit-card__cards-wrap__card">
                  <div class="crs-wrp">
                    <span class="circle"></span>
                    <h2>Онлайн оплата по карте UZCARD и HUMO</h2>
                  </div>
                  <img src="~/assets/images/svg/wal.svg" alt="" />
                </label>
              </div>
              <div class="card-radio">
                <input
                  @change="radioChange = pymentType[2]?.id"
                  name="price"
                  id="radio3"
                  type="radio"
                />
                <label for="radio3" class="credit-card__cards-wrap__card">
                  <div class="crs-wrp">
                    <span class="circle"></span>
                    <h2>Оплата через Payme</h2>
                  </div>
                  <img src="~/assets/images/svg/cash.svg" alt="" />
                </label>
              </div>
              <div class="card-radio">
                <input
                  @change="radioChange = pymentType[3]?.id"
                  name="price"
                  id="radio4"
                  type="radio"
                />
                <label for="radio4" class="credit-card__cards-wrap__card">
                  <div class="crs-wrp">
                    <span class="circle"></span>
                    <h2>Наличными при получении</h2>
                  </div>
                  <img src="~/assets/images/svg/terminal.svg" alt="" />
                </label>
              </div>
              <div class="card-radio">
                <input
                  @change="radioChange = pymentType[4]?.id"
                  name="price"
                  id="radio5"
                  type="radio"
                />
                <label for="radio5" class="credit-card__cards-wrap__card">
                  <div class="crs-wrp">
                    <span class="circle"></span>
                    <h2>Наличными при получении</h2>
                  </div>
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

                <div class="dlv-wrp">
                  <div class="dlv-lb-wrp">
                    <input
                      id="check1"
                      name="d-radio"
                      type="radio"
                      @change="(deliveryRegion = true), (delivToHome = false)"
                    />
                    <label for="check1" class="location">
                      <span class="delivery-inf-spn"></span>
                      <h2>Yetkazib Berish</h2>
                    </label>
                  </div>

                  <div class="dlv-lb-wrp">
                    <input
                      id="check2"
                      name="d-radio"
                      type="radio"
                      @change="(delivToHome = true), (deliveryRegion = false)"
                    />
                    <label for="check2" class="location">
                      <span class="delivery-inf-spn"></span>
                      <h2>Do'kondan olib ketish</h2>
                    </label>
                  </div>
                </div>

                <span v-if="deliveryRegion" class="deliver-adress">{{
                  t("EnterYourDeliveryAddress")
                }}</span>

                <div class="buy__left__deliver-btns" v-if="deliveryRegion">
                  <div class="deliver-adres-wrap">
                    <div
                      class="deliver-adres"
                      @click="regionShow = !regionShow"
                    >
                      <span>{{ t("region") }} / {{ t("area") }}*</span>
                      <img src="./images/order-arrow.svg" alt="" />
                      <button class="region-name">{{ nameRigion }}</button>
                    </div>
                    <ul class="regions-wrap" v-if="regionShow">
                      <li
                        v-for="item in region"
                        :key="item"
                        @click="
                          (regionId = item?.id),
                            (nameRigion = item?.name),
                            (regionShow = false)
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
                      <span>{{ t("citiy") }} / {{ t("district") }}*</span>
                      <img src="./images/order-arrow.svg" alt="" />
                      <button class="region-name">{{ regionDistName }}</button>
                    </div>
                    <ul class="region-dist-wrap" v-if="regionDistShow">
                      <li
                        v-for="item in regionDist"
                        :key="item"
                        @click="
                          priceDeliverFunc(item?.id),
                            (regionDistName = item?.name),
                            (regionDistShow = false)
                        "
                      >
                        {{ item?.name }}
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="delivery-to-home" v-if="delivToHome">
                  <div
                    class="delivery-to-home-card"
                    v-for="item in deliverToHome?.data"
                    :key="item"
                  >
                    <h2>{{ item?.regionName }}</h2>
                    <span class="work-adres">{{ item?.address }}</span>
                    <div class="span-and-btn-wrap">
                      <span>{{ item?.work_time }}</span>
                      <button>Men shu joydan olaman</button>
                    </div>
                  </div>
                </div>
                <div class="delivery-home">
                  <input type="checkbox" @change="checkBox = !checkBox" />
                  <span>Uygacha yetkazib berish</span>
                </div>

                <div class="deliver-home-from" v-if="checkBox">
                  <div class="delivery-input-wrap">
                    <span>Manzil</span>
                    <input type="text" v-model="adress" />
                  </div>
                  <div class="delivery-input-wrap">
                    <span>Qavat</span>
                    <input type="text" v-model="floor" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="buy__order-total" id="total-box">
          <h1 class="buy__order-total__title">{{ t("yourData") }}</h1>
          <div class="buy__order-total__wrapper">
            <div class="count-product">
              <span
                >{{ t("TotalPayable") }} {{ store.cart.length }}
                {{ t("pieces") }} {{ t("prod") }}</span
              >
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
              <h2>
                {{ allPriceOrder }}
                cум
              </h2>
            </div>

            <button v-if="store.purchease" class="buy__order-total__buy-btn" @click="delivery(), store.loadingBtn = true, store.purchease = false">
              {{ t("purchase") }}
            </button>
            <button class="buy__order-total__buy-btn delay" v-if="store.loadingBtn"><span class="loaderrr"></span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
import services from "~/services/services";
import { useStore } from "~/store/store";

const store = useStore();

const taost = useToast()

const radioChange = ref();

const checkBox = ref(false);

const delivToHome = ref(false);
const deliveryRegion = ref(false);

const handleScroll = () => {
  const totalBox = document.querySelector("#total-box");
  if (window.scrollY >= 249) {
    totalBox.classList.add("box-pos");
  } else {
    totalBox.classList.remove("box-pos");
  }
  if (window.scrollY >= 1290) {
    totalBox.classList.add("box-sub-pos");
    totalBox.classList.remove("box-pos");
  } else {
    totalBox.classList.remove("box-sub-pos");
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const { locale, locales, t } = useI18n();

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

const getRegionId = ref();

function priceDeliverFunc(itemId) {
  priceDeliver[itemId] = !priceDeliver[itemId];
  getRegionId.value = itemId;
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

const deliveryPrice = ref({});

const distRegion = async function () {
  const res = await services.regionDist(regionId.value);
  regionDist.value = res?.data || [];
  regionDistName.value = res?.data[0]?.name || "";
  console.log(res);
};

const pymentType = ref({});

const paymentTypes = async function () {
  const res = await services.paymentTypes();
  pymentType.value = res.data;
  console.log(res);
};

const adress = ref("");

const floor = ref("");

const date = Date();

function urlFunc(url) {
  window.location.href = url
}

async function delivery() {
  const products = store.cart.map((el) => {
    const obj = {
      product_id: el.id,
      count: el.quantity,
    };
    return obj;
  });
  console.log(products);
  
  const body = {
    payment_type: radioChange.value,
    region_id: regionId.value,
    district_id: getRegionId.value,
    is_delivery_home: checkBox.value ? 1 : "",
    address: adress.value,
    floor: floor.value,
    delivery_date: date,
    home_delivery_sum: 25000,
    products: products
  };
  const res = await services.delivery(store.token, locale.value, body);
  if(res.status == 200) {
    if(res?.data?.url) {
      urlFunc(res?.data?.url)
    } else {
      urlFunc('/')
      store.deliveryNotif = true
    }
  }
  console.log(res);
}

const deliverToHome = ref({});

const deliveryToHome = async function () {
  const res = await services.deliveryToHome(store.token);
  deliverToHome.value = res;
  console.log(res);
};

onMounted(() => {
  deliveryToHome();
  paymentTypes();
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
.dlv-wrp {
  display: flex;
  align-items: center;
  gap: 20px;
}
.delay {
  padding: 7px !important;
}
.box-pos {
  width: 100%;
  max-width: 480px;
  position: fixed;
  top: 0;
  right: 60px;
  @media screen and (max-width: 1287px) {
    width: 100%;
    max-width: 100%;
    position: initial;
    right: 0;
  }
}
.box-sub-pos {
  position: absolute;
  top: 1280px;
  right: 60px;
  @media screen and (max-width: 1287px) {
    position: initial;
    top: 0;
    right: 0;
  }
}
.loaderrr {
    width: 20px;
    height: 20px;
    border: 3px solid #fff;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
.region-dist-wrap {
  width: 300px;
  height: 120px;
  padding: 12px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border: 1px solid #e0e0e0;
  background: #fff;
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
  width: 300px;
  height: 120px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  padding: 12px;
  gap: 10px;
  position: absolute;
  z-index: 1;
  background: #fff;
  li {
    cursor: pointer;
  }
}
</style>