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
        <div class="header_add__title">Добавить контакт</div>
      </div>
    </i-header>
    <div class="form__container">
      <div class="form__title">Новый контакт</div>
      <form class="form">
        <i-input
          label="Имя"
          placeholder="Например «Андрей»..."
          class="form__input"
          :errors="v$.name.$errors"
          v-model="newPerson.name"
        />
        <i-input
          label="Телефон"
          v-maska:[options]
          placeholder="+7(___)-___-__-__"
          class="form__input"
          :errors="computedPhoneErrors"
          v-model="newPerson.phone"
        />
        <i-input
          label="Email"
          placeholder="Например «pochta@domain.ru»..."
          class="form__input"
          :errors="v$.email.$errors"
          v-model="newPerson.email"
        />
        <i-drop-down
          menu-title="Не выбрано"
          label="Категория"
          :options="dropDownOptions"
          :errors="v$.category.$errors"
          v-model="newPerson.category"
        />
        <div class="btn__container">
          <i-button
            radius="4px"
            color="#545454"
            back-ground="#FFC700"
            border="1px solid #FFC700"
            @click="saveNewPerson"
          >
            <template #default>Сохранить</template>
            <template #icon
              ><svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 1.33333C0 0.596954 0.596954 0 1.33333 0H9.05719C9.41081 0 9.74995 0.140476 10 0.390524L11.8047 2.19526C11.9298 2.32029 12 2.48986 12 2.66667V10.6667C12 11.403 11.403 12 10.6667 12H1.33333C0.596954 12 0 11.403 0 10.6667V1.33333ZM4 10.6667H8V6.66667H4V10.6667ZM9.33333 10.6667H10.6667V2.94281L9.33333 1.60948V2.66667C9.33333 3.40305 8.73638 4 8 4H4C3.26362 4 2.66667 3.40305 2.66667 2.66667V1.33333H1.33333V10.6667H2.66667V6.66667C2.66667 5.93029 3.26362 5.33333 4 5.33333H8C8.73638 5.33333 9.33333 5.93029 9.33333 6.66667V10.6667ZM4 1.33333V2.66667H8V1.33333H4Z"
                  fill="#545454"
                />
              </svg>
            </template>
          </i-button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import iHeader from '@/components/iHeader.vue'
import iInput from '@/components/UI/iInput.vue'
import iDropDown from '@/components/UI/iDropDown.vue'
import iButton from '@/components/UI/iButton.vue'
import PERSON from '@/models/person.js'
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  person: {
    type: Object,
    required: false,
    default: () => {}
  }
})

import { useAppStore } from '@/stores/appStore.js'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
const store = useAppStore()
const router = useRouter()
import { storeToRefs } from 'pinia'
import { vMaska } from 'maska'
const { currentPersonId, maxContactID } = storeToRefs(store)
const { getCurrentElem, updateLocalStorage } = store
const currentPerson = ref(null)
const newPerson = reactive(PERSON.createFromData())
const phoneCompleted = reactive([{ value: false, $message: 'Некорретный номер телефона' }])
const options = reactive({
  mask: '+#(###)-###-##-##',
  onMaska: (detail) => (phoneCompleted[0].value = detail.completed),
  eager: true
})
const computedPhoneErrors = ref([])
function init() {
  if (router.currentRoute.value.query.id) {
    currentPersonId.value = router.currentRoute.value.query.id
    newPerson.value = getCurrentElem('contacts', currentPersonId.value)
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
const dropDownOptions = ref([
  { value: 'family', label: 'Родственники' },
  { value: 'job', label: 'Коллеги' }
])
const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage('Поле не может быть пустым', required),
      minLength: helpers.withMessage('Слишком короткое имя', minLength(3))
    },

    phone: { required: helpers.withMessage('Поле не может быть пустым', required) }, // Matches state.lastName
    email: {
      email: helpers.withMessage('Некорректный email', email),
      required: helpers.withMessage('Поле не может быть пустым', required)
    },
    category: { required: helpers.withMessage('Поле не может быть пустым', required) }
  }
})

const v$ = useVuelidate(rules, newPerson)

function saveNewPerson() {
  v$.value.$validate()

  if (v$.value.phone.$errors.length !== 0) {
    computedPhoneErrors.value = v$.value.phone.$errors
  } else if (phoneCompleted[0].value === false) {
    computedPhoneErrors.value = phoneCompleted
  } else{
     computedPhoneErrors.value = []
  }

const formatter = new Intl.DateTimeFormat('ru-RU')
  if (!v$.value.$error && phoneCompleted[0].value) {
    newPerson.date=formatter.format(new Date(Date.now()))
    updateLocalStorage('contacts', newPerson)
    router.push('/')
  }
}
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
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
.form__container {
  margin-top: 25px;
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
.header_add__title {
  font-weight: bold;
  font-size: 16px;
  color: #ddd;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.form__title {
  font-weight: bold;
  color: $darkGray;
  font-size: 32px;
  margin-bottom: 24px;
}
.form__input {
  margin-bottom: 8px;
}
.btn__container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
}
</style>
