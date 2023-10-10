<template>
  <figure
    class="avatar"
    :data-initial="computedInitial"
    :style="{ 'background-color': color }"
  ></figure>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  initial: {
    type: String,
    required: false,
    default: ''
  },
  color: {
    type: String,
    required: false,
    default: '#fff'
  }
})

const computedInitial = computed(() => {
  return props.initial.length > 2
    ? props.initial.substring(0, 1).toUpperCase()
    : props.initial.toUpperCase()
})
</script>
<style lang="scss" scoped>
@import '@/assets/variables.scss';
.avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  position: relative;
  z-index: -1;
  &[data-initial]:before {
    color: $darkGray;
    content: attr(data-initial);
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    font-weight: 700;
    font-size: 12px;
    line-height: calc(14.62 / 12 * 100%);
  }
}
</style>
