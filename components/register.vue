<template>
  <div class="register-wrap">
    <div class="register-wrap-overlay" @click="store.registerOpen = false"></div>
    <div class="register">
      <div class="register__header">
        <h2>Вход</h2>
        <button @click="store.registerOpen = false">
          <svg
            fill="none"
            height="16"
            viewBox="0 0 16 16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4.29289 5.70711L6.58579 8L4.29289 10.2929L5.70711 11.7071L8 9.41421L10.2929 11.7071L11.7071 10.2929L9.41421 8L11.7071 5.70711L10.2929 4.29289L8 6.58579L5.70711 4.29289L4.29289 5.70711Z"
              fill="#fff"
              fill-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <form @submit.prevent="login()">
        <span class="tel">Номер Телефона</span>
        <input v-model="username" type="text"/>
        <div class="text">
          <span>Пароль</span>
          <button type="button" class="pasw" @click="store.registerOpen = false, store.resetPasswordPhone = true">Забыли пароль</button>
        </div>
        <input v-model="password" type="password" />
        <div class="register-btns">
          <button>Вход</button>
          <button type="button" @click="store.enterPhone = !store.enterPhone, store.registerOpen = false">
            Регистрация
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import services from "~/services/services";
import { useStore } from "~/store/store";
const store = useStore();

const username = ref("");
const password = ref("");

function reloadFunc() {
  window.location.reload(true)
  window.localStorage.href = "/"
}

async function login() {
  const res = await services.loginEtapFirst(username.value, password.value)
  console.log(res)
  if(res.status == 200) {
    localStorage.setItem("authKey", res.data.auth_key)
    store.registerOpen = false
    reloadFunc()
  }
}
</script>

<style scoped>
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