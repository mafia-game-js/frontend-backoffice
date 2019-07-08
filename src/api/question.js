import { host } from './config'
import fetch from './fetch'

export default {
  list: () => fetch.get(host + '/question/list'),
  create: question => fetch.post(host + '/question/create', null, question),
  createAnswer: answer => fetch.post(host + '/answer/create', null, answer),
  update: question => fetch.post(host + '/question/update', null, question),
  updateAnswer: answer => fetch.post(host + '/answer/update', null, answer),
  delete: question => fetch.post(host + '/question/delete', null, question),
  deleteAnswer: answer => fetch.post(host + '/question/delete', null, answer)
}
