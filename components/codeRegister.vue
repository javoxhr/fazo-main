<template>
  <div class="register-wrap" v-if="store.verifiyCode">
    <div class="register-wrap-overlay"></div>
    <div class="register">
      <div class="register__header">
        <h2>Подвердите код</h2>
        <button @click="store.verifiyCode = false, store.enterPhone = true">Назать</button>
      </div>
      <form @submit.prevent="verifiyCode()">
        <span class="tel">На Ваш Телефон Отправлен 4-х Значный Код Подтверждения <span>{{ store.phone }}</span></span>
        <div ref="container" class="verif-inp-wrap">
          <input
            @keyup="(e) => handleEnter(e, n - 1)"
            v-for="n in length"
            :key="n"
            v-model="otpArray[n - 1]"
            type="text"
            maxlength="1"
            :style="{ outline: border }"
          />
        </div>
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

const border = ref("1px solid #000");

const otpProps = defineProps({
  length: {
    type: Number,
    default: 4,
  },
});

const otpArray = ref([]);

const container = ref();

function handleEnter(e, i) {
  const children = container.value.children;
  const keypressed = e.key;
  if (i > 0 && (keypressed === "Backspace" || keypressed === "Delete")) {
    otpArray.value[i] = null;
    setTimeout(() => {
      children[i - 1].focus();
    }, 50);
  } else {
    const matched = keypressed.match(/^[0-9]$/);
    if (!matched) {
      otpArray.value[i] == null;
      return;
    } else if (i < otpProps.length - 1) {
      setTimeout(() => {
        children[i + 1].focus();
      }, 50);
    }
  }
}

const successNotif = () => {
  toast.success('Код подвержден')
}

async function verifiyCode() {
  const otpCode = parseInt(otpArray.value.join(""), 10);
  const res = await services.code(otpCode, store.phone);
  console.log(res);
  if (res.status == 200) {
    border.value = "2px solid rgb(5, 191, 5)";
    setTimeout(()=> {
      border.value = ''
    }, 1000)
    store.code = otpCode;
    successNotif()
    setTimeout(() => {
      store.verifiyCode = false;
    }, 1000);
    setTimeout(() => {
      store.signUp = true;
    }, 1000);
  } else {
    border.value = "2px solid red";
    setTimeout(()=> {
      border.value = ""
    }, 2000)
  }
}
</script>
  
<style lang="scss" scoped>
.verif-inp-wrap {
  display: flex;
  align-items: center;
  gap: 20px;
  input {
    width: 40px;
    font-size: 16px;
    text-align: center;
  }
}

.register {
  animation: registerAnim 0.4s forwards;
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