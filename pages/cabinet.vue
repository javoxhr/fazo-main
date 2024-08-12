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
                <NuxtLink to="/">Главная</NuxtLink
                ><img src="./images/chevron-right.svg" alt="" />
              </li>
              <li><a href="#">Личный кобинет</a></li>
            </ul>
            <button class="manneger" @click="store.servic = true">Техподдержка</button>
          </nav>
          <div class="cabinet__header__grid-card">
            <button><img src="./images/grid.svg" alt="" /></button>
            <button><img src="./images/grid-menu.svg" alt="" /></button>
          </div>
        </div>

        <div class="cabinet__wrapper">
          <div class="cabinet__wrapper__left">
            <button to="/" class="exit" @click="clearItem()">
              <span><img src="@/assets/images/svg/exit.svg" alt="" /></span>
              <button>Выйти</button>
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
                  <span>Личные данные</span>
                </div>
                <button @click="store.update = !store.update">Изменит</button>
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
                  <h3>Мои Заказы</h3>
                </div>
                <div class="history-information__header__btns">
                  <button>Текущий</button>
                  <button>Все</button>
                </div>
              </div>

              <span class="linia-history"></span>

              <div class="history-information__cards-wrapper">
                <h1 class="none-history">У вас заказы нет пока что</h1>
              </div>
            </div>
          </div>

          <div class="cabinet__wrapper__left left-bottom">
            <div class="exit">
              <span><img src="./images/exit.svg" alt="" /></span>
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
import { useStore } from "~/store/store";

const store = useStore();

function clearItem() {
  localStorage.clear();
  window.location.reload(true);
  window.location.href = "/";
}
</script>

<style lang="scss" scoped>
.none-history {
  font-weight: 500;
  font-size: 20px;
  color: #6a6969;
}
.exit {
  border: none;
  background: none;
}
</style>