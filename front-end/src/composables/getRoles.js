import axios from "axios";
import { requestOptions, handleError } from "../_helpers";
import { ref } from '@vue/reactivity';

const getRoles = () => {
  const roles = ref(new Object())
  const loadRoles = async () => {
    // Симуляция задержки загрузки
    await new Promise(resolve => {
      setTimeout(resolve, 1000)
    })

    axios
      .get(`${process.env.VUE_APP_API}/role`, requestOptions.headersData())
      .then((response) => {
        roles.value = response.data.data.map((item) => {
          return { id: item._id, name: item.name, displayName: item.displayName, description: item.description, hint: item.location };
        })
      })
      .catch((err) => {
        handleError(err);
      });
  }
  return { roles, loadRoles }
}

export default getRoles