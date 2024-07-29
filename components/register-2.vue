<template>
  <div class="register-wrap" v-if="store.signUp">
    <div class="register-wrap-overlay"></div>
    <div class="register">
      <div class="register__header">
        <h2>Регистрация</h2>
        <button>Назать</button>
      </div>
      <form @submit.prevent="signUp()">
        <span class="tel">Имя</span>
        <input type="text" v-model="firstName" />
        <div class="text">
          <span>Фамилия</span>
        </div>
        <input type="text" v-model="lastName" />
        <span class="text">Пароль</span>
        <input type="password" v-model="password" />
        <span class="text">Павторите пароль</span>
        <input type="password" v-model="passwordRepeat" />
        <div class="register-btns">
          <button>Регистрация</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import services from "~/services/services";
import { useStore } from "~/store/store";
const store = useStore();

const firstName = ref("");
const lastName = ref("");
const password = ref("");
const passwordRepeat = ref("");

function reloadFunc() {
  window.location.reload(true)
}

async function signUp() {
  const res = await services.signUp(
    firstName.value,
    lastName.value,
    password.value,
    passwordRepeat.value,
    store.code,
    store.phone,
  );
  if(res.status == 200) {
    localStorage.setItem("authKey", res.data.auth_key)
    store.signUp = false
    reloadFunc()
  }
}
</script>

<style lang="scss" scoped>
.register {
  animation: registerAnim .4s forwards;
}

@keyframes registerAnim {
  from {
    transform: translate(-50%, -60%);
    opacity: 0.9;
  }
  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
}
</style>