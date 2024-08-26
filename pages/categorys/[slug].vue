<template>
  <div>
    <loader v-if="store.loader" />
    <div class="category-name">
      <div class="container">
        <h1>{{ category?.category?.name }}</h1>
        <div class="category-name__btns">
          <button
            class="filter-media-btn"
            @click="store.filterSwitch = !store.filterSwitch"
          >
            <svg
              style="width: 27px"
              data-name="Layer 1"
              fill="#909090"
              id="Layer_1"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title />
              <path
                d="M47,12a2,2,0,0,0-2-2H24a2,2,0,0,0,0,4H45A2,2,0,0,0,47,12Z"
              />
              <path
                d="M3,14H8.35a6,6,0,1,0,0-4H3a2,2,0,0,0,0,4Zm11-4a2,2,0,1,1-2,2A2,2,0,0,1,14,10Z"
              />
              <path
                d="M45,22H37.65a6,6,0,1,0,0,4H45a2,2,0,0,0,0-4ZM32,26a2,2,0,1,1,2-2A2,2,0,0,1,32,26Z"
              />
              <path d="M22,22H3a2,2,0,0,0,0,4H22a2,2,0,0,0,0-4Z" />
              <path d="M45,34H28a2,2,0,0,0,0,4H45a2,2,0,0,0,0-4Z" />
              <path
                d="M18,30a6,6,0,0,0-5.65,4H3a2,2,0,0,0,0,4h9.35A6,6,0,1,0,18,30Zm0,8a2,2,0,1,1,2-2A2,2,0,0,1,18,38Z"
              />
            </svg>
          </button>
          <button
            style="width: 30px; height: 30px"
            class="grid-3"
            @click="(gridTemCol = false), (store.txtWrp = false)"
            v-if="gridTemCol"
          >
            <img src="@/assets/images/svg/grid.svg" alt="" />
          </button>
          <button
            style="width: 30px; height: 30px"
            class="grid-1"
            @click="(gridTemCol = true), (store.txtWrp = true)"
            v-if="!gridTemCol"
          >
            <img src="@/assets/images/svg/grid-menu.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
    <div class="filter">
      <div class="container">
        <div
          class="filter__body"
          :class="{ 'filter-media': !store.filterSwitch }"
        >
          <div class="price">
            <span>{{ t("filterPrice") }} ({{ t("money") }})</span>
          </div>
          <div class="to-from">
            <span>от {{ value[1] }}</span>
            <span>до {{ value[0] }}</span>
          </div>
          <Slider
            v-model="value"
            :min="minPrice"
            :max="maxPrice"
            range
            class="w-14rem"
          />
          <div
            class="breand-filter"
            style="cursor: pointer"
            @click="brandTog = !brandTog"
          >
            <h1>{{ t("brand") }}</h1>
            
            <button
              class="brand-btn"
              :class="{ 'arrow-filter-item-active': brandTog }"
            >
              <svg
                style="width: 20px"
                viewBox="0 0 96 96"
                fill="rgb(120, 120, 120)"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title />
                <path
                  d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z"
                />
              </svg>
            </button>
          </div>
          <div class="filter__list" v-if="brandTog">
            <ul>
              <li v-for="brand in category?.brands" :key="brand.id">
                <input
                  type="checkbox"
                  :value="brand.id"
                  @change="selectBrand(brand.id)"
                />
                <span>{{ brand.name }}</span>
              </li>
            </ul>
          </div>

          <div
            class="filter__botter"
            v-for="item in category?.characters"
            :key="item.characterId"
            :style="{
              height: !characterFilterVisibility[item.characterId]
                ? heig + 'px'
                : '',
            }"
          >
            <div
              class="filter__botter__wrap"
              @click="toggleCharacterFilter(item.characterId)"
              style="cursor: pointer"
            >
              <h1>{{ item.characterName }}</h1>
              <button
                class="arrow-filter-item"
                :class="{
                  'arrow-filter-item-active':
                    characterFilterVisibility[item.characterId],
                }"
              >
                <svg
                  style="width: 20px"
                  viewBox="0 0 96 96"
                  fill="rgb(120, 120, 120)"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title />
                  <path
                    d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z"
                  />
                </svg>
              </button>
            </div>
            <div
              class="botter-width"
              v-for="info in item.assigns"
              :key="info.id"
            >
              <label
                class="botter-width__item"
                v-if="characterFilterVisibility[item.characterId]"
              >
                <input
                  type="checkbox"
                  name="check"
                  :value="info.id"
                  @change="slectCharacter(item.characterId, info.value)"
                />
                <h2>{{ info.value }}</h2>
              </label>
            </div>
          </div>
          <button
            class="check-btn"
            @click="getCategorysProduct(), (store.filterSwitch = false)"
          >
            Показать
          </button>
        </div>
        <div
          class="filter__cards-wrapper"
          :class="{ 'grid-tem-com-1': gridTemCol }"
          v-if="category?.products?.items?.length"
        >
          <productCard
            :class="{ column: gridTemCol }"
            v-for="item in category.products.items"
            :key="item.id"
            :product="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Slider from "primevue/slider";
