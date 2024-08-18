<template>
  <div>
    <NuxtLink :to="localePath(`/categorys/${popular?.slug}`)">
      <div class="popular-card">
        <h3 style="color: #000;">{{ popular?.name }}</h3>
        <img :src="popular?.iconUrl" alt="" />
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const localePath = useLocalePath();
const { locale, locales, t } = useI18n();
const { popular } = defineProps(["popular"]);
</script>

<style lang="scss" scoped>
.popular-card {
  width: 450px;
  height: 120px;
  border: 1px solid #f4f3f3;
  border-radius: 5px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px;
  @media screen and (max-width: 1287px) {
    width: 300px;
    * {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 993px) {
    width: 250px;
  }
  @media screen and (max-width: 836px) {
    width: 200px;
  }
  @media screen and (max-width: 674px) {
    * {
      font-size: 10px;
    }
  }
  @media screen and (max-width: 667px) {
    height: 100px;
    img {
      width: 30px;
    }
  }
  @media screen and (max-width: 649px) {
    width: 150px;
    height: 80px;
    * {
      width: 100px;
    }
  }
  @media screen and (max-width: 505px) {
    width: 130px;
  }
}
</style>