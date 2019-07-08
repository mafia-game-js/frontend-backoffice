import store from 'store'

export default {
  items: {
    AUTH: 'auth'
  },
  get: key => store.get(key),
  set: (key, val) => store.set(key, val),
  remove: key => store.remove(key)
}
