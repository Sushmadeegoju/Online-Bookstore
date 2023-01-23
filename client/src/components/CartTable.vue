<script setup lang="ts">
// xmlns="http://www.w3.org/1999/html"
import { useCartStore } from "@/stores/CartStore";
import { asDollarsAndCents } from "@/main";
// import { ShoppingCart } from "@/models/ShoppingCart";
// const shoppingCart = ShoppingCart;
const cartStore = useCartStore();
import { BookItem } from "@/types";
const bookImageFileName = function (book: BookItem): string {
  let name = book.title.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.gif`;
};
// TODO If necessary, replace the above function with the "bookImageFileName" function
//  TODO from your CategoryBookListItem component.

const updateCart = function (book: BookItem, quantity: number) {
  // cartStore.cart.update(book, quantity);
  cartStore.updateBookQuantity(book, quantity);
};
// TODO The above function calls through directly to the shopping cart, which means it does not update local storage.
// TODO Change the implementation so that it uses the appropriate action from the cart storage.
</script>

<style scoped>
body {
  background-color: var(--neutral-color);
}
.cart-table {
  display: grid;
  grid-template-columns: max-content minmax(10em, 20em) repeat(3, max-content);
  row-gap: 1em;
  width: fit-content;
  margin: 0 auto;
  background-color: var(--card-background-color);
}

ul {
  display: contents;
}

ul > li {
  display: contents;
}

.table-heading {
  background-color: var(--primary-color-dark);
  color: white;
}

.table-heading > * {
  background-color: var(--primary-color-dark);
  padding: 0.5em;
}

.heading-book {
  grid-column: 1 / 3;
}

.heading-price {
  grid-column: 3 / 5;
  text-align: right;
}

.heading-subtotal {
  text-align: right;
  grid-column: -2 / -1;
}

.cart-book-image {
  padding: 0 1em;
}

.cart-book-image > * {
  margin-left: auto;
  margin-right: 0;
}

img {
  display: block;
  width: 100px;
  height: auto;
}
/* TODO The width above is for book images that are normally 200px wide. Change this (if necessary) */
/* TODO to accommodate your own book images. the rule of thumb is that the image here should be about */
/* TODO half the size of the book images as they appear on your category page. */

.cart-book-price {
  padding-left: 1em;
  text-align: right;
  color: black;
}

.cart-book-quantity {
  padding-left: 1em;
  padding-right: 1em;
  color: black;
}

.cart-book-subtotal {
  text-align: right;
  padding-left: 1em;
  padding-right: 1em;
  color: black;
}

/* Row separators in the table */

.line-sep {
  display: block;
  height: 2px;
  background-color: var(--primary-color-dark);
  grid-column: 1 / -1;
}

/* Increment/decrement buttons */

/* TODO Consider using icon buttons for your increment and decrement buttons. */
/* TODO Modify the CSS here to suit your own design. */
/* TODO In particular, you may or may not have custom properties */
/* TODO primary-color and primary-color-dark defined in your global CSS file. */
.icon-button {
  border: none;
  cursor: pointer;
}

.inc-button {
  font-size: 1.125rem;
  color: var(--primary-color);
  margin-right: 0.25em;
}

.inc-button:hover {
  color: var(--primary-color-dark);
}

.dec-button {
  font-size: 1.125rem;
  color: #ccc;
}

.dec-button:hover {
  color: #aaa;
}

select {
  background-color: var(--primary-color);
  color: white;
  border: 2px solid var(--primary-color-dark);
  border-radius: 3px;
}

.button-continue,
.button-continue:visited {
  display: inline-block;
  background: var(--card-background-color);
  color: var(--primary-color-dark);
  font-weight: bold;
  text-decoration: none;
  padding: 0.5em; /*1em ;*/
  cursor: pointer;
}

.button-continue:hover,
.button-continue:active {
  background: var(--primary-color-dark);
  color: white;
}
</style>

<template>
  <!--  <p>You have added {{  item.count() }} item(s) to your cart</p>-->
  <!--  <div class="cart-table">-->
  <div
    style="
      display: flex;
      flex-direction: row;
      width: auto;
      margin-bottom: 0.7em;
    "
  >
    <div
      v-if="
        cartStore.cart.items.reduce((Sum, item) => item.quantity + Sum, 0) !== 1
      "
      style="margin-left: 15em; color: black; font-size: 18px; font-weight: 500"
    >
      Your cart contains
      {{ cartStore.cart.items.reduce((Sum, item) => item.quantity + Sum, 0) }}
      Books
    </div>
    <div v-else style="margin-left: 18em">
      Your cart contains
      {{ cartStore.cart.items.reduce((Sum, item) => item.quantity + Sum, 0) }}
      Book
    </div>
    <div style="margin-left: 20em">
      <button
        @click="cartStore.clearCart()"
        class="button"
        style="
          background-color: var(--primary-color-dark);
          border-radius: 4px;
          color: white;
        "
      >
        Clear Cart
      </button>
    </div>
  </div>
  <div v-if="cartStore.cart.items.length !== 0" class="cart-table">
    <ul>
      <li class="table-heading">
        <div class="heading-book">Book</div>
        <div class="heading-price">Price / Quantity</div>
        <div class="heading-subtotal">Amount</div>
      </li>
      <template v-for="item in cartStore.cart.items" :key="item.book.bookId">
        <li>
          <div class="cart-book-image">
            <img
              :src="
                require('@/assets/images/books/' + bookImageFileName(item.book))
              "
              :alt="item.book.title"
              width="100px"
              height="auto"
            />
          </div>
          <div
            class="cart-book-title"
            style="color: black; font-size: 20px; font-weight: 500"
          >
            {{ item.book.title }}
          </div>
          <div
            class="cart-book-price"
            style="color: black; font-size: 20px; font-weight: 500"
          >
            ${{ (item.book.price / 100).toFixed(2) }}
          </div>
          <div
            class="cart-book-quantity"
            style="font-size: 20px; font-weight: 500"
          >
            <i
              class="fa fa-minus-square"
              style="
                font-size: 20px;
                margin-right: 5px;
                cursor: pointer;
                color: var(--primary-color-dark);
              "
              @click="updateCart(item.book, item.quantity - 1)"
            ></i>
            <span class="quantity" style="font-weight: 500; font-size: 20px">{{
              item.quantity
            }}</span>
            <i
              @click="updateCart(item.book, item.quantity + 1)"
              class="fa fa-plus-square"
              style="
                font-size: 20px;
                margin-left: 5px;
                cursor: pointer;
                color: var(--primary-color-dark);
              "
            ></i>
            <!--            </button>-->
          </div>
          <div
            class="cart-book-subtotal"
            style="font-size: 20px; font-weight: 500"
          >
            {{ asDollarsAndCents(cartStore.cart.subtotal) }}
            <!--            {{ // shoppingCart.subtotal }}-->
          </div>
        </li>
        <li class="line-sep"></li>
      </template>
    </ul>
  </div>
  <div v-else>Your book cart is empty.</div>
  <div
    style="
      display: flex;
      flex-direction: column;
      width: auto;
      justify-content: space-between;
    "
  >
    <div
      style="
        position: relative;
        margin: 1em;
        padding-bottom: 15px;
        padding-right: 15px;
      "
    >
      <p
        style="
          position: absolute;
          right: 0;
          color: var(--secondary-background-color);
          font-size: 20px;
          font-weight: bold;
          margin-right: 9.5em;
          margin-bottom: 1em;
        "
      >
        SubTotal
        {{ asDollarsAndCents(cartStore.cart.subtotal) }}
      </p>
    </div>
    <div
      style="
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-bottom: 1em;
      "
    >
      <router-link :to="'/category/' + cartStore.selectedCategoryName"
        ><button class="button-continue">Continue Shopping</button></router-link
      >

      <router-link to="/checkout"
        ><button
          class="button"
          style="
            background-color: var(--secondary-background-color);
            color: white;
            font-size: 20px;
            font-weight: 500;
            border-radius: 4px;
          "
        >
          Checkout
        </button></router-link
      >
    </div>
  </div>
</template>
