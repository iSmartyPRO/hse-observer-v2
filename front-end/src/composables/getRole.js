import axios from "axios"
import { requestOptions, handleError } from "../_helpers"
import { ref } from '@vue/reactivity'

const getRole = (val) => {
  const role = ref(new Object())
  const loadRole = () => {
    //console.log(val)
    axios
      .get(`${process.env.VUE_APP_API}/role/${val}`, requestOptions.headersData())
      .then((response) => {
        role.value = response.data.data
      })
      .catch((err) => {
        handleError(err)
      })
  }
  return { role, loadRole }
}

export default getRole