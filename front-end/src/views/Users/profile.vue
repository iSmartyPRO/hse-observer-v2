<template>
    <div class="uk-card uk-card-default">
      <div class="uk-card-body">
        <form @submit.prevent>
          <fieldset class="uk-fieldset">
            <h2 class="uk-text-bold">{{$t('user.profile')}}</h2>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text"
                >{{$t('user.lfName')}} *</label
              >
              <h3 class="uk-margin-remove uk-text-bold">
                {{user.name}}
              </h3>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">{{$t('branch.singular')}}</label>
              <h3 class="uk-margin-remove">{{branches.join(", ")}}</h3>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">{{$t('department.singular')}}</label>
              <h3 class="uk-margin-remove">{{department}}</h3>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">{{$t('position')}}</label>
              <h3 class="uk-margin-remove">{{user.position}}</h3>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">{{$t('email')}}</label>
              <h3 class="uk-margin-remove">{{user.email}}</h3>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">{{$t('language')}}</label>
              <h3 class="uk-margin-remove">{{user.language}}</h3>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">{{$t('authType')}}</label>
              <h3 class="uk-margin-remove">{{user.authType === 'ad' ? 'Active Directory' : 'Local'}}</h3>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">{{$t('role.plural')}}</label>
              <h3 class="uk-margin-remove">{{roles.join('; ')}}</h3>
            </div>

                        <button class="uk-button uk-button-secondary" v-if="!ShowPasswordField" @click="handleShowPasswordField">Изменить пароль</button>
            <div class="uk-margin" v-else>
              <label class="uk-form-label" for="form-stacked-text">
                {{$t('password')}} *
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
              <div class="uk-form-controls">
                <button class="uk-button uk-button-primary" @click="update">
                  {{$t('updateProfile')}}
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
import { requestOptions, handleError, languages } from "../../_helpers"
import {useToast} from 'vue-toastification'
import myUpload from 'vue-image-crop-upload';


export default {
  setup() {
      const toast = useToast()
      return {toast}
  },
  components: { myUpload },
  name: "Profile",
  data() {
    return {
      show: false,

  profileImage: null,
      user: {},
      department: null,
      branches: [],
      password: null,
      roles: [],
      updatePassword: null,
      ShowPasswordField: false
    };
  },

  methods: {
    update () {
      let updatedData = {
        language: this.selectedLanguage
      }
      if(this.updatePassword) {
        updatedData.password = this.updatePassword
      }
      axios.patch(`${process.env.VUE_APP_API}/profile`, JSON.stringify(updatedData), requestOptions.headersData())
        .then(request => {
          if(request.status === 200) {
            this.toast.success(this.$t('user.profileUpdated'))
            this.$router.push("/profile")
            this.updatePassword = null
            this.ShowPasswordField = false
          }
        })
        .catch(err => handleError(err) )
    },
    handleShowPasswordField() {
      this.ShowPasswordField = true
    }
  },
  created() {
    axios
      .get(`${process.env.VUE_APP_API}/profile`, requestOptions.get())
      .then((response) => {
          this.user =response.data.data
          this.department = this.user.department.name
          this.branches = this.user.branches.map((item) => {return item.name})
          this.selectedLanguage = this.user.language
          this.roles = this.user.roles.map(item => item.description)
         })
      .catch((err) => console.log(err))

  }
};
</script>

<style>
</style>