<script setup lang="ts">
// import { ref } from "vue";
import { useCategoryStore } from "@/stores/CategoryStore";

const categoryStore = useCategoryStore();
// let mainMenuOpen = ref(false);
// function toggleMainMenu() {
//   mainMenuOpen.value = !mainMenuOpen.value;
// }
</script>

<style scoped>
.header-dropdown {
  position: relative;
}

.categories-button {
  background-color: var(--secondary-background-color);
  color: white;
  font-size: 24px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-family: var(--title-font-family);
  font-weight: 400;
}

.categories-button:hover {
  background-color: var(--primary-color-dark);
}

.header-dropdown ul {
  background-color: white;
  color: black;
  display: none;
}

.header-dropdown li {
  padding: 0.25em 2em;
  font-size: 18px;
}

.header-dropdown a {
  color: black;
  text-decoration: none;
}

.header-dropdown li:hover {
  background: gray;
}

.header-dropdown:hover ul {
  display: block;
  position: absolute;
  min-width: 8em;
  z-index: 1;
  cursor: pointer;
}
</style>

<template>
  <div class="header-dropdown">
    <button class="button categories-button">
      Categories<i
        class="fa fa-caret-down"
        style="font-size: 24px; margin-left: 5px"
      ></i>
    </button>
    <ul>
      <li
        v-for="category in categoryStore.categoryList"
        :key="category.categoryId"
      >
        <router-link :to="'../category/' + category.name">
          {{ category.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
