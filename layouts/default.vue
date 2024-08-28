<template>
  <div class="default">
    <loader v-if="store.loader" />
    <servic v-if="store.servic" />
    <button class="mesage-btn">
      <img
        src="~/assets/images/png/mesage-icon.png"
        alt=""
        @click="store.servic = !store.servic"
      /><span>0</span>
    </button>
    <header>
      <div class="header-top">
        <div class="container">
          <nav class="header-top__list">
            <ul class="header-top-list">
              <li v-for="item in pageCategoryInfo" :key="item" :itemId="item">
                <NuxtLink :to="`/delivery/${item?.id}`">{{
                  item?.name
                }}</NuxtLink>
              </li>
            </ul>
          </nav>

          <div class="lang-and-contact">
            <div class="header-top__contact">
              <span>+998 95 123 55 88</span>
            </div>

            <div class="header-top__lang">
              <div class="lang-open-wrapper" @click="langShow = !langShow">
                <button>{{ locale }}</button>
                <img
                  class="lang-strel"
                  :class="{ 'lang-strel-active': langShow == true }"
                  src="~/assets/images/svg/Arrow-header (2).svg"
                  alt=""
                />
              </div>
              <div class="list-lang" v-if="langShow">
                <NuxtLink
                  @click="langShow = false"
                  class="list-lang-btn"
                  v-for="{ code, name } in locales"
                  :to="swithcLocalePath(code)"
                  :key="code"
                  >{{ name }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="menu-header">
        <div class="container">
          <NuxtLink to="/" class="menu-header__logo"
            ><img src="~/assets/images/svg/loco.svg" alt="" />
          </NuxtLink>
          <div class="menu-header__contact">
            <button>
              <img src="~/assets/images/png/tel-phone.png" alt="" />
            </button>
            <button>
              <img src="~/assets/images/png/gay-map.png" alt="" />Ташкент
            </button>
          </div>
        </div>
      </div>

      <div class="header-bottom">
        <div
          class="search-list"
          v-if="
            searchVal?.length && searchList?.items?.length > 1 ? true : false
          "
        >
          <div class="container">
            <div class="search-list__wrapper">
              <div
                class="search-list-item"
                v-for="item in searchList?.items"
                :key="item"
              >
                <img :src="item?.imageUrl" alt="" />
                <NuxtLink
                  @click="searchVal = ''"
                  :to="`/product/${item?.slug}`"
                >
                  <h2>{{ item?.name }}</h2>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="logo">
            <NuxtLink :to="localePath('/')" @click="store.txtWrp = false"
              ><img src="~/assets/images/svg/loco.svg" alt=""
            /></NuxtLink>
          </div>

          <button class="header-bottom__menu-btn" @click="openMenu = 0">
            <img src="~/assets/images/svg/Menu (2).svg" alt="" />
          </button>

          <div class="header-bottom__search">
            <div class="header-search-wrapper">
              <div class="header-bottom__search__category">
                <button>
                  Все категории
                  <img src="~/assets/images/svg/gray-arrow.svg" alt="" />
                </button>
                <span>|</span>
              </div>

              <div class="header-bottom__search__input">
                <form>
                  <input
                    type="text"
                    @input="searchProduct()"
                    v-model="searchVal"
                    :placeholder="t('mainInputPlaceHolder')"
                  />
                  <button type="submit">
                    <img src="~/assets/images/svg/mic.svg" alt="" />
                  </button>
                </form>
              </div>
            </div>

            <div class="header-bottom__search__btn">
              <button>
                <img src="~/assets/images/svg/search.svg" alt="" />
                <h4 class="search-btn-text">{{ t("buttonHeader") }}</h4>
              </button>
            </div>
          </div>

          <div class="header-bottom__items">
            <NuxtLink
              v-if="store.token"
              :to="localePath('/cabinet')"
              class="header-bottom__items__item"
              @click="
                store.userInfo.firstname
                  ? (store.registerOpen = false)
                  : (store.registerOpen = !store.registerOpen)
              "
            >
              <img src="~/assets/images/svg/man.svg" alt="" />
              <span>{{ store?.userInfo?.firstname }} </span>
            </NuxtLink>

            <button
              @click="store.registerOpen = true"
              style="border: none; background: none"
              v-if="!store.token"
              class="header-bottom__items__item"
            >
              <img src="~/assets/images/svg/man.svg" alt="" />
              <span>{{ t("Login") }}</span>
            </button>

            <NuxtLink
              to="/saved"
              v-if="store.token"
              class="header-bottom__items__item"
            >
              <span
                class="saved-count"
                v-if="store.savedProducts?.items?.length"
                >{{ store.savedProducts?.items?.length }}</span
              >
              <img src="~/assets/images/svg/like.svg" alt="" />
              <span>{{ t("Saved") }}</span>
            </NuxtLink>

            <button
              v-if="!store.token"
              @click="store.registerOpen = !store.registerOpen"
              style="border: none; background: none"
              class="header-bottom__items__item"
            >
              <span
                class="saved-count"
                v-if="store.savedProducts?.items?.length"
                >{{ store.savedProducts?.items?.length }}</span
              >
              <img src="~/assets/images/svg/like.svg" alt="" />
              <span>{{ t("Saved") }}</span>
            </button>

            <div
              class="header-bottom__items__item"
              @click="store.showCart = !store.showCart"
            >
              <img src="~/assets/images/svg/shopping-cart.svg" alt="" />
              <span class="product-count" v-if="store.cart.length">{{
                productQuantity
              }}</span>
              <span>{{ t("Cart") }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="header-category">
        <div class="container">
          <div class="header-category__main-btn">
            <button
              @click="(categoryInst = false), (openCategory = !openCategory)"
            >
              <img src="~/assets/images/svg/category-btn.svg" alt="" />{{
                t("buttonCategory")
              }}
            </button>
          </div>

          <nav class="header-category__list">
            <ul>
              <li v-for="list in headerCategorys" :key="list">
                <NuxtLink
                  @click="store.txtWrp = false"
                  :to="localePath(`/categorys/${list.slug}`)"
                  >{{ list?.name }}</NuxtLink
                >
              </li>
            </ul>
          </nav>
        </div>

        <div class="category-overlay"></div>

        <div class="open-category" v-if="openCategory">
          <div class="open-category-header">
            <div class="container">
              <h2>Category</h2>
              <button @click="openCategory = false">
                <img src="~/assets/images/svg/x.svg" alt="" />
              </button>
            </div>
          </div>
          <div class="container">
            <div class="open-category__wrapper">
              <div class="open-category__left">
                <div
                  class="open-category__left__item"
                  v-for="item in headerCategorys"
                  :key="item"
                  @click="topCtaegoryItemTop(item?.id), (categoryInst = true)"
                >
                  <button>
                    <img width="45px" :src="item?.iconUrl" alt="" />
                    {{ item?.name }}
                  </button>
                  <img src="~/assets/images/png/category-arrow.png" alt="" />
                </div>
              </div>

              <div class="open-category-cet" v-if="categoryInst">
                <div
                  class="cet-items-wrapper"
                  v-for="item in headerCategorysInsaydes"
                  :key="item"
                >
                  <div
                    class="categor-slug-wrap"
                    :style="{
                      display: categoryClose == item.id ? 'flex' : 'none',
                    }"
                  >
                    <div
                      class="media-category-wrap-header"
                      @click="categoryClose = false"
                    >
                      <button>
                        <svg
                          style="display: flex"
                          height="28"
                          viewBox="0 0 48 48"
                          width="28"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M30.83 32.67l-9.17-9.17 9.17-9.17-2.83-2.83-12 12 12 12z"
                          />
                          <path d="M0-.5h48v48h-48z" fill="none" />
                        </svg>
                      </button>
                      <span>Ortga qaytish</span>
                    </div>
                    <NuxtLink
                      @click="openCategory = false"
                      style="color: #000"
                      :to="`/categorys/${item?.slug}`"
                      class="categor-name"
                      >{{ item?.name }}</NuxtLink
                    >
                    <NuxtLink
                      class="categor-slug"
                      :to="`/katalog/${sl?.slug}`"
                      v-for="sl in item?.categories"
                      :key="sl?.id"
                      @click="openCategory = false"
                    >
                      {{ sl?.name }}</NuxtLink
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="menu-overlay"
        :style="{ display: openMenu == 0 ? 'block' : 'none' }"
      ></div>

      <div class="menu" :style="{ left: openMenu }">
        <div class="menu__header">
          <a href="#"><img src="~/assets/images/svg/logo-menu.svg" alt="" /></a>
          <button>
            <img
              src="~/assets/images/svg/x.svg"
              alt=""
              id="menu-close"
              @click="openMenu = -100 + '%'"
            />
          </button>
        </div>

        <div class="menu__register">
          <button v-if="!store.token" @click="store.registerOpen = true">
            <span><img src="~/assets/images/svg/man.svg" alt="" /></span>Войти
          </button>
          <button v-if="store.token">
            <span><img src="~/assets/images/svg/man.svg" alt="" /></span
            ><NuxtLink style="color: #000" to="/cabinet">{{
              store?.userInfo?.firstname
            }}</NuxtLink>
          </button>
          <button></button>
          <span></span>
          <button @click="store.enterPhone = true" v-if="!store.token">
            Регистрация
          </button>
          <button @click="exitFunc()" v-if="store.token">
            {{ t("exit") }}
          </button>
        </div>

        <div class="menu__info">
          <NuxtLink
            @click="openMenu = -100 + '%'"
            v-for="item in pageCategoryInfo"
            :key="item"
            :to="`/delivery/${item?.id}`"
            >{{ item?.name }}</NuxtLink
          >
        </div>

        <div class="menu__lang">
          <NuxtLink
            @click="openMenu = -100 + '%'"
            v-for="{ code, name } in locales"
            :key="code"
            :to="swithcLocalePath(code)"
          >
            <button>{{ name }}</button>
          </NuxtLink>
        </div>
      </div>

      <div class="menu-bottom">
        <div class="container">
          <NuxtLink :to="localePath('/')" class="bottom-item">
            <img src="~/assets/images/svg/bottom-menu-home.svg" alt="" />
            <span>home</span>
          </NuxtLink>

          <NuxtLink
            class="bottom-item"
            @click="store.showCart = !store.showCart"
          >
            <img src="~/assets/images/svg/menu-bottom-cart.svg" alt="" />
            <span class="bt-item-saved-tot-cart">{{ productQuantity }}</span>
            <span>{{ t("Cart") }}</span>
          </NuxtLink>

          <NuxtLink class="bottom-item" @click="openCategory = !openCategory">
            <img src="~/assets/images/svg/menu-menu.svg" alt="" />
            <span>categories</span>
          </NuxtLink>

          <NuxtLink
            :to="localePath('/cabinet')"
            class="bottom-item"
            v-if="store.token"
          >
            <img src="~/assets/images/svg/user.svg" alt="" />
            <span>{{ store?.userInfo?.firstname }}</span>
          </NuxtLink>

          <NuxtLink
            class="bottom-item"
            @click="store.registerOpen = !store.registerOpen"
            v-if="!store.token"
          >
            <img src="~/assets/images/svg/user.svg" alt="" />
            <span>{{ t("Login") }}</span>
          </NuxtLink>

          <NuxtLink
            :to="localePath('/saved')"
            class="bottom-item"
            v-if="store.token"
          >
            <img
              src="~/assets/images/svg/8542029_heart_love_like_icon.svg"
              alt=""
            />
            <span>saved</span>
            <span class="bt-item-saved-tot">{{
              store.savedProducts?.items?.length
            }}</span>
          </NuxtLink>
          <NuxtLink
            class="bottom-item"
            @click="store.registerOpen = !store.registerOpen"
            v-if="!store?.token"
          >
            <img
              src="~/assets/images/svg/8542029_heart_love_like_icon.svg"
              alt=""
            />
            <span>saved</span>
          </NuxtLink>
        </div>
      </div>
    </header>
    <register v-if="store.registerOpen" />
    <register-2 />
    <register-3 />
    <resetPassword />
    <CodeRegister :length="4" />
    <resetVerifyCode :lengthRes="4" />
    <NuxtPage />
    <cart />
    <div class="footer">
      <div class="container">
        <div class="footer__left">
          <div class="footer__logo">
            <a href="./index.html"
              ><img src="~/assets/images/svg/footer-logo.svg" alt=""
            /></a>
          </div>
          <div class="col-center">
            <p>{{ callCenterInfo?.call_center_working_house }}</p>
          </div>
          <div class="col-center-number">
            <p>
              {{ t("CallCenter") }}:
              <span>{{ callCenterInfo?.call_center_phone }}</span>
            </p>
          </div>

          <div class="footer__icons men-none">
            <a href="#" class="footer__icons__icon">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="red"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_11761_4772)">
                  <path
                    d="M5.27723 8.42284L5.05924 11.4945C5.37113 11.4945 5.50621 11.3603 5.6682 11.1991L7.13047 9.79917L10.1604 12.0221C10.7161 12.3323 11.1076 12.169 11.2576 11.5099L13.2464 2.17381L13.247 2.17326C13.4232 1.35033 12.9499 1.02852 12.4085 1.23041L0.718003 5.7142C-0.0798483 6.02445 -0.0677679 6.47002 0.582374 6.6719L3.57116 7.60321L10.5135 3.25144C10.8402 3.0347 11.1373 3.15462 10.8929 3.37136L5.27723 8.42284Z"
                    fill="#8F8E94"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_11761_4772">
                    <rect
                      width="13.1786"
                      height="13.2022"
                      fill="#8F8E94"
                      transform="translate(0.106201 0.0717773)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>

            <a href="#" class="footer__icons__icon">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_11761_4776)">
                  <path
                    d="M9.5461 0.0717773H4.60414C2.33001 0.0717773 0.48584 1.88396 0.48584 4.11864V8.97486C0.48584 11.2095 2.33001 13.0217 4.60414 13.0217H9.5461C11.8202 13.0217 13.6644 11.2095 13.6644 8.97486V4.11864C13.6644 1.88396 11.8202 0.0717773 9.5461 0.0717773ZM12.4289 8.97486C12.4289 10.537 11.1358 11.8077 9.5461 11.8077H4.60414C3.01447 11.8077 1.72133 10.537 1.72133 8.97486V4.11864C1.72133 2.55655 3.01447 1.28583 4.60414 1.28583H9.5461C11.1358 1.28583 12.4289 2.55655 12.4289 4.11864V8.97486Z"
                    fill="#8F8E94"
                  />
                  <path
                    d="M7.07491 3.30908C5.25545 3.30908 3.78027 4.75867 3.78027 6.54657C3.78027 8.33447 5.25545 9.78406 7.07491 9.78406C8.89438 9.78406 10.3696 8.33447 10.3696 6.54657C10.3696 4.75867 8.89438 3.30908 7.07491 3.30908ZM7.07491 8.57C5.93991 8.57 5.01576 7.66188 5.01576 6.54657C5.01576 5.43045 5.93991 4.52314 7.07491 4.52314C8.20991 4.52314 9.13406 5.43045 9.13406 6.54657C9.13406 7.66188 8.20991 8.57 7.07491 8.57Z"
                    fill="#8F8E94"
                  />
                  <path
                    d="M10.6167 3.49804C10.8592 3.49804 11.0558 3.3049 11.0558 3.06665C11.0558 2.8284 10.8592 2.63525 10.6167 2.63525C10.3743 2.63525 10.1777 2.8284 10.1777 3.06665C10.1777 3.3049 10.3743 3.49804 10.6167 3.49804Z"
                    fill="#8F8E94"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_11761_4776">
                    <rect
                      width="13.1786"
                      height="12.9499"
                      fill="white"
                      transform="translate(0.48584 0.0717773)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>

            <a href="#" class="footer__icons__icon">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_11761_4791)">
                  <path
                    d="M10.3134 0.0745243L8.60446 0.0717773C6.68452 0.0717773 5.44377 1.34704 5.44377 3.32085V4.81889H3.7255C3.57702 4.81889 3.45679 4.93948 3.45679 5.08823V7.25872C3.45679 7.40746 3.57716 7.52791 3.7255 7.52791H5.44377V13.0047C5.44377 13.1535 5.56401 13.2739 5.71249 13.2739H7.95434C8.10282 13.2739 8.22305 13.1534 8.22305 13.0047V7.52791H10.2321C10.3806 7.52791 10.5008 7.40746 10.5008 7.25872L10.5016 5.08823C10.5016 5.01681 10.4733 4.94841 10.423 4.89786C10.3726 4.84732 10.3041 4.81889 10.2328 4.81889H8.22305V3.54898C8.22305 2.93861 8.36824 2.62876 9.16191 2.62876L10.3131 2.62835C10.4615 2.62835 10.5817 2.50776 10.5817 2.35915V0.343724C10.5817 0.195252 10.4616 0.074799 10.3134 0.0745243Z"
                    fill="#8F8E94"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_11761_4791">
                    <rect
                      width="13.1786"
                      height="13.2022"
                      fill="white"
                      transform="translate(0.429932 0.0717773)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>

            <a href="#" class="footer__icons__icon">
              <svg
                width="14"
                height="13"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_11761_4788)">
                  <path
                    d="M13.1357 3.48707C12.9943 2.97069 12.58 2.56363 12.0546 2.42458C11.0947 2.1665 7.2551 2.1665 7.2551 2.1665C7.2551 2.1665 3.41565 2.1665 2.45577 2.4148C1.94045 2.5537 1.51603 2.97076 1.37467 3.48707C1.12207 4.43023 1.12207 6.38621 1.12207 6.38621C1.12207 6.38621 1.12207 8.35205 1.37467 9.28535C1.51617 9.80166 1.93034 10.2087 2.45584 10.3478C3.42576 10.6059 7.25525 10.6059 7.25525 10.6059C7.25525 10.6059 11.0947 10.6059 12.0546 10.3576C12.5801 10.2186 12.9943 9.81159 13.1358 9.29528C13.3883 8.35205 13.3883 6.39614 13.3883 6.39614C13.3883 6.39614 13.3985 4.43023 13.1357 3.48707ZM6.03265 8.19321V4.5792L9.22547 6.38621L6.03265 8.19321Z"
                    fill="#8F8E94"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_11761_4788">
                    <rect
                      width="13.0841"
                      height="12.8571"
                      fill="white"
                      transform="translate(0.719727 0.0712891)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>

        <div class="footer__categor">
          <div class="footer__categor__list">
            <h1>{{ t("buttonCategory") }}</h1>
            <ul>
              <li v-for="item in headerCategorys" :key="item">
                <NuxtLink :to="localePath(`/categorys/${item.slug}`)">{{
                  item?.name
                }}</NuxtLink>
              </li>
            </ul>
          </div>
          <div class="footer__categor__list">
            <h1>General Information</h1>
            <ul>
              <li v-for="item in deliveryInfo" :key="item">
                <NuxtLink :to="localePath(`/categorys/${item.slug}`)">{{
                  item?.name
                }}</NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="footer__icons menu-icons">
          <a href="#" class="footer__icons__icon">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="red"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_11761_4772)">
                <path
                  d="M5.27723 8.42284L5.05924 11.4945C5.37113 11.4945 5.50621 11.3603 5.6682 11.1991L7.13047 9.79917L10.1604 12.0221C10.7161 12.3323 11.1076 12.169 11.2576 11.5099L13.2464 2.17381L13.247 2.17326C13.4232 1.35033 12.9499 1.02852 12.4085 1.23041L0.718003 5.7142C-0.0798483 6.02445 -0.0677679 6.47002 0.582374 6.6719L3.57116 7.60321L10.5135 3.25144C10.8402 3.0347 11.1373 3.15462 10.8929 3.37136L5.27723 8.42284Z"
                  fill="#8F8E94"
                />
              </g>
              <defs>
                <clipPath id="clip0_11761_4772">
                  <rect
                    width="13.1786"
                    height="13.2022"
                    fill="#8F8E94"
                    transform="translate(0.106201 0.0717773)"
                  />
                </clipPath>
              </defs>
            </svg>
          </a>

          <a href="#" class="footer__icons__icon">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_11761_4776)">
                <path
                  d="M9.5461 0.0717773H4.60414C2.33001 0.0717773 0.48584 1.88396 0.48584 4.11864V8.97486C0.48584 11.2095 2.33001 13.0217 4.60414 13.0217H9.5461C11.8202 13.0217 13.6644 11.2095 13.6644 8.97486V4.11864C13.6644 1.88396 11.8202 0.0717773 9.5461 0.0717773ZM12.4289 8.97486C12.4289 10.537 11.1358 11.8077 9.5461 11.8077H4.60414C3.01447 11.8077 1.72133 10.537 1.72133 8.97486V4.11864C1.72133 2.55655 3.01447 1.28583 4.60414 1.28583H9.5461C11.1358 1.28583 12.4289 2.55655 12.4289 4.11864V8.97486Z"
                  fill="#8F8E94"
                />
                <path
                  d="M7.07491 3.30908C5.25545 3.30908 3.78027 4.75867 3.78027 6.54657C3.78027 8.33447 5.25545 9.78406 7.07491 9.78406C8.89438 9.78406 10.3696 8.33447 10.3696 6.54657C10.3696 4.75867 8.89438 3.30908 7.07491 3.30908ZM7.07491 8.57C5.93991 8.57 5.01576 7.66188 5.01576 6.54657C5.01576 5.43045 5.93991 4.52314 7.07491 4.52314C8.20991 4.52314 9.13406 5.43045 9.13406 6.54657C9.13406 7.66188 8.20991 8.57 7.07491 8.57Z"
                  fill="#8F8E94"
                />
                <path
                  d="M10.6167 3.49804C10.8592 3.49804 11.0558 3.3049 11.0558 3.06665C11.0558 2.8284 10.8592 2.63525 10.6167 2.63525C10.3743 2.63525 10.1777 2.8284 10.1777 3.06665C10.1777 3.3049 10.3743 3.49804 10.6167 3.49804Z"
                  fill="#8F8E94"
                />
              </g>
              <defs>
                <clipPath id="clip0_11761_4776">
                  <rect
                    width="13.1786"
                    height="12.9499"
                    fill="white"
                    transform="translate(0.48584 0.0717773)"
                  />
                </clipPath>
              </defs>
            </svg>
          </a>

          <a href="#" class="footer__icons__icon">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_11761_4791)">
                <path
                  d="M10.3134 0.0745243L8.60446 0.0717773C6.68452 0.0717773 5.44377 1.34704 5.44377 3.32085V4.81889H3.7255C3.57702 4.81889 3.45679 4.93948 3.45679 5.08823V7.25872C3.45679 7.40746 3.57716 7.52791 3.7255 7.52791H5.44377V13.0047C5.44377 13.1535 5.56401 13.2739 5.71249 13.2739H7.95434C8.10282 13.2739 8.22305 13.1534 8.22305 13.0047V7.52791H10.2321C10.3806 7.52791 10.5008 7.40746 10.5008 7.25872L10.5016 5.08823C10.5016 5.01681 10.4733 4.94841 10.423 4.89786C10.3726 4.84732 10.3041 4.81889 10.2328 4.81889H8.22305V3.54898C8.22305 2.93861 8.36824 2.62876 9.16191 2.62876L10.3131 2.62835C10.4615 2.62835 10.5817 2.50776 10.5817 2.35915V0.343724C10.5817 0.195252 10.4616 0.074799 10.3134 0.0745243Z"
                  fill="#8F8E94"
                />
              </g>
              <defs>
                <clipPath id="clip0_11761_4791">
                  <rect
                    width="13.1786"
                    height="13.2022"
                    fill="white"
                    transform="translate(0.429932 0.0717773)"
                  />
                </clipPath>
              </defs>
            </svg>
          </a>

          <a href="#" class="footer__icons__icon">
            <svg
              width="14"
              height="13"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_11761_4788)">
                <path
                  d="M13.1357 3.48707C12.9943 2.97069 12.58 2.56363 12.0546 2.42458C11.0947 2.1665 7.2551 2.1665 7.2551 2.1665C7.2551 2.1665 3.41565 2.1665 2.45577 2.4148C1.94045 2.5537 1.51603 2.97076 1.37467 3.48707C1.12207 4.43023 1.12207 6.38621 1.12207 6.38621C1.12207 6.38621 1.12207 8.35205 1.37467 9.28535C1.51617 9.80166 1.93034 10.2087 2.45584 10.3478C3.42576 10.6059 7.25525 10.6059 7.25525 10.6059C7.25525 10.6059 11.0947 10.6059 12.0546 10.3576C12.5801 10.2186 12.9943 9.81159 13.1358 9.29528C13.3883 8.35205 13.3883 6.39614 13.3883 6.39614C13.3883 6.39614 13.3985 4.43023 13.1357 3.48707ZM6.03265 8.19321V4.5792L9.22547 6.38621L6.03265 8.19321Z"
                  fill="#8F8E94"
                />
              </g>
              <defs>
                <clipPath id="clip0_11761_4788">
                  <rect
                    width="13.0841"
                    height="12.8571"
                    fill="white"
                    transform="translate(0.719727 0.0712891)"
                  />
                </clipPath>
              </defs>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import services from "~/services/services";
