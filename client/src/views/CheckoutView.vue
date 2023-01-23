<script setup lang="ts">
import { reactive, Ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { helpers, maxLength, minLength, required } from "@vuelidate/validators";
import { isMobilePhone, isCreditCard, isEmailValid } from "@/utils";
import { useCartStore } from "@/stores/CartStore";
import { asDollarsAndCents } from "@/main";
import router from "@/router";
const cartStore = useCartStore();
const cart = cartStore.cart;
// import { isCreditCard, isMobilePhone } from "@/utils";
// import CheckoutFieldError from "@/components/CheckoutFieldError.vue";

const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const form = reactive({
  name: "",
  address: "",
  phone: "",
  email: "",
  ccNumber: "",
  ccExpiryMonth: new Date().getMonth() + 1,
  ccExpiryYear: new Date().getFullYear(),
  checkoutStatus: "",
});

const rules = {
  name: {
    required: helpers.withMessage("Please provide a name.", required),
    minLength: helpers.withMessage(
      "Name must have at least 4 letters.",
      minLength(4)
    ),
    maxLength: helpers.withMessage(
      "Name can have at most 45 letters.",
      maxLength(45)
    ),
  },
  address: {
    required: helpers.withMessage("Please provide a valid address.", required),
    minLength: helpers.withMessage(
      "Address must have atleast 4 characters.",
      minLength(4)
    ),
    maxLength: helpers.withMessage(
      "Please provide a valid address.",
      maxLength(45)
    ),
  },
  phone: {
    required: helpers.withMessage(
      "Please enter a valid phone number.",
      required
    ),
    phone: helpers.withMessage(
      "Please provide a valid phone number",
      isMobilePhone
    ),
  },
  ccNumber: {
    required: helpers.withMessage(
      "Please enter a valid credit card number",
      required
    ),
    ccNumber: helpers.withMessage(
      "Please enter a valid credit card number",
      isCreditCard
    ),
  },
  ccExpiryMonth: {},
  ccExpiryYear: {},
  email: {
    required: helpers.withMessage("Please enter a valid email id", required),
    ccNumber: helpers.withMessage(
      "Please enter a valid email id",
      isEmailValid
    ),
  },
  //   TODO: Add more validations for these and other fields that need more validation.
};
const $v = useVuelidate(rules, form);

// async function submitOrder() {
//   console.log("Submit order");
//   const isFormCorrect = await $v.value.$validate();
//   if (!isFormCorrect) return;
// }

async function submitOrder() {
  console.log("Submit order");
  const isFormCorrect = await $v.value.$validate();
  if (!isFormCorrect) {
    form.checkoutStatus = "ERROR";
  } else {
    form.checkoutStatus = "PENDING";
    await cartStore
      .placeOrder({
        name: form.name,
        address: form.address,
        phone: form.phone,
        email: form.email,
        ccNumber: form.ccNumber,
        ccExpiryMonth: form.ccExpiryMonth,
        ccExpiryYear: form.ccExpiryYear,
      })
      .then(() => {
        form.checkoutStatus = "OK";
        router.push({ name: "confirmation-view" });
      })
      .catch((reason) => {
        form.checkoutStatus = "SERVER_ERROR";
        console.log("Error placing order", reason);
      });
  }
}
/* NOTE: For example yearFrom(0) == <current_year> */
function yearFrom(index: number) {
  return new Date().getFullYear() + index;
}
</script>

<style scoped>
/* TODO: Adapt these styles to your page */
.checkout-page {
  background: var(--neutral-color);
  color: black;
}
.checkout-page-body {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  text-align: right;
  padding: 1em;
}

.completePurchase {
  background-color: var(--primary-color-dark);
  color: white;
  width: 200px;
  margin-left: 150px;
}
.completePurchase:hover {
  background-color: black;
}

form {
  display: flex;
  flex-direction: column;
}

form > div {
  display: flex;
  flex-direction: column;
}
form > div > div {
  display: flex;
  justify-content: flex-end;
  /*flex-direction: column;*/
  margin-bottom: 1em;
}
form > div > div > label {
  margin-right: 0.5em;
  color: black;
  font-size: 20px;
  font-weight: 500;
}
form > div > div > input,
form > div > div > select {
  background-color: var(--card-background-color);
  margin-left: 0.3em;
  color: black;
  font-size: 20px;
}

form > p {
  color: var(--secondary-background-color);
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 0.2em;
}

.error {
  color: red;
  text-align: right;
  margin-bottom: 1em;
  margin-top: -0.5em;
}

.checkoutStatusBox {
  margin: 1em;
  padding: 1em;
  text-align: center;
}
</style>

<template>
  <div class="checkout-page">
    <!-- TODO: Add an HTML section to display when checking out with an empty cart -->

    <section class="checkout-page-body" v-if="!cart.empty">
      <form style="text-align: right" @submit.prevent="submitOrder">
        <div>
          <div>
            <label for="name">Name</label>
            <input
              type="text"
              size="30"
              id="name"
              name="name"
              v-model.lazy="$v.name.$model"
            />
          </div>
          <template v-if="$v.name.$error">
            <span
              class="error"
              v-for="error of $v.name.$errors"
              :key="error.$uid"
              >{{ error.$message }}</span
            >
          </template>
        </div>
        <!-- TODO: Add address input and validation messages -->
        <div>
          <div>
            <label for="name">Address</label>
            <input
              type="text"
              size="30"
              id="address"
              name="address"
              v-model.lazy="$v.address.$model"
            />
          </div>
          <template v-if="$v.address.$error">
            <span
              class="error"
              v-for="error of $v.address.$errors"
              :key="error.$uid"
              >{{ error.$message }}</span
            >
          </template>
        </div>

        <div>
          <div>
            <label for="phone">Phone</label>
            <input
              class="textField"
              type="text"
              size="30"
              id="phone"
              name="phone"
              v-model.lazy="$v.phone.$model"
            />
          </div>
          <template v-if="$v.phone.$error">
            <span
              class="error"
              v-for="error of $v.phone.$errors.slice(0, 1)"
              :key="error.$uid"
              >{{ error.$message }}</span
            >
          </template>
        </div>
        <!-- TODO: Add phone validation message(s) -->

        <div>
          <div>
            <label for="email">Email</label>
            <input
              type="text"
              size="30"
              id="email"
              name="email"
              v-model.lazy="$v.email.$model"
            />
          </div>
          <template v-if="$v.email.$error">
            <span
              class="error"
              v-for="error of $v.email.$errors.slice(0, 1)"
              :key="error.$uid"
              >{{ error.$message }}</span
            >
          </template>
        </div>
        <!-- TODO: Add email validation message(s) -->

        <div>
          <div>
            <label for="ccNumber">Credit card</label>
            <input
              type="text"
              size="30"
              id="ccNumber"
              name="ccNumber"
              v-model.lazy="$v.ccNumber.$model"
            />
          </div>
          <template v-if="$v.ccNumber.$error">
            <span
              class="error"
              v-for="error of $v.ccNumber.$errors.slice(0, 1)"
              :key="error.$uid"
              >{{ error.$message }}</span
            >
          </template>
        </div>
        <!-- TODO: Add credit card validation message(s) -->
        <div>
          <div>
            <label style="color: black; font-size: 20px; margin-right: 0.3em"
              >Expiry</label
            >
            <!--            <select v-model="$v.ccExpiryMonth" style="color: black">-->
            <!--              <option-->
            <!--                v-for="(month, index) in months"-->
            <!--                :key="index"-->
            <!--                :value="index + 1"-->
            <!--              >-->
            <!--                {{ month }} ({{ index + 1 }})-->
            <!--              </option>-->
            <!--            </select>-->
            <select v-model.lazy="$v.ccExpiryMonth.$model">
              <option
                v-for="(month, index) in months"
                :key="index"
                :value="index + 1"
              >
                {{ month }} ({{ index + 1 }})
              </option>
            </select>
            <select v-model.lazy="$v.ccExpiryYear.$model">
              <option :key="0" :value="yearFrom(0)">{{ yearFrom(0) }}</option>
              <option
                :value="yearFrom(year_next)"
                v-for="year_next in 15"
                :key="year_next"
              >
                {{ yearFrom(year_next) }}
              </option>
              <!-- TODO: Complete this select tag for 'ccExpiryYear'. -->
            </select>
            <!--            <select style="color: black">-->
            <!--              &lt;!&ndash; TODO: Complete this select tag for 'ccExpiryYear'. &ndash;&gt;-->
            <!--              <option value=""></option>-->
            <!--              <option value="20">2022</option>-->
            <!--              <option value="20" v-for="year_next in 15" :key="year_next">-->
            <!--                {{ yearFrom(year_next) }}-->
            <!--              </option>-->
            <!--            </select>-->
          </div>
        </div>
        <p>
          SubTotal
          {{ asDollarsAndCents(cart.subtotal) }}
        </p>
        <p>
          SurCharge
          {{ asDollarsAndCents(cart.surcharge) }}
        </p>
        <p>
          Total
          {{ asDollarsAndCents(cart.total) }}
        </p>
        <!-- TODO (style): Use a single label for both month and date and put the on the same line. -->
        <!-- TODO (style): For example: Exp Date {Month} {Year}, with space between month/year selectors. -->
        <!--        <router-link to="/confirmation">-->
        <input
          type="submit"
          name="submit"
          class="button completePurchase"
          @click="submitOrder()"
          :disabled="form.checkoutStatus === 'PENDING'"
          value="Complete Purchase"
        />
        <!--        </router-link>-->

        <!-- TODO (style): The submit button should not take up the entire width of the form. -->
        <!-- TODO (style): The submit button should be styled consistent with your own site. -->
      </form>
      <!-- TODO (style): Fix error message placement so they nearer to the correct fields. -->
      <!-- TODO (style): HINT: Use another <div> and label, input, and error, and use flexbox to style. -->

      <!-- TODO: Display the cart total, subtotal and surcharge. -->

      <section v-show="form.checkoutStatus !== ''" class="checkoutStatusBox">
        <div v-if="form.checkoutStatus === 'ERROR'">
          Error: Please fix the problems above and try again.
        </div>

        <div v-else-if="form.checkoutStatus === 'PENDING'">Processing...</div>

        <div v-else-if="form.checkoutStatus === 'OK'">Order placed...</div>

        <div v-else>An unexpected error occurred, please try again.</div>
      </section>
    </section>
    <section class="checkout-page-body" v-else>
      <p>Your Cart is empty. Continue Shopping!!!</p>
      <router-link :to="'/category/' + cartStore.selectedCategoryName"
        ><button class="button-continue">Continue Shopping</button></router-link
      >
    </section>
  </div>
</template>
