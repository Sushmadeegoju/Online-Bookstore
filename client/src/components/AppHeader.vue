<script setup>
import HeaderDropdown from "@/components/HeaderDropdown.vue";
import { useCartStore } from "@/stores/CartStore";
const cartStore = useCartStore();
</script>
<script>
export default {
  methods: {
    isHomepageName() {
      if (this.$route["name"] === "category-view") {
        return "Sushma";
      } else return "";
    },
    isCategoryPageBoolean() {
      return this.$route["name"] !== "category-view";
    },
  },
};
</script>

<style scoped>
header {
  background: var(--secondary-background-color);
  display: flex;
  padding: 1em;
  gap: 1em;
}

.container {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.logo-and-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.logo {
  width: 250px;
  height: 100px;
}

.search-bar {
  display: flex;
}

input[type="text"] {
  padding: 0.5em;
  border-radius: 2px;
  border: 0;
  color: black;
  outline: none;
  font-size: 20px;
  background-color: var(--neutral-color);
}

button[type="submit"] {
  border-radius: 2px;
  font-size: 24px;
  border: 0;
  outline: none;
  cursor: pointer;
  background-color: var(--primary-color-dark);
  color: white;
}

.cart-and-login {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.badge:after {
  content: attr(value);
  font-size: 16px;
  font-weight: 300;
  background: var(--primary-color-dark);
  /* color: var(--secondary-/background-color); */
  border-radius: 50%;
  padding: 2px;
  position: relative;
  left: -25px;
  top: -18px;
  opacity: 0.9;
  margin-right: 30px;
}

@media (max-width: 600px) {
  header {
    flex-direction: column;
  }
}
</style>

<template>
  <header class="container">
    <section class="logo-and-title">
      <div class="logo">
        <router-link to="/">
          <img
            src="@/assets/images/site/logo-2.png"
            alt="The Book Garden Logo"
          />
          <!--          <div class="text-logo">The Book Garden</div>-->
        </router-link>
      </div>
    </section>
    <section>
      <form class="search-bar" action="category.html">
        <input type="text" placeholder="Search..." /><br />
        <button type="submit"><i class="fa fa-search"></i></button>
      </form>
    </section>
    <header-dropdown></header-dropdown>
    <section class="cart-and-login">
      <div>
        <router-link to="/cart">
          <div
            style="
              position: relative;
              font-size: 54px;
              margin-right: 20px;
              /*//background-color: #3c2727;*/
              /*/border-style: none;*/
              border-color: var(--secondary-background-color);
              color: rgb(255, 255, 255);
            "
          >
            <p
              style="
                position: absolute;
                color: var(--secondary-background-color);
                bottom: 12px;
                margin-bottom: 12px;
                margin-left: 25px;
                font-size: 16px;
                font-weight: bold;
              "
            >
              {{ cartStore.count }}
            </p>

            <i
              class="fa fa-shopping-cart"
              style="font-size: 54px"
              aria-hidden="true"
            ></i>
            <!--          <i class="fa-solid fa-cart-shopping" style="color: #ffffff"></i>-->
          </div>
        </router-link>
      </div>
      <div>
        <!--user-->
        <i
          style="font-size: 40px; padding-top: 0.2em; padding-left: 0.2em"
          class="fa"
          >&#xf007;</i
        >
        <div>{{ isHomepageName() }}</div>
      </div>
    </section>
  </header>
</template>