import { useStore } from "~/store/store";

const store = useStore();

const langShow = ref(false);
const localePath = useLocalePath();
const swithcLocalePath = useSwitchLocalePath();
const { locale, locales, t } = useI18n();

const currentLang = computed(() => locale.value);

const exitFunc = function () {
  localStorage.clear();
  window.location.reload(true);
  window.location.href = "/";
};

const productQuantity = computed(() => {
  let quantity = 0;
  store.cart.forEach((el) => {
    quantity += el.quantity;
  });
  return quantity;
});

const openCategory = ref(false);
const categoryInst = ref(false);
const openMenu = ref(-100 + "%");
async function getSavedProduct() {
  const res = await services.getSavedProduct(store.token);
  store.savedProducts = res?.data;
}
async function getUserInfo() {
  store.loader = true;
  const res = await services.getUserInfo(store.token);
  console.log(res.data);
  store.userInfo = res.data;
  store.openMenu = false;
  store.loader = false;
}

const headerCategorys = ref({});

async function getHeaderCategorys() {
  store.loader = true;
  const res = await services.getHeaderCategorys(locale.value);
  headerCategorys.value = res.data;
  console.log(res);
  store.loader = false;
}

const headerCategorysInsaydes = ref({});

async function headerCategorysIns() {
  const res = await services.headerCategorys();
  headerCategorysInsaydes.value = res?.data;
  console.log(res);
}

