import axios from "axios";
import { requestOptions, handleError } from "../_helpers";
import { ref } from '@vue/reactivity';

const getEntities = () => {
  const entities = ref(new Object())

  const loadEntities = (entity) => {
    console.log(entity)
    axios
      .get(`${process.env.VUE_APP_API}/${entity}`, requestOptions.headersData())
      .then((response) => {
        entities.value = response.data.data;
      })
      .catch((err) => {
        handleError(err);
      });
  }
  return { entities, loadEntities }
}

export default getEntities