<template>
  <div>
    <loader v-if="store.loader" />
    <div class="category-name">
      <div class="container">
        <h1>{{ category?.category?.name }}</h1>
        <div class="category-name__btns">
          <button class="grid-3">
            <img src="~/assets/images/svg/grid.svg" alt="" />
          </button>
          <button class="grid-1">
            <img src="~/assets/images/svg/grid-menu.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
    <div class="filter" v-if="category?.products?.items?.length">
      <div class="container">
        <div class="filter__body">
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
            <h1>Бренд</h1>
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
                  v-model="selectedBrands"
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
            <div class="botter-width" v-for="info in item.assigns" :key="info.id">
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
          <button class="check-btn" @click="getCategorysProduct">
            Показать
          </button>
        </div>
        <div class="filter__cards-wrapper">
          <productCard
            class="filter-card"
            v-for="item in category.products.items"
            :key="item.id"
            :product="item"
          />
        </div>
      </div>
    </div>
    <!-- Сообщение о загрузке или отсутствующих данных -->
    <div v-if="!store.loader && !category?.products?.items?.length">
      <p>Нет доступных продуктов.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import Slider from 'primevue/slider';
import { useRoute } from 'vue-router';
import { useStore } from '~/store/store';
import services from '~/services/services';
import { useI18n } from 'vue-i18n';

const { slug } = useRoute().params;
const { locale, t } = useI18n();

const heig = ref(30);
const brandTog = ref(false);
const selectedBrands = ref([]);
const selectedAssigns = ref([]);

const store = useStore();
const category = ref({});

// Установим начальные значения
const minPrice = ref(0);
const maxPrice = ref(100000);
const value = ref([maxPrice.value, minPrice.value]);

const characterFilterVisibility = reactive({});

async function getCategorysProduct() {
  store.loader = true;

  const params = new URLSearchParams();
  params.append('slugKey', slug);
  params.append('maxPrice', value.value[0]);
  params.append('minPrice', value.value[1]);

  selectedAssigns.value.forEach(({ id, value }) => {
    params.append(`filter[${id}][]`, value);
  });

  const queryString = decodeURIComponent(params.toString()).split('+').join(' ');
  try {
    const res = await services.getCategorysProducts(queryString, locale.value);
    category.value = res.data;
    minPrice.value = res?.data?.minPrice || 0;
    maxPrice.value = res?.data?.maxPrice || 100000;
    value.value = [maxPrice.value, minPrice.value];

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
  characterFilterVisibility[characterId] = !characterFilterVisibility[characterId];
}

function slectCharacter(id, value) {
  const obj = { id, value };
  const index = selectedAssigns.value.findIndex(el => el.id === id && el.value === value);
  if (index === -1) {
    selectedAssigns.value.push(obj);
  } else {
    selectedAssigns.value.splice(index, 1);
  }
}

onMounted(() => {
  getCategorysProduct();
});

watch([minPrice, maxPrice], ([newMin, newMax]) => {
  if (newMin !== undefined && newMax !== undefined) {
    value.value = [newMax, newMin];
    getCategorysProduct();
  }
}, { immediate: true });

</script>

<style lang="scss" scoped>
.filter-card {
  width: 230px;
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
</style>
