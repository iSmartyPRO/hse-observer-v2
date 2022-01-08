import axios from "axios"
import { requestOptions, handleError } from "../_helpers"
import { ref } from '@vue/reactivity'

const getBranch = (val) => {
  const branch = ref(new Object())
  const loadBranch = () => {
    axios
      .get(`${process.env.VUE_APP_API}/branch/${val}`, requestOptions.headersData())
      .then((response) => {
        branch.value = response.data.data
      })
      .catch((err) => {
        handleError(err)
      })
  }
  return { branch, loadBranch }
}

export default getBranch