export default class PERSON {
    static createFromData(data = {}) {
      return {
        id: data.id || 0,
        name: data.name || '',
        phone: data.phone || '',
        email: data.email || '',
        date: data.date || ''
      }
    }
  }
  