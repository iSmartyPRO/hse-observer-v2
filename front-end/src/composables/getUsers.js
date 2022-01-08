import axios from "axios"
import { requestOptions, handleError } from "../_helpers"
import { ref } from '@vue/reactivity'

const getUsers = () => {
  const users = ref(new Object())
  const loadUsers = async () => {
    // Симуляция задержки загрузки
    await new Promise(resolve => {
      setTimeout(resolve, 1000)
    })
    axios
      .get(`${process.env.VUE_APP_API}/user`, requestOptions.headersData())
      .then((response) => {
        users.value = response.data.data.map((item) => {
          return {
            id: item._id,
            name: item.name,
            email: item.email,
            position: item.position,
            avatar: item.avatar
          }
        })
      })
      .catch((err) => {
        handleError(err)
      })
  }
  return { users, loadUsers }
}

export default getUsers