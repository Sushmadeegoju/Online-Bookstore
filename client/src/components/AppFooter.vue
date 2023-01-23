<script setup lang="ts"></script>

<style scoped>
footer {
  background: var(--secondary-background-color);
  display: flex;
  gap: 1em;
}

.footer-container {
  flex-direction: column;
  justify-content: center;
}

.row-div {
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.col-div {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.signup {
  margin-top: 5px;
  font-weight: bold;
  border-radius: 8px;
  font-family: var(--title-font-family);
  color: var(--secondary-background-color);
  margin-bottom: 5px;
}

a,
.links {
  display: flex;
  flex-direction: row;
  color: white;
  justify-content: center;
  text-align: center;
  padding: 2px;
  gap: 0.25em;
  font-size: 20px;
  text-decoration: none;
}

a:hover {
  color: blue;
}

.address {
  display: flex;
  flex-direction: column;
  padding: 1px;
  width: 150px;
  height: auto;
}

.social-media-icons {
  margin-top: 2px;
  display: flex;
  flex-direction: row;
  color: white;
  justify-content: center;
  text-align: center;
  padding: 5px;
  margin-right: 15px;
  gap: 0.25em;
  font-size: 24px;
}

.copyright-text {
  height: 25px;
  width: 100%;
  font-size: 16px;
  align-items: center;
  text-align: center;
  background-color: var(--neutral-color);
  color: var(--secondary-background-color);
  font-weight: 600;
  padding: 1px;
}
</style>

<template>
  <footer class="footer-container">
    <section class="row-div">
      <section class="social-media-icons">
        <a href="#" class="fa fa-facebook"></a>
        <a href="#" class="fa fa-twitter"></a>
        <a href="#" class="fa fa-linkedin"></a>
        <a href="#" class="fa fa-instagram"></a>
      </section>
      <section class="col-div">
        <section>
          <div class="button signup">Signup for our Newsletter</div>
        </section>

        <section class="links">
          <router-link to="/"><a>About</a></router-link
          >| <router-link to="/">Contact</router-link>|
          <router-link to="/">Directions</router-link>|
          <router-link to="/">Terms</router-link>
        </section>
      </section>
      <section class="address">
        <div style="font-size: 20px">Hethwood, Blacksburg, VA, 24060</div>
      </section>
    </section>
    <section class="copyright-text">
      <p>&copy; The Book Garden 2022</p>
    </section>
  </footer>
</template>
