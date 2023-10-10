<template>
  <div class="container">
    <i-header>
      <div class="header_add">
        <svg
          class="header_add__icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 4C7.79086 4 6 5.79086 6 8C6 10.2091 7.79086 12 10 12C12.2091 12 14 10.2091 14 8C14 5.79086 12.2091 4 10 4ZM4 8C4 4.68629 6.68629 2 10 2C13.3137 2 16 4.68629 16 8C16 11.3137 13.3137 14 10 14C6.68629 14 4 11.3137 4 8ZM19 11C19.5523 11 20 11.4477 20 12V13H21C21.5523 13 22 13.4477 22 14C22 14.5523 21.5523 15 21 15H20V16C20 16.5523 19.5523 17 19 17C18.4477 17 18 16.5523 18 16V15H17C16.4477 15 16 14.5523 16 14C16 13.4477 16.4477 13 17 13H18V12C18 11.4477 18.4477 11 19 11ZM6.5 18C5.24054 18 4 19.2135 4 21C4 21.5523 3.55228 22 3 22C2.44772 22 2 21.5523 2 21C2 18.3682 3.89347 16 6.5 16H13.5C16.1065 16 18 18.3682 18 21C18 21.5523 17.5523 22 17 22C16.4477 22 16 21.5523 16 21C16 19.2135 14.7595 18 13.5 18H6.5Z"
            fill="#DDDDDD"
          />
        </svg>
        <div class="header_add__tile">Добавить контакт</div>
      </div>
    </i-header>
    <div class="form__container">
        <div class="form__title">Новый контакт</div>
        <form  class="form">
            <i-input label="Имя" placeholder="Например «Андрей»..."/>
        </form>

    </div>
  </div>
</template>
<script setup>
import iHeader from '@/components/iHeader.vue'
import iInput from '@/components/UI/iInput.vue'
import PERSON from '@/models/person.js'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  person: {
    type: Object,
    required: false,
    default: () => {}
  }
})
import { useAppStore } from '@/stores/appStore.js'
const store = useAppStore()
const router = useRouter()
import { storeToRefs } from 'pinia'
const { currentPersonId, maxContactID } = storeToRefs(store)
const { getCurrentElem } = store
const currentPerson = ref(null)
const newPerson = reactive(PERSON.createFromData())
function init() {
  if (router.currentRoute.value.query.id) {
    currentPersonId.value = router.currentRoute.value.query.id
    newPerson.value = getCurrentElem('person', currentPersonId.value)
    newPerson.id = currentPersonId.value
    for (const key in newPerson) {
      if (newPerson.value[key]) {
        newPerson[key] = currentPerson.value[key]
      }
    }
  } else {
    newPerson.id = maxContactID.value + 1
  }
}
init()
</script>
<style lang="scss" scoped>
@import '@/assets/variables.scss';
.container {
  width: 100vw;
  height: 100vh;
  background-color: $lightBlue;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

}
.form__container{
      padding: 48px 64px;
  background-color: #fff;
  width: 704px;
}
.header_add {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header_add__icon {
  margin-right: 8px;
}
.header_add__tile {
  font-weight: bold;
  font-size: 16px;
  color: #ddd;
}
</style>
