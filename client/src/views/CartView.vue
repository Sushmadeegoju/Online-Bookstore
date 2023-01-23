<script setup lang="ts">
import CartTable from "@/components/CartTable.vue";
import { useCartStore } from "@/stores/CartStore";
const cartStore = useCartStore();
const clearCart = function () {
  cartStore.cart.clear();
};
</script>
<style scoped>
h1 {
  margin: 1em auto;
  text-align: center;
  color: var(--secondary-background-color);
  /*background-color: var(--neutral-color);*/
}
</style>

<template style="color: var(--neutral-color)">
  <h1>Cart Page</h1>
  <cart-table></cart-table>
</template>
