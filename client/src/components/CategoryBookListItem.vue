<script setup lang="ts">
import { defineProps } from "vue";
import { BookItem } from "@/types";
import { useCartStore } from "@/stores/CartStore";

const cartStore = useCartStore();
const props = defineProps<{
  book: BookItem;
}>();
const bookImageFileName = function (book: BookItem): string {
  let name = book.title.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.gif`;
};

function addToCart(book: BookItem) {
  cartStore.addToCart(book);
}
</script>
<style scoped>
.book-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--card-background-color);
  padding: 1em 1.5em;
  color: black;
  gap: 0.25em;
  border: 1px solid black;
  border-radius: 10px;
  max-width: 25%;
  min-width: 15%;
}

.add-to-cart {
  border-radius: 8px;
  border: 0;
  outline: none;
  background-color: var(--primary-color-dark);
  color: white;
  text-align: center;
  padding: 6px;
  cursor: pointer;
}

.add-to-cart:hover {
  background-color: black;
}
.book-title,
.book-price {
  font-weight: bold;
  text-align: center;
}

.book-author {
  font-style: italic;
}

.read-now-button {
  grid-column: 1 / 2;
  grid-row: 1 / -1;
  background-color: var(--primary-color);
  color: white;
  width: min-content;
  height: min-content;
  justify-self: end;
  margin-top: -14em;
  margin-bottom: 11em;
  margin-left: 6em;
  border-radius: 50%;
  padding: 0.5em;
  font-size: 0.8rem;
  position: relative;
}
.read-now-button:hover {
  background-color: black;
}

.blur-image:hover {
  -webkit-filter: blur(5px);
}
</style>

<template>
  <li class="book-box">
    <div class="book-image">
      <router-link to="/">
        <img
          :src="require('@/assets/images/books/' + bookImageFileName(book))"
          :alt="book.title"
          :class="book.isPublic === true ? 'blur-image' : ''"
        />
        <div v-if="book.isPublic" class="read-now-button">Read Now</div>
      </router-link>
    </div>
    <div class="book-title">{{ book.title }}</div>
    <div class="book-author">{{ book.author }}</div>
    <div class="book-price">${{ (book.price / 100).toFixed(2) }}</div>
    <button class="add-to-cart" @click="addToCart(book)">
      Add to Cart<i
        class="fa fa-cart-plus"
        style="font-size: 24px; margin-left: 2px"
      ></i>
    </button>
  </li>
</template>
