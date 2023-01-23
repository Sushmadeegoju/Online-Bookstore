<script setup lang="ts">
import { useBookStore } from "@/stores/BookStore";
import CategoryBookListItem from "@/components/CategoryBookListItem.vue";
const bookStore = useBookStore();
</script>

<style scoped>
#book-boxes {
  display: flex;
  flex-wrap: wrap;
  padding: 2em;
  gap: 1em;
}
.category-book-list {
  background-color: #efefef;
}
</style>

<template>
  <div class="category-book-list">
    <ul id="book-boxes">
      <template v-for="book in bookStore.bookList" :key="book.bookId">
        <category-book-list-item :book="book"></category-book-list-item>
      </template>
    </ul>
  </div>
</template>
