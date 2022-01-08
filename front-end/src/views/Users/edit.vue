<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-body">
      <form @submit.prevent>
        <div class="uk-grid" uk-grid>
          <div
            class="
              uk-width-1-3 uk-width-1-1@s uk-width-1-6@xl uk-position-relative
            "
          >
            <FormAvatar v-model="user.avatar" :url="APP_URL" />
          </div>
          <div class="uk-width-expand">
            <fieldset class="uk-fieldset">
              <h2 class="uk-text-bold">{{ $t("user.edit") }}</h2>
              <FormText
                :labelText="$t('user.lfName')"
                :placeHolderText="$t('user.enterlfName')"
                v-model="user.name"
                required="true"
              ></FormText>
              <FormText
                :labelText="$t('user.username')"
                :placeHolderText="$t('user.enterUsername')"
                v-model="user.username"
                required="true"
              ></FormText>
              <FormText
                :labelText="$t('position')"
                :placeHolderText="$t('enterPosition')"
                v-model="user.position"
                required="true"
              ></FormText>
              <FormText
                :labelText="$t('email')"
                :placeHolderText="$t('email')"
                v-model="user.email"
                required="true"
              ></FormText>
              <FormSelect
                :labelText="$t('department.singular')"
                :dataArray="departments"
                :required="true"
                v-model="user.department"
              >
              </FormSelect>
              <FormRadio
                :labelText="$t('language')"
                :dataArray="langs"
                v-model="user.language"
              ></FormRadio>
              <FormRadio
                :labelText="$t('authType')"
                :dataArray="authTypes"
                v-model="user.authType"
              ></FormRadio>
              <FormCheckboxV2
                :labelText="$t('branch.singular')"
                :dataArray="branches"
                :dataSelected="nullArr"
                :required="true"
                v-model="user.branches"
              ></FormCheckboxV2>
              <FormCheckboxV2
                :labelText="$t('role.singular')"
                :dataArray="roles"
                :dataSelected="nullArr"
                :required="true"
                v-model="user.roles"
              ></FormCheckboxV2>
              <FormPassword
                :labelText="$t('password')"
                :placeHolderText="$t('enterPassword')"
                :required="true"
                v-model="user.password"
              ></FormPassword>

              <div class="uk-margin">
                <div class="uk-form-controls">
                  <button
                    type="submit"
                    class="uk-button uk-button-primary"
                    @click="handleUpdate"
                  >
                    {{ $t("updateData") }}
                  </button>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import {
  languages,
  requestOptions,
  handleError,
  authTypes as authTypesData,
} from "../../_helpers";
import { ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

// Composables
import getUser from "../../composables/getUser";
import getDepartments from "../../composables/getDepartments";
import getRoles from "../../composables/getRoles";
import getBranches from "../../composables/getBranches";

// Form Components
import FormText from "../../components/form-text.vue";
import FormPassword from "../../components/form-password.vue";
import FormCheckbox from "../../components/form-checkbox.vue";
import FormCheckboxV2 from "../../components/form-checkbox-v2.vue";
import FormRadio from "../../components/form-radio.vue";
import FormSelect from "../../components/form-select.vue";
import FormSearch from "../../components/form-search.vue";
import FormSearchSelect from "../../components/form-search-select.vue";
import FormAvatar from "../../components/form-avatar.vue";
import { useToast } from "vue-toastification";

export default {
  name: "EditUser",
  components: {
    FormText,
    FormPassword,
    FormCheckbox,
    FormCheckboxV2,
    FormRadio,
    FormSelect,
    FormSearch,
    FormSearchSelect,
    FormAvatar,
  },
  props: ["userId"],
  setup(props) {
    // Инициализация
    const APP_URL = process.env.VUE_APP_URL;
    const langs = ref(languages);
    const authTypes = ref(authTypesData);
    const nullArr = ref(new Array());
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();

    // Получение данные о пользователе
    const { user, loadUser } = getUser(props.userId);
    loadUser();

    // Получить зависимые данные
    const { departments, loadDepartments } = getDepartments();
    loadDepartments();

    const { branches, loadBranches } = getBranches();
    loadBranches();

    const { roles, loadRoles } = getRoles();
    loadRoles();

    // Методы
    const handleUpdate = () => {
      axios
        .patch(
          `${process.env.VUE_APP_API}/user/` + route.params.userId,
          JSON.stringify(user.value),
          requestOptions.headersData()
        )
        .then((request) => {
          if (request.status === 200) {
            router.push("/users");
            toast.success(request.data.message);
          }
        })
        .catch((err) => {
          handleError(err);
        });
    };
    return {
      user,
      roles,
      departments,
      branches,
      langs,
      authTypes,
      nullArr,
      APP_URL,
      handleUpdate,
    };
  },
};
</script>

<style>
</style>