import { ref } from 'vue'
import { defineStore } from 'pinia'
import { initialContacts } from './initialData'
import localStorageHelper from '@/utilites/localStorage.js'
export const useAppStore = defineStore('appStore', () => {
  const contactsList = ref([])
  const maxContactID = ref(0)
  function getLocalStorageData() {
    const contactsListLS = localStorageHelper.getLocalStorage('contacts')

    if (contactsListLS) {
      contactsList.value = contactsListLS
    } else {
      contactsList.value = initialContacts
      localStorageHelper.setLocalStorage('contacts', initialContacts)
    }

    maxContactID.value = contactsList.value.length
      ? contactsList.value.sort((a, b) => b.id - a.id)[0].id
      : 0
  }
  getLocalStorageData()
  const currentPersonId=ref(null)
  
  function getCurrentElem(idLS, idElem) {
    const initialData = localStorageHelper.getLocalStorage(idLS)
    const currentElem = initialData.find((elem) => elem.id === +idElem)
    return currentElem
  }

  return { contactsList, currentPersonId, getCurrentElem, maxContactID }
})
