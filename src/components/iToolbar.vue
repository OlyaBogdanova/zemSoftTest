<template>
  <div class="toolbar__container">
    <div class="toolbar__bg"></div>
    <div class="toolbar">
      <i-drop-down :options="options" />
      <i-button border="1px solid #2F80ED" color="#2F80ED" radius="28px" @click="$router.push('/add')">
        <template #icon>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.99984 2.66699C8.36803 2.66699 8.6665 2.96547 8.6665 3.33366V7.33366H12.6665C13.0347 7.33366 13.3332 7.63214 13.3332 8.00033C13.3332 8.36852 13.0347 8.667 12.6665 8.667H8.6665V12.667C8.6665 13.0352 8.36803 13.3337 7.99984 13.3337C7.63165 13.3337 7.33317 13.0352 7.33317 12.667V8.667H3.33317C2.96498 8.667 2.6665 8.36852 2.6665 8.00033C2.6665 7.63214 2.96498 7.33366 3.33317 7.33366H7.33317V3.33366C7.33317 2.96547 7.63165 2.66699 7.99984 2.66699Z"
              fill="#2F80ED"
            />
          </svg>
        </template>
        <template #default>Добавить контакт</template>
      </i-button>
    </div>
  </div>
</template>
<script setup>
import iDropDown from '@/components/UI/iDropDown.vue'
import iButton from '@/components/UI/iButton.vue'
import { ref } from 'vue'
const options = ref(['Все', 'Родственники', 'Коллеги'])
</script>
<style lang="scss" scoped>
@import '@/assets/variables.scss';
.toolbar__container {
  width: 100%;
  height: 56px;
}
.toolbar__bg {
  position: absolute;
  width: 100vw;
  top: 64px;
  left: 0;
  height: 56px;
  border-bottom: 1px solid $lightBlue;
  border-top: 1px solid $lightBlue;
  background-color: #f9fcff;
  z-index: -1;
}
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
</style>
