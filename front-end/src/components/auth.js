import { BehaviorSubject } from 'rxjs'
import axios from 'axios'
import { requestOptions } from '../_helpers'
import router from '../router'
import {useToast} from 'vue-toastification'
import i18n from '../i18n'

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')))
const toast = useToast()

export const authService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() { return currentUserSubject.value }
}

async function login(username, password, cb) {
  const response = await axios.post(`${process.env.VUE_APP_API}/auth/login`, { username, password }, { 'Content-Type': 'application/json' })
  let user = {
    uid: response.data.uid,
    token: response.data.token,
    language: response.data.language
  }
  localStorage.setItem('currentUser', JSON.stringify(user))
  currentUserSubject.next(user)
  return user
}

function logoutProcess() {
  localStorage.removeItem('currentUser')
  currentUserSubject.next(null)
  router.push('/login')
  toast.warning(i18n.global.t('logout'))

}

function logout() {
  // remove user from locastorage to log user out
  axios.get(`${process.env.VUE_APP_API}/auth/logout`, requestOptions.get())
    .then(response => {
      console.log('its ok')
      logoutProcess()
    })
    .catch(err => {
      console.log({message: err.message})
      logoutProcess()
    })

}