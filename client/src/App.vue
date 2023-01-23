<script setup lang="ts">
import AppFetchCategories from "@/components/AppFetchCategories.vue";
</script>
<style></style>

<template>
  <div id="app">
    <Suspense>
      <AppFetchCategories></AppFetchCategories>
    </Suspense>
  </div>
</template>