import { useStore } from "~/store/store";
import services from "~/services/services";

const { slug } = useRoute().params;
const { locale, t } = useI18n();

const gridTemCol = ref(false);

const heig = ref(30);
const brandTog = ref(false);
const selectedBrands = ref([]);
const selectedAssigns = ref([]);

const store = useStore();
const category = ref({});

const minPrice = ref(0);
const maxPrice = ref(0);
const value = ref([maxPrice.value, minPrice.value]);

const characterFilterVisibility = reactive({});

async function getCategorysProduct() {
  store.loader = true;

  const params = new URLSearchParams();
  params.append("slugKey", slug);
  params.append("maxPrice", value.value[0]);
  params.append("minPrice", value.value[1]);
  selectedBrands.value.forEach((id) => {
    params.append("brandIds[]", id);
  });
  selectedAssigns.value.forEach(({ id, value }) => {
    params.append(`filter[${id}][]`, value);
  });

  const queryString = decodeURIComponent(params.toString())
    .split("+")
    .join(" ");
  try {
    const res = await services.getCategorysProducts(queryString, locale.value);
    category.value = res.data;
    minPrice.value = res?.data?.minPrice || 0;
    maxPrice.value = res?.data?.maxPrice || 100000;
    value.value = [maxPrice.value, minPrice.value];
    console.log(res);

    res.data.characters.forEach((character) => {
      characterFilterVisibility[character.characterId] = false;
    });
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  } finally {
    store.loader = false;
  }
}

function toggleCharacterFilter(characterId) {
  characterFilterVisibility[characterId] =
    !characterFilterVisibility[characterId];
}

function slectCharacter(id, value) {
  const obj = { id, value };
  const index = selectedAssigns.value.findIndex(
    (el) => el.id === id && el.value === value
  );
  if (index === -1) {
    selectedAssigns.value.push(obj);
  } else {
    selectedAssigns.value.splice(index, 1);
  }
}

function selectBrand(id) {
  const index = selectedBrands.value.findIndex((el) => el === id);
  if (index === -1) {
    selectedBrands.value.push(id);
  } else {
    selectedBrands.value.splice(index, 1);
  }
}

onMounted(() => {
  getCategorysProduct();
});

// watch(
//   [minPrice, maxPrice],
//   ([newMin, newMax]) => {
//     if (newMin !== undefined && newMax !== undefined) {
//       value.value = [newMax, newMin];
//       getCategorysProduct();
//     }
//   },
//   { immediate: true }
// );
</script>

<style lang="scss">
.filter-card {
  width: 100%;
}
.arrow-filter-item {
  cursor: pointer;
  transition: all 0.3s ease;
}
.arrow-filter-item-active {
  rotate: -90deg;
  transition: all 0.3s ease;
}

.botter-width__item {
  animation: item-anim 0.3s forwards;
}

.brand-btn {
  cursor: pointer;
  transition: all 0.3s ease;
}

.breand-filter {
  padding-bottom: 20px;
  padding-top: 10px;
}

.filter__list {
  animation: item-anim 0.4s forwards;
}

.grid-tem-com-1 {
  display: grid;
  grid-template-columns: 1fr;
}

.column {
  flex-direction: row;
  background: #fff;
  animation: grid-anim 0.3s forwards;
  @media screen and (max-width: 600px) {
    padding: 10px;
  }
  * {
    text-align: left;
    @media screen and (max-width: 600px) {
      img {
        width: 100px;
        font-size: 14px;
      }
    }
    @media screen and (max-width: 400px) {
      img {
        width: 80px;
      }
    }
  }
}

@keyframes item-anim {
  from {
    opacity: 0;
    margin-top: -5px;
  }
  to {
    opacity: 1;
    margin-top: 0;
  }
}

@keyframes grid-anim {
  from {
    margin-top: -5px;
  }
  to {
    margin-top: 0;
  }
}

@keyframes grid-wrap-anim {
  from {
    transform: translateX(100%);
  }
}
</style>
