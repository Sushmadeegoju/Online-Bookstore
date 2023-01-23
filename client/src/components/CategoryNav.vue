<script setup lang="ts">
import { useRoute } from "vue-router";
import { useCategoryStore } from "@/stores/CategoryStore";
import { useCartStore } from "@/stores/CartStore";
const cartStore = useCartStore();
const route = useRoute();
const categoryStore = useCategoryStore();
const setCurrentCategoryName = function (categoryName: string) {
  cartStore.selectedCategoryName = categoryName;
};
// const categoryList = inject("categoryList");
</script>

<style scoped>
.category-buttons {
  display: flex;
  flex-direction: row;
  text-align: center;
  background-color: var(--primary-color-dark);
  justify-content: space-around;
  /*height: max-content;*/
}

.user {
  align-items: center;
  text-align: center;
}

.profile {
  padding-top: 5px;
}

.button.unselected-category-button,
.button.unselected-category-button:visited {
  background-color: var(--primary-color-dark);
}

.button.unselected-category-button:hover,
.button.unselected-category-button:active {
  background-color: var(--primary-color);
  font-size: 20px;
}

.button:active {
  background-color: var(--card-background-color);
  color: black;
  font-weight: bold;
  font-size: 20px;
}

.button.selected-category-button {
  background-color: var(--card-background-color);
  color: black;
  font-weight: bold;
  font-size: 20px;
}

/*.button.selected-category-button {*/
/*  background-color: var(--primary-color);*/
/*}*/
</style>

<template>
  <nav class="category-nav">
    <ul class="category-buttons">
      <li
        v-for="category in categoryStore.categoryList"
        :key="category.categoryId"
        @click="setCurrentCategoryName(category.name)"
      >
        <!--        <div v-if="category.categoryId === 1003">-->
        <router-link
          :to="{ name: 'category-view', params: { name: category.name } }"
          class="button"
          :class="
            category.name === route.params.name
              ? 'selected-category-button'
              : 'unselected-category-button'
          "
        >
          {{ category.name }}
          <!--          </router-link>-->
          <!--        </div>-->
          <!--        <div v-else>-->
          <!--          <router-link-->
          <!--            :to="'../category/' + category.name"-->
          <!--            class="button unselected-category-button"-->
          <!--          >-->
        </router-link>
        <!--        </div>-->
      </li>
    </ul>
  </nav>
</template>
