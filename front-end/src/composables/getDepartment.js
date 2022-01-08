import axios from "axios"
import { requestOptions, handleError } from "../_helpers"
import { ref } from '@vue/reactivity'

const getDepartment = (val) => {
  const department = ref(new Object())
  const loadDepartment = () => {
    //console.log(val)
    axios
      .get(`${process.env.VUE_APP_API}/department/${val}`, requestOptions.headersData())
      .then((response) => {
        department.value = response.data.data
      })
      .catch((err) => {
        handleError(err)
      })
  }
  return { department, loadDepartment }
}

export default getDepartment