<template>
  <main>
    <div class="cart-item">
      <div class="cart-item-wrapper">
        <div class="cart-item-img">
          <img :src="cartItem?.image" alt="" />
        </div>

        <div class="cart-item__text-wrapper">
          <h1>{{ cartItem?.title }}</h1>
          <span>{{ cartItem?.price * cartItem.quantity }} Сум</span>
        </div>
      </div>
      <div class="cart-buttons">
        <div class="cart-btns">
          <button @click="remCountProduct(cartItem)">-</button>
          <span>{{ cartItem.quantity }}</span>
          <button @click="addCountProduct(cartItem)">+</button>
        </div>
        <div class="cart-rem-btns">
          <button class="cart-like-btn">
            <svg
              enable-background="new 0 0 128 128"
              height="25px"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 128 128"
              width="25px"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <path
                d="M127,44.205c0-18.395-14.913-33.308-33.307-33.308c-12.979,0-24.199,7.441-29.692,18.276  c-5.497-10.835-16.714-18.274-29.694-18.274C15.912,10.898,1,25.81,1,44.205C1,79,56.879,117.104,64.001,117.104  C71.124,117.104,127,79.167,127,44.205z"
                fill="rgb(107, 105, 105)"
              />
            </svg>
          </button>
          <button class="rem-btn" @click="removeProduct(cartItem)">
            <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#a7a7a7"
                d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <span class="cart-linie">
      <span></span>
    </span>
  </main>
</template>

<script setup>
import { addCountProduct } from "~/composables/addCountProduct";
import { remCountProduct } from "~/composables/remCountProduct";
import { removeProduct } from "~/composables/removeProduct";
const { cartItem } = defineProps(["cartItem"]);
</script>

<style lang="scss" scoped>
</style>