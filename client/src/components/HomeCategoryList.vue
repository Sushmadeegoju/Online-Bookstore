<script setup lang="ts">
import { inject } from "vue";
import { CategoryItem } from "@/types";
const categoryList = inject("categoryList");
const categoryImageFileName = function (category: CategoryItem): string {
  let name = category.name.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.jpg`;
};
</script>

<style scoped>
.home-page {
  display: flex;
}

button[type="button"] {
  font-size: 32px;
  font-weight: 500;
  width: 250px;
  font-family: var(--title-font-family);
  background-color: #00580d;
  /* color: white; */
  border-radius: 8px;
  border: 0;
  outline: none;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 5px;
  padding-left: 5px;
  margin-top: 30px;
  position: relative;
  /* top: 8px; */
  top: 370px;
  right: 620px;
}

.hero-image {
  display: flex;
}

.hero-text {
  height: 300px;
  width: 400px;
  font-size: 36px;
  font-weight: bolder;
  font-family: var(--title-font-family);
  background-color: whitesmoke;
  color: var(--secondary-background-color);
  border-radius: 50%;
  position: relative;
  top: 80px;
  right: 355px;
  padding: 80px;
  text-align: center;
  align-items: center;
}
/*ul {*/
/*  display: flex;*/
/*  flex-direction: row;*/
/*  flex-wrap: wrap;*/
/*  gap: 1em;*/
/*}*/

/*li {*/
/*  text-align: center;*/
/*  cursor: pointer;*/
/*}*/

/*li div {*/
/*  padding: 0.5em 0;*/
/*  background: rgba(0, 0, 0, 0.5); !* last # is percent opacity *!*/
/*  color: white;*/
/*  transform: translateY(-2.25em);*/
/*  margin-bottom: -2em;*/
/*}*/
</style>

<template>
  <div class="home-page">
    <section class="hero-image">
      <img src="@/assets/images/site/hero-image-1.jpg" alt="hero-image" />
      <div class="hero-text">The Book Garden</div>
      <div>
        <!--        <router-link to="/category/Classics"-->
        <!--          ><button type="button" class="button">SHOP NOW!!!</button>-->
        <!--        </router-link>-->
        <!--        <router-link to="/category/Thriller" class="button"-->
        <!--          >SHOP NOWss!</router-link-->
        <!--        >-->
      </div>
    </section>
  </div>
  <!--  <ul>-->
  <!--    <li v-for="category in categoryList" :key="category.categoryId">-->
  <!--      <router-link :to="'../category/' + category.name">-->
  <!--        <img-->
  <!--          :src="-->
  <!--            require('@/assets/images/categories/' +-->
  <!--              categoryImageFileName(category))-->
  <!--          "-->
  <!--          :alt="category.name + 'category'"-->
  <!--        />-->
  <!--        <div>{{ category.name }}</div>-->
  <!--      </router-link>-->
  <!--    </li>-->
  <!--  </ul>-->
</template>
