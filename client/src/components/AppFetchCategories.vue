<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import { useRoute } from "vue-router";
import { useCategoryStore } from "@/stores/CategoryStore";

const route = useRoute();
const categoryStore = useCategoryStore();
categoryStore.fetchCategories();
// console.log(categoryStore.categoryList[0].name);
</script>

<style>
.page {
  border: 1px solid black;
}
</style>

<template>
  <div id="app" class="page">
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>
