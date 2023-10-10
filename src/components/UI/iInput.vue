<template>
  <div class="input__group" :class="{ error: error }">
    <label v-if="label" :for="id" class="input__label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      class="input__input"
      :style="computedInputStyles"
      @input="$emit('input')"
    />
    <svg
      v-if="error"
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
  </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  label: {
    type: String,
    required: false,
    default: ''
  },
  id: {
    type: String,
    required: false,
    default: ''
  },
  type: {
    type: String,
    required: false,
    default: 'text'
  },
  placeholder: {
    type: String,
    required: false,
    default: ''
  },
  error: {
    type: Boolean,
    required: false,
    default: false
  }
})
const computedInputStyles = computed(() => (props.label ? 'width:70%' : 'width:100%'))
</script>
<style lang="scss" scoped>
@import '@/assets/variables.scss';
.input__group {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  &.error {
    .input__input {
      border-color: $red;
      &::placeholder {
        color: $red;
      }
    }
    .input__icon {
      display: flex;
      position: absolute;
      top: 50%;
      right: 5px;
      transform: translateY(-50%);
    }
  }
}
.input__label {
  width: 30%;
}
.input__icon {
  display: none;
}
.input__input {
  background-color: #fff;
  border: 1px solid #dddd;
  color: $darkGray;
  border-radius: 4px;
  font-family: inherit;
  padding: 11px 10px;
  font-size: 14px;
  font-weight: 400;
  &::placeholder {
    color: $middleGray;
  }
  &:focus,
  &:hover {
    border-color: $darkBlue;
  }
  &.error {
    border-color: $red;
    &::placeholder {
      color: $red;
    }
  }
}
</style>
