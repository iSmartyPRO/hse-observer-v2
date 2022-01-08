<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-body">
      <button class="uk-button uk-button-primary" @click="handlePrevPage">
        {{ $t("back") }}
      </button>
      <form @submit.prevent>
        <fieldset class="uk-fieldset">
          <h2 class="uk-text-bold">{{ $t("role.edit") }}</h2>

          <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text"
              >{{ $t("role.name") }} *</label
            >
            <div class="uk-form-controls">
              <input
                class="uk-input"
                type="text"
                :placeholder="$t('role.enterName')"
                v-model="role.displayName"
              />
            </div>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text"
              >{{ $t("role.description") }} *</label
            >
            <div class="uk-form-controls">
              <input
                class="uk-input"
                id="description"
                type="text"
                :placeholder="$t('role.describe')"
                v-model="role.description"
              />
            </div>
          </div>
          <div class="uk-margin">
            <div class="uk-form-controls">
              <button
                type="submit"
                class="uk-button uk-button-primary"
                @click="update"
              >
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
import { requestOptions, handleError } from "../../_helpers";
import { useToast } from "vue-toastification";
import router from "../../router";
import i18n from "../../i18n";
import getRole from "../../composables/getRole";
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  name: "RoleEdit",
  props: ["roleId"],
  setup(props) {
    const toast = useToast();
    const route = useRoute();
    const { t } = i18n.global;

    // Get Role Data
    const { role, loadRole } = getRole(props.roleId);
    loadRole();

    // Methods
    const update = () => {
      axios
        .patch(
          `${process.env.VUE_APP_API}/role/` + route.params.roleId,
          JSON.stringify(role.value),
          requestOptions.headersData()
        )
        .then((request) => {
          if (request.status === 200) {
            router.push("/roles");
            toast.success(request.data.message);
          }
        })
        .catch((err) => handleError(err));
    };
    const handlePrevPage = () => {
      router.go(-1);
    };

    return {
      role,
      update,
      handlePrevPage,
    };
  },
};
</script>

<style>
</style>