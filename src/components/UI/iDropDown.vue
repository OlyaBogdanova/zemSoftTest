<template>
  <section class="dropDown" :style="{width:width}">
    <div v-if="label" class="dropDown__label">{{ label }}</div>
    <div class="dropDown__wrapper" :class="{ error: errors.length }">
      <div style="position: relative; height:calc(100% + 16px); padding-bottom:16px">
        <button
          class="dropDown__button"
          :class="{ noValue: dropDownValue === menuTitle, error: errors.length }"
          ref="menu"
          @click.prevent="openClose"
        >
          {{ dropDownValue || menuTitle }}
          <svg
            v-if="!errors.length"
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
          <svg
            v-else
            class="input__icon"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.0026 14.6654C4.32071 14.6654 1.33594 11.6806 1.33594 7.9987C1.33594 4.3168 4.32071 1.33203 8.0026 1.33203C11.6845 1.33203 14.6693 4.3168 14.6693 7.9987C14.6652 11.6789 11.6828 14.6613 8.0026 14.6654ZM8.0026 9.9987C7.63441 9.9987 7.33594 10.2972 7.33594 10.6654C7.33594 11.0336 7.63441 11.332 8.0026 11.332C8.37079 11.332 8.66927 11.0336 8.66927 10.6654C8.66927 10.2972 8.37079 9.9987 8.0026 9.9987ZM8.0026 4.66536C7.63441 4.66536 7.33594 4.96384 7.33594 5.33203V7.9987C7.33594 8.36689 7.63441 8.66536 8.0026 8.66536C8.37079 8.66536 8.66927 8.36689 8.66927 7.9987V5.33203C8.66927 4.96384 8.37079 4.66536 8.0026 4.66536Z"
              fill="#EB5757"
            />
          </svg>
        </button>
        <small class="error__message" v-for="error in errors" :key="error">{{
          error.$message
        }}</small>
      </div>

      <section class="dropDown__menu" v-if="isOpen">
        <div class="dropDown__bar_wrapper">
          <div
            class="dropDown__bar"
            v-for="option in options"
            :key="option.value"
            @click.prevent="handleCLick(option)"
          >
            {{ option.label }}
          </div>
        </div>
      </section>
    </div>
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
  value: {
    type: [String, Number],
    required: false,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    required: false,
    default: ''
  },
  errors: {
    type: Array,
    required: false,
    default: () => []
  },
  width:{
      type: String,
    required: false,
    default: '100%'
  }
})
const emits = defineEmits(['update:modelValue'])
const menu = ref(null)
const isOpen = ref(false)
const dropDownValue = ref(null)
function openClose() {
  isOpen.value = !isOpen.value
}
dropDownValue.value = props.modelValue
  ? props.options.find(elem=>Object.values(elem).includes(props.modelValue)).label
  : props.menuTitle
  ? props.menuTitle
  : props.options[0].label
function handleCLick(option) {
  dropDownValue.value = option.label
  emits('update:modelValue', dropDownValue.value)
  isOpen.value = false
}
</script>
<style lang="scss" scoped>
@import '@/assets/variables.scss';
.dropDown {
  display: flex;
  align-items: center;
  .dropDown__wrapper {
    position: relative;

    height: 41px;
    border-radius: 4px;
    background: white;
    border: 1px solid #ddd;
    font-family: inherit;
    flex: 1;
    &.error {
      border-color: #eb5757;
    }
  }
  .dropDown__label {
    width: 30%;
  }
  .dropDown__button {
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
    height: calc(100% - 16px);
    z-index: 2;
    font-size: 14px;
    font-weight: 400;
    color: $darkGray;
    font-family: inherit;
    cursor: pointer;
    &.noValue {
      color: $middleGray;
    }
    &.error {
      color: #eb5757;
    }

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
.input__icon {
  display: flex;
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
}
.error__message {
  position: absolute;
  font-size: 10px;
  color: #eb5757;
  bottom: 0;
  right: 0;
}
</style>
