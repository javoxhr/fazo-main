<template>
  <div>
    <UpdateInfo/>
    <servic v-if="store.servic"/>
    <div class="cabinet">
      <div class="container">
        <div class="cabinet__header">
          <nav>
            <ul>
              <li>
                <NuxtLink to="/">{{ t("home") }}</NuxtLink
                ><img src="@/assets/images/svg/chevron-right.svg" alt="" />
              </li>
            </ul>
            <button class="manneger" @click="store.servic = true">{{ t("chatName") }}</button>
          </nav>
          <!-- <div class="cabinet__header__grid-card">
            <button><img src="@/assets/images/grid.svg" alt="" /></button>
            <button><img src="@/assets/images/grid-menu.svg" alt="" /></button>
          </div> -->
        </div>

        <div class="cabinet__wrapper">
          <div class="cabinet__wrapper__left">
            <button to="/" class="exit" @click="clearItem()">
              <span><img src="@/assets/images/svg/exit.svg" alt="" /></span>
              <button>{{ t("exit") }}</button>
            </button>
            <span class="cabinet-left-linie"></span>
          </div>

          <div class="cabinet__wrapper__right">
            <div class="cabinet__wrapper__right__top">
              <div class="cabinet__wrapper__right__top__wrapper">
                <div class="cabinet-profil">
                  <span class="prof-img"
                    ><img src="@/assets/images/svg/man.svg" alt=""
                  /></span>
                  <span>{{ t("personalInformation") }}</span>
                </div>
                <button @click="store.update = !store.update">{{ t("editInfo") }}</button>
              </div>
              <span class="cabinet-right-linia"></span>
              <div class="user-info">
                <h3>
                  {{ store?.userInfo?.firstname }}
                  {{ store?.userInfo?.lastname }}
                </h3>
                <span>+{{ store?.userInfo?.username }}</span>
              </div>
            </div>
            <div class="history-information">
              <div class="history-information__header">
                <div class="history-information__header__left">
                  <span
                    ><img src="@/assets/images/svg/file-text.svg" alt=""
                  /></span>
                  <h3>{{ t("myOrders") }}</h3>
                </div>
                <div class="history-information__header__btns">
                  <button>{{ t("current") }}</button>
                  <button>{{ t("allOrders") }}</button>
                </div>
              </div>

              <span class="linia-history"></span>

              <div class="history-information__cards-wrapper">
                <h1 class="none-history">{{ t("noOrders") }}</h1>
                <orderItems v-for="item in currentProduct" :key="item" :orderItem="item"/>
              </div>
            </div>
          </div>

          <div class="cabinet__wrapper__left left-bottom">
            <div class="exit">
              <span><img src="@/assets/images/svg/exit.svg" alt="" /></span>
              <button>Выйти</button>
            </div>
            <span class="cabinet-left-linie"></span>
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

function clearItem() {
  localStorage.clear();
  window.location.reload(true);
  window.location.href = "/";
}

const currentProduct = ref({})

async function currentProducts() {
  const res = await services.currentProducts(store.token)
  currentProduct.value = res.data
  console.log(res.data)
}

currentProducts()
</script>

<style lang="scss" scoped>
.none-history {
  font-weight: 500;
  font-size: 20px;
  color: #6a6969;
  display: none;
}
.exit {
  border: none;
  background: none;
}
</style>