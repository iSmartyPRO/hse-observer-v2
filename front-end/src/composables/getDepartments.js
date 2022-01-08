import axios from "axios"
import { requestOptions, handleError } from "../_helpers"
import { ref } from '@vue/reactivity'

const getDepartments = () => {
  const departments = ref(new Object())
  const loadDepartments = async () => {
    // Симуляция задержки загрузки
    await new Promise(resolve => {
      setTimeout(resolve, 1000)
    })

    axios
      .get(`${process.env.VUE_APP_API}/department`, requestOptions.headersData())
      .then((response) => {
        departments.value = response.data.data.map((item) => {
          return { id: item._id, name: item.name, description: item.description, hint: item.location }
        })
      })
      .catch((err) => {
        handleError(err)
      })
  }
  return { departments, loadDepartments }
}

export default getDepartments