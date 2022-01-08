<template>
  <div>
    <div class="uk-position-relative">
      <h2 class="uk-text-bold">{{ $t("menu.departments") }}</h2>
      <router-link
        v-if="acl.add"
        :to="{ name: 'DepartmentCreate' }"
        class="uk-button uk-button-primary uk-position-right"
        >+</router-link
      >
    </div>
    <div
      v-if="departments.length"
      class="
        uk-child-width-1-3@m uk-child-width-1-3@m uk-grid-small uk-grid-match
      "
      uk-grid
    >
      <div v-for="department in departments" :key="department.id">
        <div class="uk-card uk-card-default uk-card-body">
          <div class="uk-card-body uk-padding-remove">
            <h3 class="uk-card-title uk-margin-remove-bottom">
              {{ department.name }}
            </h3>
            <p>{{ department.description }}</p>
          </div>
          <div
            class="
              uk-card-footer uk-padding-remove-left uk-padding-remove-bottom
            "
          >
            <router-link
              v-if="acl.edit"
              :to="{
                name: 'DepartmentEdit',
                params: { departmentId: department.id },
              }"
              ><button class="uk-button uk-button-primary uk-button-small">
                <span uk-icon="pencil"></span></button
            ></router-link>
            <button
              v-if="acl.delete"
              class="uk-button uk-button-danger uk-button-small"
            >
              <span
                uk-icon="trash"
                @click="deleteDocument(department.id, department.name)"
              ></span>
            </button>
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
import { requestOptions, handleError, isRoleExist } from "../../_helpers";
import { useToast } from "vue-toastification";
import i18n from "../../i18n";
import getDepartments from "../../composables/getDepartments";
import Spinner from "../../components/Spinner.vue";

export default {
  name: "Departmets",
  components: { Spinner },
  setup() {
    const toast = useToast();
    const { t } = i18n.global;
    const acl = {
      add: isRoleExist("admin"),
      edit: isRoleExist("admin"),
      delete: isRoleExist("admin"),
    };

    // Get Departments
    const { departments, loadDepartments } = getDepartments();
    loadDepartments();

    // Methods
    const deleteDocument = (id, name) => {
      UIkit.modal.confirm(t("areYouSureDelete", { name })).then(() => {
        axios
          .delete(
            `${process.env.VUE_APP_API}/department/${id}`,
            requestOptions.headersData()
          )
          .then((response) => {
            if (response.status === 200) {
              departments.value = departments.value.filter(
                (item) => item.id != id
              );
              toast.warning(response.data.message);
            }
          })
          .catch((err) => handleError(err));
      });
    };

    return {
      departments,
      acl,
      deleteDocument,
    };
  },
};
</script>
