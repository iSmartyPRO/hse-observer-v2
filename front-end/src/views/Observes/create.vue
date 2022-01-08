<template>
    <div class="uk-card uk-card-default">
      <div class="uk-card-body">
        <form @submit.prevent="handleSubmit">
          <fieldset class="uk-fieldset">
            <h2 class="uk-text-bold">{{$t('observer.new')}}</h2>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text"
                >{{$t('observer.projectName')}} *</label
              >
              <div class="uk-form-controls">
                <input
                  class="uk-input"
                  id="name"
                  type="text"
                  :placeholder="$t('observer.enterProjectName')"
                  v-model="name"
                />
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text"
                >{{$t('branch.singular')}} *</label
              >
              <div class="uk-form-controls">
                <input
                  class="uk-input"
                  id="name"
                  type="text"
                  :placeholder="$t('observer.enterProjectName')"
                  v-model="name"
                />
              </div>
            </div>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">
                {{$t('position')}} *
              </label>
              <div class="uk-form-controls">
                <input
                  class="uk-input"
                  id="position"
                  type="text"
                  placeholder="Должность"
                  v-model="position"
                />
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text"
                >{{ $t('email') }} *</label
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
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">
                {{$t('password')}} *
              </label>
              <div class="uk-form-controls">
                <input
                  class="uk-input"
                  id="password"
                  type="password"
                  :placeholder="$t('enterPassword')"
                  v-model="password"
                  autocomplete="current-password"
                />
              </div>
            </div>
            <div class="uk-margin">
              <div class="uk-form-controls">
                <button type="submit" class="uk-button uk-button-primary">
                  {{ $t('user.create') }}
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
import { requestOptions, handleError } from "../../_helpers"
import {useToast} from 'vue-toastification'

export default {
    setup() {
        const toast = useToast()
        return {toast}
    },
  name: "ObserveCreate",
  data() {
    return {
      observe: {}
    };
  },
  methods: {
    handleSubmit() {
      let newObserve = {

      }
      axios.post(`${process.env.VUE_APP_API}/observer`, JSON.stringify(newObserve), requestOptions.headersData())
        .then(request => {
          if(request.status === 201) {
            this.$router.push("/observers")
            this.toast.success(this.$t('created', {name: request.data.data.name}))
          }
        })
        .catch(err => handleError(err) )
    },
  },
  mounted() {


  }
};
</script>

<style>
</style>