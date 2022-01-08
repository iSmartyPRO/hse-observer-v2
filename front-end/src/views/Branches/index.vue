<template>
  <div>
    <div class="uk-position-relative">
      <h2 class="uk-text-bold">{{ $t("menu.branches") }}</h2>
      <router-link
        v-if="acl.add"
        :to="{ name: 'BranchCreate' }"
        class="uk-button uk-button-primary uk-position-right"
        >+</router-link
      >
    </div>
    <div
      v-if="branches.length"
      class="
        uk-child-width-1-3@m uk-child-width-1-3@m uk-grid-small uk-grid-match
      "
      uk-grid
    >
      <div v-for="branch in branches" :key="branch._id">
        <div class="uk-card uk-card-default uk-card-body">
          <div class="uk-card-body uk-padding-remove">
            <h3 class="uk-card-title uk-margin-remove-bottom">
              {{ branch.name }}
            </h3>
            <p>{{branch.location}}</p>
          </div>
          <div
            class="
              uk-card-footer uk-padding-remove-left uk-padding-remove-bottom
            "
          >
            <router-link
              v-if="acl.edit"
              :to="{ name: 'BranchEdit', params: { branchId: branch.id } }"
              ><button class="uk-button uk-button-primary uk-button-small">
                <span uk-icon="pencil"></span></button
            ></router-link>
            <button
              v-if="acl.delete"
              class="uk-button uk-button-danger uk-button-small"
            >
              <span
                uk-icon="trash"
                @click="deleteBranch(branch.id, branch.name)"
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
import i18n from "../../i18n"
import { requestOptions, handleError, isRoleExist } from "../../_helpers";
import { useToast } from "vue-toastification";
import getBranches from '../../composables/getBranches'
import Spinner from '../../components/Spinner.vue'

export default {
  name: "Branches",
  components: { Spinner },
  setup() {
    const toast = useToast();
    const { t } = i18n.global
    const acl = {
      add: isRoleExist(["admin"]),
      edit: isRoleExist(["admin"]),
      delete: isRoleExist(["admin"]),
    }

    // Get branches
    const { branches, loadBranches } = getBranches()
    loadBranches()

    // Methods
    const deleteBranch = (id, name) => {
      UIkit.modal.confirm(t("areYouSureDelete", { name })).then(() => {
        axios
          .delete(
            `${process.env.VUE_APP_API}/branch/${id}`,
            requestOptions.delete({ id })
          )
          .then((response) => {
            if (response.status === 200) {
              branches.value = branches.value.filter((item) => item._id != id)
              toast.warning(response.data.message)
            }
          })
          .catch((err) => {
            handleError(err);
          });
      });
    }
    return { toast, acl, branches, deleteBranch };
  },
};
</script>
