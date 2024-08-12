<template>
  <div>
    <div class="register-wrap" v-if="store.update">
      <div class="register-wrap-overlay"></div>
      <div class="register">
        <div class="register__header">
          <h2>Личные данные</h2>
          <button @click="store.update = false">
            Назать
          </button>
        </div>
        <form @submit.prevent="update()">
          <span class="tel">Имя</span>
          <input id="first-name-input" type="text" v-model="firstName"/>
          <span class="tel">Фамилия</span>
          <input id="last-name-input" type="text" v-model="lastName"/>
          <div class="register-btns">
            <button>Изменить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification';
import services from '~/services/services';
import { useStore } from '~/store/store';

const store = useStore()
const toast = useToast()

const firstName = ref(`${store?.userInfo?.firstname ? store?.userInfo?.firstname : ""}`)
const lastName = ref(`${store?.userInfo?.lastname ? store?.userInfo?.lastname : ""}`)

function notifSuccess() {
  toast.success('Ваши данные успешно обновлены')
}

function notifError() {
  toast.error('Ошибка, что-то пошло не так!!!')
}

function reload() {
    window.location.reload(true)
}

async function update() {
    const res = await services.update(store.token, firstName.value, lastName.value)
    if(res.status == 200) {
        store.update = false
        notifSuccess()
        setTimeout(()=> {
          reload()
        }, 1000)
    } else {
      notifError()
    }
}
</script>

<style lang="scss" scoped>
</style>