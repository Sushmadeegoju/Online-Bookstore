<script setup lang="ts">
import HomeCategoryList from "@/components/HomeCategoryList.vue";
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
</style>
<template>
  <div class="home-page">
    <section class="hero-image">
      <img src="@/assets/images/site/hero-image-1.jpg" alt="hero-image" />
      <div class="hero-text">The Book Garden</div>
      <div style="position: relative">
        <router-link to="/category/Thriller"
          ><button type="button" class="button">SHOP NOW!!!</button>
        </router-link>
      </div>
    </section>
  </div>
</template>