const searchVal = ref("");
const searchList = ref({});

async function searchProduct() {
  const res = await services.searchProduct(searchVal.value, locale.value);
  searchList.value = res.data;
}

const categoryTop = reactive({});
const categoryClose = ref();

const topCtaegoryItemTop = function (itemId) {
  categoryTop[itemId] = true;
  categoryClose.value = itemId;
};

const categorysProducts = ref();

async function categorys() {
  store.loader = true;
  const res = await services.categorys(searchVal.value, locale.value);
  categorysProducts.value = res.data;
  console.log(res.data);
  store.loader = false;
}

const callCenterInfo = ref({});

const callCenter = async function () {
  const res = await services.callCenter(locale.value);
  callCenterInfo.value = res?.data;
  console.log(res);
};

const pageCategoryInfo = ref({});

const pageId = ref();

const pageCtegory = async function () {
  const res = await services.pageCategory(locale.value);
  pageCategoryInfo.value = res?.data;
  console.log(res.data);
  res?.data?.forEach((el) => {
    categoryTop[el.id] = false;
  });
  console.log(res?.data);
};

onMounted(() => {
  categorys();
  pageCtegory();
  callCenter();
  headerCategorysIns();
  getHeaderCategorys();
  getUserInfo();
  getSavedProduct();
});

