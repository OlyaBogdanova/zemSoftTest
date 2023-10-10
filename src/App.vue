<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
@font-face {
  font-family: 'Proxima Nova';
  src:
    url('@/assets/fonts/ProximaNova/proximanova_regular.woff') format('woff'),
    url('@/assets/fonts/ProximaNova/proximanova_regular.woff2') format('woff2'),
    url('@/assets/fonts/ProximaNova/proximanova_bold.woff') format('woff'),
    url('@/assets/fonts/ProximaNova/proximanova_bold.woff2') format('woff2');
}
body {
  font-family: 'Proxima Nova', sans-serif;
  font-weight: 400;
}
</style>
