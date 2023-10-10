export default class localStorageHelper {
  //получение из LS
  static getLocalStorage(idLS) {
    if (localStorage.getItem(idLS)) {
      return JSON.parse(localStorage.getItem(idLS))
    }

    return null
  }
  //перезапись LS
  static setLocalStorage(idLS, data) {
    localStorage.setItem(idLS, JSON.stringify(data))
  }
  //обновить конкретный элемент
  static updateCurrentElem(idLS, curElem) {
    const initialData = this.getLocalStorage(idLS)
    if (initialData.find((elem) => elem.id === +curElem.id)) {
      const newData = initialData.filter((elem) => elem.id !== curElem.id)
      newData.push(curElem)
      localStorageHelper.setLocalStorage(idLS, newData)
    } else {
      initialData.push(curElem)
      localStorageHelper.setLocalStorage(idLS, initialData)
    }
  }
  //удалить конкретный элемент
  static deleteCurrentElem(idLS, curElemId) {
    const initialData = this.getLocalStorage(idLS).filter((elem) => elem.id !== curElemId)
    this.setLocalStorage(idLS, initialData)
  }
}
