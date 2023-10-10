<template>
  <table class="myTable">
    <thead>
      <tr>
        <th
          v-for="(col, index) in columns"
          :key="col.title"
          :style="[
            index === 0
              ? { 'text-align': 'left' }
              : index === columns.length - 1
              ? { 'text-align': 'right' }
              : { 'text-align': 'center' }
          ]"
        >
          {{ col.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, ind) in rows" :key="row">
        <td
          v-for="(col, index) in columns"
          :key="index"
          :class="{ withoutBorder: ind === rows.length - 1 }"
          :style="[
            index === 0
              ? { 'text-align': 'left' }
              : index === columns.length - 1
              ? { 'text-align': 'right' }
              : { 'text-align': 'center' }
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
