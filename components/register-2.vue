<template>
  <div class="register-wrap" v-if="store.signUp">
    <div class="register-wrap-overlay"></div>
    <div class="register">
      <div class="register__header">
        <h2>Регистрация</h2>
        <button @click="store.signUp = false, store.verifiyCode = true">Назать</button>
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
import { useToast } from "vue-toastification";
import services from "~/services/services";
import { useStore } from "~/store/store";
const store = useStore();
const toast = useToast()

const firstName = ref("");
const lastName = ref("");
const password = ref("");
const passwordRepeat = ref("");

function reloadFunc() {
  window.location.reload(true)
}

const successNotify = function() {
  toast.success('Добро пожаловать')
}

const errorNotify = function() {
  toast.error('Заполните анкету')
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
    setTimeout(()=> {
      reloadFunc()
    }, 1000)
    successNotify()
  } else {
    errorNotify()
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