<template>
  <div>
    <div class="register-wrap" v-if="store.resetPasswordPhone">
      <div class="register-wrap-overlay"></div>
      <div class="register">
        <div class="register__header">
          <h2>Обновить Пароль</h2>
          <button @click="store.resetPasswordPhone = false, store.registerOpen = true"
          >
            Назать
          </button>
        </div>
        <form @submit.prevent="resetPassword()">
          <span class="tel">Номер Телефона</span>
          <input v-model="phone" type="text" />
          <div class="register-btns">
            <button>Далее</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import services from '~/services/services';
import { useStore } from '~/store/store';

const store = useStore()

const phone = ref("")

async function resetPassword() {
    const res = await services.resetPasswordPhone(phone.value)
    console.log(res)
    if(res.status == 200) {
      store.phone = phone.value
      store.resetPasswordPhone = false
      store.resetCode = true
    }
}
</script>

<style lang="scss" scoped>
</style>