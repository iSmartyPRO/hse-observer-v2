import axios from "axios";
import { requestOptions, handleError } from "../_helpers";
import { ref } from '@vue/reactivity';

const getBranches = () => {
  const branches = ref(new Object())
  const loadBranches = async () => {
    // Симуляция задержки загрузки
    await new Promise(resolve => {
      setTimeout(resolve, 1000)
    })

    axios
      .get(`${process.env.VUE_APP_API}/branch`, requestOptions.headersData())
      .then((response) => {
        branches.value = response.data.data.map((item) => {
          return { id: item._id, name: item.name, hint: item.location };
        })
      })
      .catch((err) => {
        handleError(err);
      });
  }
  return { branches, loadBranches }
}

export default getBranches