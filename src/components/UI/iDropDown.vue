<template>
  <section class="dropDown__wrapper">
    <button class="dropDown__button" ref="menu" @click="openClose">
      {{ dropDownValue || menuTitle }}
      <svg
        class="dropDown__icon"
        :class="{ open: isOpen }"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11.3307 6.66797L7.9974 10.668L4.66406 6.66797H11.3307Z" fill="#A9A9A9" />
      </svg>
    </button>

    <section class="dropDown__menu" v-if="isOpen">
      <div class="dropDown__bar_wrapper">
        <div
          class="dropDown__bar"
          v-for="option in options"
          :key="option"
          @click="handleCLick(option)"
        >
          {{ option }}
        </div>
      </div>
    </section>
  </section>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
  menuTitle: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  checked: {
    type: String,
    required: false
  }
})
const menu = ref(null)
const isOpen = ref(null)
const dropDownValue = ref(null)
function openClose() {
  isOpen.value = !isOpen.value
}
dropDownValue.value = props.checked ? props.checked : props.options[0]
function handleCLick(option) {
  dropDownValue.value = option
  isOpen.value = false
}
</script>
<style lang="scss" scoped>
@import '@/assets/variables.scss';
.dropDown__wrapper {
  position: relative;
  height: 40px;
  border-radius: 4px;
  background: white;
  border: 1px solid #ddd;
  font-family: inherit;
  width: 235px;

  .dropDown__button {
    font-size: inherit;
    background: none;
    outline: none;
    border-radius: 4px;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    padding: 12px 70px 12px 10px;
    margin: 0;
    line-height: 1;
    width: 100%;
    height: 100%;
    z-index: 2;
    cursor: pointer;
    .dropDown__icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      transition: all 0.3s ease;
      &.open {
        transform: translateY(-50%) rotate(180deg);
      }
    }
  }

  .dropDown__bar_wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 10;

    .dropDown__bar {
      width: 100%;
      padding: 15px;
      min-height: 40px;
      cursor: pointer;
      display: flex;
      align-items: center;
      &:hover {
        background-color: $lightBlue;
      }
    }
  }

  .dropDown__menu {
    position: absolute;
    top: 100%;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #eee;
    background: white;
    animation: menu 0.3s ease forwards;
  }

  @keyframes menu {
    from {
      transform: translate3d(0, 30px, 0);
    }
    to {
      transform: translate3d(0, 10px, 0);
    }
  }
}
</style>