watch(()=> locale.value, ()=> {
  pageCtegory();
})

watch(
  () => locale.value,
  () => {
    categorys();
    getHeaderCategorys();
  }
);

watch(
  () => locale.value,
  () => {
    infoDelivery();
  }
);
</script>

<style lang="scss" scoped>
.menu-bottom {
  .conatiner {
    position: relative;
  }
}
.bottom-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  position: relative;
  .bt-item-saved-tot-cart {
    width: 20px;
    height: 20px;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 12px;
    background: rgb(0, 123, 255);
    color: #fff;
    position: absolute;
    top: -13px;
    left: 32px;
  }
  .bt-item-saved-tot {
    width: 20px;
    height: 20px;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 12px;
    background: rgb(0, 123, 255);
    color: #fff;
    position: absolute;
    top: -13px;
    right: 0px;
  }
  span {
    font-weight: 400;
    font-size: 14px;
    color: #909090;
  }
  img {
    width: 20px;
  }
}
.Notification {
  position: fixed;
  top: 30px;
  z-index: 27;
  width: 200px;
  border-radius: 2px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 25px;
  background: rgb(4, 190, 4);
  transition: all 0.1s ease;
  h1 {
    font-weight: 500;
    font-size: 18px;
    color: #fff;
  }
  img {
    width: 25px;
  }
}
.header-top-list {
  display: flex;
  align-items: center;
}
.media-category-wrap-header {
  padding-bottom: 20px;
  cursor: pointer;
  display: none;
  align-items: center;
  gap: 10px;
  margin-left: -5px;
  @media screen and (max-width: 1170px) {
    display: flex;
  }
  span {
    font-weight: 400;
    font-size: 16px;
  }
  button {
    border: none;
    background: none;
    cursor: pointer;
    img {
      width: 10px;
      display: flex;
    }
  }
}
.product-count {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgb(0, 123, 255);
  color: #fff;
  font-weight: 400;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -11px;
  right: 11px;
}
.categor-slug-wrap {
  position: absolute;
  top: 0;
  left: 450px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  @media screen and (max-width: 1170px) {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    padding-left: 23px;
    padding-top: 10px;
    margin-top: 5px;
  }
}
.categor-name {
  font-weight: 400;
  font-size: 20px !important;
}
.list-lang {
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  top: 53px;
  right: 62px;
  z-index: 1;
  width: 40px;
  background: rgb(0, 123, 255);
  padding: 5px 10px 10px;
  border-radius: 0 0 10px 10px;
  animation: langAnim 0.3s forwards;
}

.categor-slug {
  font-weight: 400;
  font-size: 18px;
  color: #000;
}

@keyframes langAnim {
  from {
    top: 40px;
    opacity: 0;
  }
  to {
    top: 53px;
    opacity: 1;
  }
}

.lang-open-wrapper {
  display: flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
  button {
    border: none;
    background: none;
    color: #fff;
    cursor: pointer;
    font-size: 19px;
  }
}
.list-lang-btn {
  border: none;
  background: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 30px;
  }
}
</style>