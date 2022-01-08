<template>
  <div>
    <div class="uk-position-relative">
      <h2 class="uk-text-bold">{{ $t("menu.roles") }}</h2>
    </div>
    <div
      v-if="roles.length"
      class="
        uk-child-width-1-3@m uk-child-width-1-3@m uk-grid-small uk-grid-match
      "
      uk-grid
    >
      <div v-for="role in roles" :key="role.id">
        <div class="uk-card uk-card-default uk-card-body">
          <div class="uk-card-body uk-padding-remove">
            <h3 class="uk-card-title uk-margin-remove-bottom">
              {{ role.displayName }}
            </h3>
            <p>{{ role.description }}</p>
          </div>
          <div
            class="
              uk-card-footer uk-padding-remove-left uk-padding-remove-bottom
            "
          >
            <router-link
              v-if="acl.edit"
              :to="{ name: 'RoleEdit', params: { roleId: role.id } }"
              ><button class="uk-button uk-button-primary uk-button-small">
                <span uk-icon="pencil"></span></button
            ></router-link>
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
import { isRoleExist } from "../../_helpers";
import getRoles from "../../composables/getRoles";
import Spinner from "../../components/Spinner.vue";

export default {
  name: "Roles",
  components: { Spinner },
  setup() {
    const acl = {
      add: isRoleExist(["admin"]),
      edit: isRoleExist(["admin"]),
      delete: isRoleExist(["admin"]),
    };
    const { roles, loadRoles } = getRoles();
    loadRoles();

    return {
      roles,
      acl,
    };
  },
};
</script>
