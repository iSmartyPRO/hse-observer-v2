<template>
  <div>
    <div class="uk-position-relative">
      <h2 class="uk-text-bold">{{ $t("menu.users") }}</h2>
      <router-link
        v-if="acl.add"
        :to="{ name: 'UserCreate' }"
        class="uk-button uk-button-primary uk-position-right"
        >+</router-link
      >
    </div>

    <div
      v-if="users.length"
      class="
        uk-child-width-1-1@m uk-child-width-1-2@l uk-grid-small uk-grid-match
      "
      uk-grid
    >
      <div v-for="user in users" :key="user.id">
        <div class="uk-position-relative">
          <div class="uk-card uk-card-default uk-card-body">
            <div class="uk-card-body">
              <div class="uk-grid">
                <div class="uk-width-1-3@m uk-inline">
                  <div>
                    <img
                      :data-src="
                        user.avatar
                          ? `${app_url}/uploads/${user.avatar}`
                          : '/no-avatar.png'
                      "
                      class="img-avatar"
                      uk-img
                    />
                  </div>
                </div>
                <div class="uk-width-expand">
                  <h3 class="uk-card-title uk-margin-remove-bottom">
                    {{ user.name }}
                  </h3>
                  <p>
                    <span class="uk-text-muted">{{ t('position')}}:</span><br />{{
                      user.position
                    }}
                  </p>
                  <p>
                    <span class="uk-text-muted">{{ t('email') }}:</span><br />{{
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
              :to="{ name: 'UserEdit', params: { userId: user.id } }"
              :uk-tooltip="t('update')"
            >
              <span uk-icon="pencil"></span
            ></router-link>
            <span
              v-if="acl.delete"
              class="uk-text-danger cursor-pointer"
              uk-icon="trash"
              @click="deleteDocument(user.id, user.name)"
              :uk-tooltip="t('delete')"
            ></span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <Spinner />

    </div>
  </div>
</template>

<script>
import axios from "axios";
import { requestOptions, handleError } from "../../_helpers";
import { useToast } from "vue-toastification";
import { isRoleExist } from "../../_helpers";
import i18n from '../../i18n'
import getUsers from '../../composables/getUsers'
import Spinner from '../../components/Spinner.vue'

export default {
  name: "Users",
  components: { Spinner },
  setup() {
    const toast = useToast();
    const {t} = i18n.global
    const app_url = process.env.VUE_APP_URL;
    const acl = {
      add: isRoleExist(["admin"]),
      edit: isRoleExist(["admin"]),
      delete: isRoleExist(["admin"]),
    };

    // Get Users Data
    const { users, loadUsers } = getUsers()
    loadUsers()

    // Methods
    const deleteDocument = (id, name) => {
      UIkit.modal.confirm(t("areYouSureDelete", { name })).then(() => {
        axios
          .delete(
            `${process.env.VUE_APP_API}/user/${id}`,
            requestOptions.headersData()
          )
          .then((response) => {
            if (response.status === 200) {
              users.value = users.value.filter((item) => item.id != id);
              toast.warning(response.data.message);
            }
          })
          .catch((err) => handleError(err));
      });
    };

    return {
      users,
      acl,
      app_url,
      t,
      deleteDocument,
    };
  }
};
</script>
<style>

</style>
