<template>
  <Content>
    <div class="uk-card uk-card-default">
      <div class="uk-card-body">
        <button class="uk-button uk-button-primary" @click="$router.back(-1)">
          {{ $t("back") }}
        </button>
        <h2 class="uk-text-bold">{{ $t("user.edit") }}</h2>

        <div uk-grid>
          <div class="uk-width-1-3 uk-width-1-1@s uk-width-1-6@xl uk-position-relative">
            <img
              :data-src="avatarImg ? avatarImg : '/no-avatar.png'"
              :uk-tooltip="$t('user.avatarUpdate')"
              uk-toggle="target: #avatarModalBox"
              class="cursor-pointer img-avatar"
              uk-img
            />
            <div v-if="user.avatar" class="uk-position-top-right">
              <span uk-icon="icon: trash" class="uk-text-danger cursor-pointer" :uk-tooltip="$t('user.avatarRemove')" @click="avatarRemove"></span>
            </div>
          </div>
          <div class="uk-width-expand">
            <form @submit.prevent>
              <fieldset class="uk-fieldset">
                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text"
                    >{{ $t("user.lfName") }} *</label
                  >
                  <div class="uk-form-controls">
                    <input
                      class="uk-input"
                      type="text"
                      :placeholder="$t('user.enterlfName')"
                      v-model="user.name"
                    />
                  </div>
                </div>
                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">{{
                    $t("branch.singular")
                  }}</label>
                  <div class="uk-form-controls">
                    <div
                      class="
                        uk-margin uk-grid-small uk-child-width-auto uk-grid
                      "
                    >
                      <label v-for="b in branchList" :key="b._id">
                        <input
                          v-model="branches"
                          :value="b.name"
                          class="uk-check InputfieldCheckbox"
                          type="checkbox"
                          :checked="branches.includes(b.name)"
                        />
                        {{ b.name }}
                      </label>
                    </div>
                  </div>
                </div>
                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">
                    {{ $t("department.singular") }} *
                  </label>
                  <div class="uk-form-controls">
                    <select
                      v-model="department"
                      name="department"
                      id="department"
                      class="uk-select"
                    >
                      <option
                        v-for="d in departmentList"
                        :key="d._id"
                        :value="d.name"
                        :selected="department === d.name"
                      >
                        {{ d.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">
                    {{ $t("position") }} *
                  </label>
                  <div class="uk-form-controls">
                    <input
                      class="uk-input"
                      id="position"
                      type="text"
                      :placeholder="$t('position')"
                      v-model="position"
                    />
                  </div>
                </div>
                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text"
                    >{{ $t("email") }} *</label
                  >
                  <div class="uk-form-controls">
                    <input
                      class="uk-input"
                      id="email"
                      type="text"
                      :placeholder="$t('email')"
                      v-model="email"
                      autocomplete="username"
                    />
                  </div>
                </div>
                <button
                  class="uk-button uk-button-secondary"
                  v-if="!ShowPasswordField"
                  @click="ShowPasswordField = true"
                >
                  {{$t('user.passwordUpdate')}}
                </button>
                <div class="uk-margin" v-else>
                  <label class="uk-form-label" for="form-stacked-text">
                    {{ $t("password") }} *
                  </label>
                  <div class="uk-form-controls">
                    <input
                      class="uk-input"
                      id="updatePassword"
                      type="password"
                      autocomplete="current-password"
                      :placeholder="$t('enterPassword')"
                      v-model="updatePassword"
                    />
                  </div>
                </div>
                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">
                    {{ $t("language") }}
                  </label>
                  <div class="uk-form-controls">
                    <div
                      class="
                        uk-margin uk-grid-small uk-child-width-auto uk-grid
                      "
                    >
                      <label v-for="lang in languages" :key="lang.name"
                        ><input
                          class="uk-radio"
                          type="radio"
                          name="selectedLanguage"
                          v-model="selectedLanguage"
                          :value="lang.name"
                          :checked="lang.name === selectedLanguage"
                        />
                        {{ lang.displayName }}
                      </label>
                    </div>
                  </div>
                </div>
                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">
                    {{ $t("authType") }}
                  </label>
                  <div class="uk-form-controls">
                    <div
                      class="
                        uk-margin uk-grid-small uk-child-width-auto uk-grid
                      "
                    >
                      <label
                        ><input
                          class="uk-radio"
                          type="radio"
                          name="authType"
                          v-model="authType"
                          value="local"
                          :checked="authType === 'local'"
                        />
                        {{ $t("local") }}
                      </label>
                      <label>
                        <input
                          class="uk-radio"
                          type="radio"
                          name="authType"
                          value="ad"
                          v-model="authType"
                          :checked="authType === 'ad'"
                        />
                        {{ $t("ad") }}
                      </label>
                    </div>
                  </div>
                </div>
                <div class="uk-margin">
  <fieldset class="checkbox-group">
    <legend class="checkbox-group-legend">{{$t("role.plural")}}</legend>
    <div class="checkbox" v-for="r in roleList" :key="r._id">
      <label class="checkbox-wrapper">
        <input type="checkbox" class="checkbox-input" :value="r.name" :checked="roles.includes(r.name)" />
        <span class="checkbox-tile">
          <span class="checkbox-label">{{ r.description }} ({{ r.name }})</span>
        </span>
      </label>
    </div>
  </fieldset>
                </div>
                <div class="uk-margin" v-if="testShow">
                  <label class="uk-form-label" for="form-stacked-text">{{
                    $t("role.singular")
                  }}</label>
                  <div class="uk-form-controls">
                    <div
                      class="
                        uk-margin uk-grid-small uk-child-width-auto uk-grid
                      "
                    >
                      <div v-for="r in roleList" :key="r._id" class="">
                        <label>
                          <input
                            class="uk-check"
                            type="checkbox"
                            name="authType"
                            :value="r.name"
                            v-model="roles"
                            :checked="roles.includes(r.name)"
                          />
                          {{ r.description }} ({{ r.name }})
                        </label>
                      </div>
                    </div>
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
      </div>

      <!-- MODAL BOX -->
      <!-- Input for avatar -->
      <input
        ref="avatarImage"
        type="file"
        name="image"
        accept="image/"
        @change="setImage"
      />

      <div id="avatarModalBox" uk-modal>
        <div class="uk-modal-dialog uk-modal-body">
          <h2 class="uk-modal-title">Аватар пользователя</h2>
          <p>Выберите аватар пользователя</p>
          <div>
            <div class="uk-card uk-card-default uk-card-hover uk-text-center">
              <vue-cropper
                ref="cropper"
                :img-style="{ width: '450px', height: '450px' }"
                :guides="true"
                :background="false"
                :min-container-width="540"
                :min-container-height="450"
                :aspect-ratio="1 / 1"
                :src="user.avatar ? user.avatar : '/no-avatar.png'"
                :view-mode="2"
                :modal="true"
              />
              <div class="actions">
                <button
                  class="uk-button uk-button-secondary uk-width-1-1"
                  @click="showFileChooser"
                >
                  Выбрать фото
                </button>
              </div>
            </div>
          </div>

          <p class="uk-text-right">
            <button
              class="uk-button uk-button-primary uk-width-1-2"
              type="button"
              @click="setAvatar"
            >
              Ок
            </button>
            <button
              class="uk-button uk-button-danger uk-modal-close uk-width-1-2"
              type="button"
            >
              Отмена
            </button>
          </p>
        </div>
      </div>
    </div>
  </Content>
</template>

<script>
import axios from "axios";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import Content from "../../views/Dashboard/Content.vue";
import { requestOptions, handleError, languages } from "../../_helpers";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const toast = useToast();
    const app_api = process.env.VUE_APP_API
    const app_url = process.env.VUE_APP_URL
    return { toast, app_api, app_url };
  },
  components: { Content, VueCropper },
  name: "UserEdit",
  data() {
    return {
      languages,
      user: {},
      branchList: [],
      departmentList: [],
      roleList: [],
      selectedLanguage: null,

      name: null,
      branches: [],
      department: null,
      position: null,
      email: null,
      password: null,
      authType: null,
      roles: [],
      avatarUpdated: false,
      avatarImg: null,

      updatePassword: null,

      ShowPasswordField: false,
    };
  },
  methods: {
    update() {
      let updatedData = {
        name: this.name,
        branches: this.branches,
        department: this.department,
        position: this.position,
        email: this.email,
        authType: this.authType,
        roles: this.roles,
        language: this.selectedLanguage,
      };
      if (this.updatePassword) {
        updatedData.password = this.updatePassword;
      }
      if (this.avatarUpdated){
        updatedData.avatar = this.avatarImg
      }
      axios
        .patch(
          `${process.env.VUE_APP_API}/user/` + this.$route.params.userId,
          updatedData,
          requestOptions.headersData()
        )
        .then((request) => {
          if (request.status === 200) {
            this.$router.push("/users");
            this.toast.success(
              this.$t("updatedFor", { name: request.data.data.name })
            );
          }
        })
        .catch((err) => handleError(err));
    },
    handlePrevPage() {
      this.$router.go(-1);
    },
    showFileChooser() {
      this.$refs.avatarImage.click();
    },
    setAvatar() {
      UIkit.modal("#avatarModalBox").hide();
      this.avatarImg = this.$refs.cropper
        .getCroppedCanvas({ width: 500, height: 500 })
        .toDataURL();
      this.avatarUpdated = true;
    },
    setImage(e) {
      const file = e.target.files[0];
      if (file.type.indexOf("image/") === -1) {
        this.toast.error("Пожалуйста выберите изображение!");
        return;
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        this.toast.error("К сожалению, FileReader API не поддерживается!");
      }
    },
    avatarRemove() {
      UIkit.modal
        .confirm(
          `Удалить аватар для пользователя ${this.name}?`
        )
        .then(
          () => {
            axios
              .patch(`${this.app_api}/user/${this.user._id}`, {
                avatarRemove: true,
              }, requestOptions.headersData())
              .then((response) => {
                this.toast.success(response.data.message);
                this.avatarImg = '/no-avatar.png';
                this.user.avatar = null
              })
              .catch((err) => this.toast.error(err.message));
          },
          () => this.toast.success(`Вы отменили удаление аватара`)
        );
    },
  },
  created() {
    axios
      .get(
        `${process.env.VUE_APP_API}/user/` + this.$route.params.userId,
        requestOptions.get()
      )
      .then((response) => {
        this.user = response.data.data;
        this.name = this.user.name;
        this.branches = this.user.branches.map((item) => {
          return item.name;
        });
        this.department = this.user.department.name;
        this.position = this.user.position;
        this.email = this.user.email;
        this.password = null;
        this.authType = this.user.authType;
        this.selectedLanguage = this.user.language;
        this.avatarImg = this.user.avatar ? `${this.app_url}/uploads/${this.user.avatar}` : '/no-avatar.png'
        this.roles = this.user.roles.map((item) => item.name);
      })
      .catch((err) => console.log(err));
    axios
      .get(`${process.env.VUE_APP_API}/branch`, requestOptions.get())
      .then((response) => {
        this.branchList = response.data.data;
      })
      .catch((err) => console.log(err));
    axios
      .get(`${process.env.VUE_APP_API}/department`, requestOptions.get())
      .then((response) => {
        this.departmentList = response.data.data;
      })
      .catch((err) => console.log(err));
    axios
      .get(`${process.env.VUE_APP_API}/role`, requestOptions.get())
      .then((response) => (this.roleList = response.data.data))
      .catch((err) => handleError(err));
  },
};
</script>

<style>
</style>