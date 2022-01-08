<template>
  <div>
    <div class="uk-position-relative">
      <h2 class="uk-text-bold">{{ $t("menu.observes") }}</h2>
      <router-link
        v-if="acl.add"
        :to="{ name: 'ObserveCreate' }"
        class="uk-button uk-button-primary uk-position-right"
        >+</router-link
      >
    </div>

    <div
      class="
        uk-child-width-1-1@m uk-child-width-1-2@l uk-grid-small uk-grid-match
      "
      uk-grid
    >
      <div v-if="observes">
        <div v-for="observe in observes" :key="observe._id">
          <div class="uk-position-relative">
            <div class="uk-card uk-card-default uk-card-body">
              <div class="uk-card-body">
                <div class="uk-grid">
                  <div class="uk-width-expand">
                    <h3 class="uk-card-title uk-margin-remove-bottom">
                      {{ user.name }}
                    </h3>
                    <p>
                      <span class="uk-text-muted">Должность:</span><br />{{
                        user.position
                      }}
                    </p>
                    <p>
                      <span class="uk-text-muted">E-mail:</span><br />{{
                        user.email
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="uk-position-top-right uk-padding-small">
              <router-link
                v-if="acl.edit"
                class="cursor-pointer uk-padding-small"
                :to="{ name: 'UserEdit', params: { userId: user._id } }"
              >
                <span uk-icon="pencil"></span
              ></router-link>
              <span
                v-if="acl.delete"
                class="uk-text-danger cursor-pointer"
                uk-icon="trash"
                @click="deleteDocument(user._id, user.name)"
              ></span>
            </div>
          </div>
        </div>
      </div>
      <div v-else>Данных по наблюдению для вашего отображения пока нет!</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { requestOptions, handleError } from "../../_helpers";
import { useToast } from "vue-toastification";
import { isRoleExist } from "../../_helpers";

export default {
  name: "Users",
  setup() {
    const toast = useToast();
    const api_url = process.env.VUE_APP_API;
    const app_url = process.env.VUE_APP_URL;
    const acl = {
      add: isRoleExist(["observer"]),
      edit: isRoleExist(["observer"]),
      delete: isRoleExist(["observer"]),
    };
    return { toast, api_url, app_url, acl };
  },
  data() {
    return {
      observes: null,
    };
  },
  methods: {
    deleteDocument(id, name) {
      UIkit.modal.confirm(this.$t("areYouSureDelete", { name })).then(() => {
        axios
          .delete(
            `${process.env.VUE_APP_API}/observer/${id}`,
            requestOptions.headersData()
          )
          .then((response) => {
            if (response.status === 200) {
              this.users = this.users.filter((item) => item._id != id);
              this.toast.warning(this.$t("user.deleted", { name }));
            }
          })
          .catch((err) => handleError(err));
      });
    },
  },
  mounted() {
    axios
      .get(`${process.env.VUE_APP_API}/observer`, requestOptions.headersData())
      .then((response) => {
        this.observes = response.data.data;
      })
      .catch((err) => {
        handleError(err);
      });
  },
};
</script>
<style>
.cursor-pointer {
  cursor: pointer;
}
</style>
