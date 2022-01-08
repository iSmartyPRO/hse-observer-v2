<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-body">
      <form @submit.prevent="handleSubmit">
        <fieldset class="uk-fieldset">
          <h2 class="uk-text-bold">{{ $t("branch.new") }}</h2>
          <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text"
              >{{ $t("branch.name") }} *</label
            >
            <div class="uk-form-controls">
              <input
                class="uk-input"
                id="name"
                type="text"
                :placeholder="$t('branch.enterName')"
                v-model="user.name"
              />
            </div>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text">
              {{ $t("branch.location") }} *
            </label>
            <div class="uk-form-controls">
              <input
                class="uk-input"
                id="location"
                type="text"
                :placeholder="$t('branch.enterName')"
                v-model="user.location"
              />
            </div>
          </div>
          <div class="uk-margin">
            <div class="uk-form-controls">
              <button type="submit" class="uk-button uk-button-primary">
                {{ $t("branch.create") }}
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
import router from '../../router';

export default {
  name: "BranchCreate",
  setup() {
    const toast = useToast();
    const user = ref(new Object());

    // Methods
    const handleSubmit = () => {
      axios
        .post(
          `${process.env.VUE_APP_API}/branch`,
          JSON.stringify(user.value),
          requestOptions.headersData()
        )
        .then((response) => {
          if (response.status === 201) {
            router.push("/branches");
            toast.success(response.data.message);
          }
        })
        .catch((err) => handleError(err));
    };

    return {
      user,
      handleSubmit
    };
  },
};
</script>

<style>
</style>