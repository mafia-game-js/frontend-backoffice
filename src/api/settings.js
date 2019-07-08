import { host } from './config'
import fetch from './fetch'

export default {
  get: () => fetch.get(host + '/setting/get'),
  update: settings => fetch.post(host + '/setting/update', null, settings)
}
