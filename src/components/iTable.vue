<template>
  <table class="myTable">
    <thead>
      <tr>
        <th
          v-for="(col, index) in columns"
          :key="col.title"
          :style="[
            index !== columns.length - 1 ? { 'text-align': 'left' } : { 'text-align': 'right' }
          ]"
        >
          {{ col.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, ind) in rows" :key="row" @click="openEditForm(row.id)">
        <td
          v-for="(col, index) in columns"
          :key="index"
          :class="{ withoutBorder: ind === rows.length - 1 }"
          :style="[
            index !== columns.length - 1 ? { 'text-align': 'left' } : { 'text-align': 'right' }
          ]"
        >
          <template v-if="!slots.includes(col.field)">
            {{ row[col.field] }}
          </template>
          <template v-else>
            <slot :name="col.field" v-bind="row"></slot>
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore.js'
const store = useAppStore()
const router = useRouter()
import { storeToRefs } from 'pinia'
const { currentPersonId } = storeToRefs(store)

defineProps({
  columns: {
    type: Array,
    required: true
  },
  rows: {
    type: Array,
    required: true
  },
  slots: {
    type: Array,
    required: false,
    default: () => []
  }
})

function openEditForm(id) {
  currentPersonId.value = id
  setTimeout(() => {
    router.push({ name: 'add', query: { id: currentPersonId.value } })
  }, 0)
}
</script>
<style lang="scss" scoped>
@import '@/assets/variables.scss';
.myTable {
  color: $darkGray;
  width: 100%;

  th,
  td {
    height: 48px;
  }
  th {
    color: $grayText;
    font-weight: 400;
  }
  td {
    color: $darkGray;
    border-bottom: 1px solid $lightBlue;
    &.withoutBorder {
      border-bottom: none;
    }
  }

  tr {
    border-style: solid;
    border-width: 1px;
  }
}
</style>
