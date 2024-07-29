<template>
  <div class="register-wrap" v-if="store.enterPhone">
    <div class="register-wrap-overlay"></div>
    <div class="register">
      <div class="register__header">
        <h2>Регистрация</h2>
        <button @click="store.enterPhone = false, store.registerOpen = !store.registerOpen">
            Назать
        </button>
      </div>
      <form @submit.prevent="enterPhone()">
        <span class="tel">Номер Телефона</span>
        <input v-model="phone" type="text"/>
        <div class="register-btns">
        <button>Далее</button>
      </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import services from '~/services/services';
import { useStore } from '~/store/store';
const store = useStore()

const phone = ref("")

async function enterPhone() {
  const res = await services.enterPhone(phone.value)
  console.log(res)
  if(res.status == 200)  {
    store.phone = phone.value
    store.enterPhone = false
    store.verifiyCode = !store.verifiyCode
  }
}
</script>

<style lang="scss" scoped>
.register-btns {
  padding: 20px 0 25px;
}

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