import axios from "axios"
import { requestOptions, handleError } from "../_helpers"
import { ref } from '@vue/reactivity'

const getUser = (val) => {
  const user = ref(new Object())
  const loadUser = () => {
    //console.log(val)
    axios
      .get(`${process.env.VUE_APP_API}/user/${val}`, requestOptions.headersData())
      .then((response) => {
        user.value = response.data.data
      })
      .catch((err) => {
        handleError(err)
      })
  }
  return { user, loadUser }
}

export default getUser