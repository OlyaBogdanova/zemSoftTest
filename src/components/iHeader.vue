<template>
  <div class="header__container">
    <div class="header__bg">
      <div class="logo__container">
        <slot> <i-logo-icon class="header__icon" /> <i-logo-title /></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
import iLogoIcon from '@/components/icons/iLogoIcon.vue'
import iLogoTitle from '@/components/icons/iLogoTitle.vue'
</script>
<style lang="scss" scoped>
@import '@/assets/variables.scss';
.header__container {
  width: 100%;
  height: 48px;
}
.header__bg {
  position: absolute;
  width: 100vw;
  top: 0px;
  left: 0;
  height: 48px;
  background-color: $dark;
  z-index: -1;
  padding: 0 50px;
}
.logo__container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
}
.header__icon {
  margin-right: 16px;
}
</style>
