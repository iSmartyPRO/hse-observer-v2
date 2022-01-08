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
            <FormAvatar v-model="user.avatar" />
          </div>
          <div class="uk-width-expand">
            <fieldset class="uk-fieldset">
              <h2 class="uk-text-bold">{{ $t("user.new") }}</h2>
              <FormText
                :labelText="$t('user.lfName')"
                :placeHolderText="$t('user.enterlfName')"
                v-model="user.name"
                :required="true"
              ></FormText>
              <FormText
                :labelText="$t('user.username')"
                :placeHolderText="$t('user.enterUsername')"
                v-model="user.username"
                :required="true"
              ></FormText>
              <FormText
                :labelText="$t('position')"
                :placeHolderText="$t('enterPosition')"
                v-model="user.position"
                :required="true"
              ></FormText>
              <FormText
                :labelText="$t('email')"
                :placeHolderText="$t('email')"
                v-model="user.email"
                :required="true"
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
                dataSelected="ru"
                v-model="user.language"
              ></FormRadio>
              <FormRadio
                :labelText="$t('authType')"
                :dataArray="authTypes"
                dataSelected="local"
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
                    @click="handleSubmit"
                  >
                    {{ $t("user.create") }}
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
import axios from "axios";
import {
  requestOptions,
  handleError,
  authTypes,
  languages,
} from "../../_helpers";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

// Composables
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
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

export default {
  name: "UserCreate",
  setup(_, { root }) {
    // Init
    const langs = ref(languages);
    const user = ref(new Object());

    const nullArr = ref(new Array());
    const toast = useToast();
    const router = useRouter();
    user.value = {
      authType: "local",
      language: "ru",
      authType: "local",
    };

    // Получить зависимые данные
    const { departments, loadDepartments } = getDepartments();
    loadDepartments();

    const { branches, loadBranches } = getBranches();
    loadBranches();

    const { roles, loadRoles } = getRoles();
    loadRoles();

    watch(langs, (val) => {
      console.log(val);
    });

    // Methods
    const handleSubmit = () => {
      axios
        .post(
          `${process.env.VUE_APP_API}/user`,
          JSON.stringify(user.value),
          requestOptions.headersData()
        )
        .then((response) => {
          router.push("/users");
          toast.success(response.data.message);
        })
        .catch((err) => {
          let { status, data } = err.response;
          if (status === 422) {
            // Отображение ошибок валидации
            toast.error(
              `${data.message}\n\n${data.errors
                .map((item) => {
                  return item.msg;
                })
                .join(`\n`)}`
            );
          } else {
            handleError(err);
          }
        });
    };
    return {
      user,
      branches,
      departments,
      roles,
      nullArr,
      langs,
      handleSubmit,
    };
  },
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
  data() {
    return {
      authTypes,
    };
  },
};
</script>

<style>
</style>