<template>
  <div>
    <div class="overlay" @click="store.servic = false"></div>
    <div class="chat">
      <div class="insaydes-settings" v-if="store.clearStorage">
        <img src="~/assets/images/png/clear.png" alt="">
        <button @click="clearChat()">Очистить кеш</button>
      </div>
      <div class="chat-header">
        <img width="50px" src="~/assets/images/png/bot.png" alt="Иконка бота" />
        <div class="chat-header__text-wrapper">
          <h3>{{ t("chatName") }}</h3>
          <span>{{ t("chatTitle") }}</span>
        </div>
        <button @click="store.servic = false">{{ t("backButton") }}</button>
      </div>
      <div class="messages-wrapper">
        <div class="messages" ref="contentDiv"></div>
      </div>
      <div class="chat-footer">
        <form id="form-chat">
          <button class="settings-chat" type="button" @click="store.clearStorage = !store.clearStorage">
            <img src="~/assets/images/png/settings-chat.png" alt="" />
          </button>
          <input type="text" id="input-message" :placeholder="t('chatInput')" />
          <button type="submit">
            <img
              width="20px"
              src="~/assets/images/png/send-icon-2.png"
              alt="Иконка отправки"
            />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { useStore } from "~/store/store";

const { locale, t } = useI18n();

const store = useStore();
const taost = useToast();
const contentDiv = ref(null);

function clearChat() {
  localStorage.removeItem("messages")
  window.location.reload(true)
  taost.success("Кэш успешно очищен")
}

function notifMessageError() {
  taost.error("Ой что то пошло не так");
}

function notifMessageWarning() {
  taost.warning("Пожалуйста, напишите ваше сообщение");
}

const loadMessages = () => {
  const messages = JSON.parse(localStorage.getItem("messages") || "[]");
  contentDiv.value.innerHTML = messages.map((msg) => msg).join("");

  nextTick(() => {
    if (contentDiv.value) {
      contentDiv.value.scrollTop = contentDiv.value.scrollHeight;
    }
  });
};

onMounted(() => {
  loadMessages();

  const input = document.querySelector("#input-message");
  const form = document.querySelector("#form-chat");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const messageText = input.value.trim();

    if (!messageText) {
      console.error("Сообщение не может быть пустым");
      notifMessageWarning();
      return;
    }

    const TOKEN = "7220117859:AAFhyuYkOHud9LzwfOIQ2mJmcgiXHSiGFRk";
    const CHAT_ID = "5816401755";
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: messageText,
        }),
      });

      const data = await response.json();

      if (data.ok) {
        const userMessage = `<span class="message user-message">${messageText}</span>`;
        const botMessage = `<span class="message bot-message">${t(
          "botMessage"
        )}</span>`;

        const messages = JSON.parse(localStorage.getItem("messages") || "[]");
        messages.push(userMessage);
        messages.push(botMessage);
        localStorage.setItem("messages", JSON.stringify(messages));
        loadMessages();
      } else {
        notifMessageError();
      }
    } catch (error) {
      notifMessageError();
    }

    input.value = "";
  });
});
</script>

<style lang="scss" scoped>
</style>
