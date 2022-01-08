<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-body">
      <button class="uk-button uk-button-primary" @click="handlePrevPage">
        {{ $t("back") }}
      </button>
      <form @submit.prevent>
        <fieldset class="uk-fieldset">
          <h2 class="uk-text-bold">{{ $t("branch.edit") }}</h2>
          <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text"
              >{{ $t("branch.name") }} *</label
            >
            <div class="uk-form-controls">
              <input
                class="uk-input"
                type="text"
                :placeholder="$t('branch.enterName')"
                v-model="branch.name"
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
                :placeholder="$t('branch.enterAddress')"
                v-model="branch.location"
              />
            </div>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text"
              >{{ $t("description") }} *</label
            >
            <div class="uk-form-controls">
              <input
                class="uk-input"
                type="text"
                :placeholder="$t('enterDescription')"
                v-model="branch.displayName"
              />
            </div>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text"
              >{{ $t("branch.observerNotificationUsers") }} *</label
            >
            <div class="uk-form-controls">
              <input
                class="uk-input"
                type="text"
                :placeholder="$t('branch.enterobserverNotificationUsers')"
                v-model="userSearch"
              />
              <div class="list-items"></div>
            </div>
          </div>
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
import router from '../../router';
import getBranch from '../../composables/getBranch'
import { ref } from '@vue/reactivity';

export default {
  name: "UserEdit",
  props: ['branchId'],
  setup(props) {
    const toast = useToast();
    const userSearch = ref(new String());

    // Get branch data
    const { branch, loadBranch } = getBranch(props.branchId)
    loadBranch()


    // Methods
    const handlePrevPage = () => {
      router.go(-1);
    };
    const userCheck = () => {
      axios
        .get(
          `${this.api_url}/search/user/${this.userSearch}`,
          requestOptions.headersData()
        )
        .then((response) => {
          this.foundUsers = response.data.data;
        })
        .catch((err) => console.log(err.message));
    };
    const update = () => {
      let updatedData = {
        name: branch.value.name,
        location: branch.value.location,
      };
      axios
        .patch(
          `${process.env.VUE_APP_API}/branch/` + route.params.branchId,
          JSON.stringify(updatedData),
          requestOptions.headersData()
        )
        .then((response) => {
          if (response.status === 200) {
            router.push("/branches");
            toast.success(
              `Обновлена информация для "${response.data.data.name}"`
            );
          }
        })
        .catch((err) => handleError(err));
    };

    return {
      branch,
      userSearch,
      handlePrevPage,
      userCheck,
      update,
    };
  },
};
</script>

<style>
</style>