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
        <input v-model="phone" @click="mask" @input="mask" type="text" placeholder="+998 ("/>
        <div class="register-btns">
        <button>Далее</button>
      </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification';
import services from '~/services/services';
import { useStore } from '~/store/store';
const store = useStore()
const toast = useToast()

function infoNotify() {
  toast.info('Подвердите код')
}

function warningNotify() {
  toast.warning('Номер телефон не найден')
}

const mask = (event) => {
    let keyCode;
    event.keyCode && (keyCode = event.keyCode);
    let pos = event.target.selectionStart;
    if (pos < 3) event.preventDefault();
    let matrix = "+998 (__) ___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = event.target.value.replace(/\D/g, ""),
        newValue = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
    i = newValue.indexOf("_");
    if (i !== -1) {
        i < 5 && (i = 3);
        newValue = newValue.slice(0, i);
    }
    let reg = matrix.substr(0, event.target.value.length).replace(/_+/g,
        function (a) {
            return "\\d{1," + a.length + "}";
        }).replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (!reg.test(event.target.value) || event.target.value.length < 5 || (keyCode > 47 && keyCode < 58)) {
        event.target.value = newValue;
    }
    if (event.type === "blur" && event.target.value.length < 5) {
        event.target.value = "";
    }
};

const phone = ref("")

async function enterPhone() {
  const res = await services.enterPhone(phone.value)
  console.log(res)
  if(res.status == 200)  {
    store.phone = phone.value
    infoNotify()
    store.enterPhone = false
    store.verifiyCode = !store.verifiyCode
  } else {
    warningNotify()
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