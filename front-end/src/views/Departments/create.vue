<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-body">
      <form @submit.prevent="handleSubmit">
        <fieldset class="uk-fieldset">
          <h2 class="uk-text-bold">{{ $t("department.new") }}</h2>

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
              <button type="submit" class="uk-button uk-button-primary">
                {{ $t("department.create") }}
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
import { ref } from "@vue/reactivity";
import router from "../../router";

// Form Components
import FormText from "../../components/form-text.vue";

export default {
  name: "DepartmentCreate",
  components: { FormText },

  setup() {
    const toast = useToast();
    const department = ref(new Object());

    // Methods
    const handleSubmit = () => {
      console.log(department.value);
      axios
        .post(
          `${process.env.VUE_APP_API}/department`,
          JSON.stringify(department.value),
          requestOptions.headersData()
        )
        .then((response) => {
          if (response.status === 201) {
            router.push("/departments");
            toast.success(response.data.message);
          }
        })
        .catch((err) => handleError(err));
    };

    return {
      department,
      handleSubmit,
    };
  },
};
</script>

<style>
</style>