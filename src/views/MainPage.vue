<template>
  <div class="main__container">
    <i-header />
    <i-tool-bar />
    <i-table :columns="headers" :rows="computedData" :slots="slots">
      <template #name="props">
        <div class="name__wrapper">
          <i-avatar color="#FFC700" :initial="props.name" />
          <div class="name__name">{{ props.name }}</div>
        </div>
      </template>
    </i-table>
  </div>
</template>
<script setup>
import { ref, provide, computed } from 'vue'
import iTable from '@/components/iTable.vue'
import iToolBar from '@/components/iToolBar.vue'
import iHeader from '@/components/iHeader.vue'
import iAvatar from '@/components/iAvatar.vue'
import { useAppStore } from '@/stores/appStore.js'
import { storeToRefs } from 'pinia'
const store = useAppStore()
const { contactsList } = storeToRefs(store)
const headers = ref([
  { field: 'name', title: 'Контакт' },
  { field: 'phone', title: 'Телефон' },
  { field: 'email', title: 'Email' },
  { field: 'date', title: 'Создан' }
])
const currentSelect=ref('Все')
provide('currentSelect', currentSelect)
const computedData=computed(()=>{
  if(currentSelect.value==='Все'){
    return contactsList.value
  }
  return contactsList.value.filter(elem=>elem.category===currentSelect.value)
})
const slots = ref(['name'])
</script>
<style lang="scss" scoped>
.name__wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.name__name {
  margin-left: 8px;
}
.main__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
