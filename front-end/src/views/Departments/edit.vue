<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-body">
      <button class="uk-button uk-button-primary" @click="handlePrevPage">
        {{ $t("back") }}
      </button>
      <form @submit.prevent>
        <fieldset class="uk-fieldset">
          <h2 class="uk-text-bold">{{ $t("department.edit") }}</h2>

          <FormText
            :labelText="$t('department.name')"
            :placeHolderText="$t('department.enterName')"
            v-model="department.name"
            :required="true"
          ></FormText>
          <FormText
            :labelText="$t('department.description')"
            :placeHolderText="$t('department.enterDescription')"
            v-model="department.description"
            :required="true"
          ></FormText>

          <div class="uk-margin">
            <div class="uk-form-controls">
              <button class="uk-button uk-button-primary" @click="update">
                {{ $t("updateData") }}
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { requestOptions, handleError } from "../../_helpers";
import { useToast } from "vue-toastification";
import router from "../../router";
import getDepartment from "../../composables/getDepartment";

// Form Components
import FormText from "../../components/form-text.vue";
import { useRoute } from "vue-router";

export default {
  name: "DepartmentEdit",
  props: ["departmentId"],
  components: { FormText },
  setup(props) {
    const toast = useToast();
    const route = useRoute();

    // Get Department Data
    const { department, loadDepartment } = getDepartment(props.departmentId);
    loadDepartment();

    // Methods
    const update = () => {
      console.log(JSON.stringify(department.value));
      axios
        .patch(
          `${process.env.VUE_APP_API}/department/` + route.params.departmentId,
          JSON.stringify(department.value),
          requestOptions.headersData()
        )
        .then((request) => {
          if (request.status === 200) {
            router.push("/departments");
            toast.success(
              `Обновлена информация для "${request.data.data.name}"`
            );
          }
        })
        .catch((err) => handleError(err));
    };
    const handlePrevPage = () => {
      router.go(-1);
    };

    return {
      department,
      update,
      handlePrevPage,
    };
  },
};
</script>

<style>
</style>