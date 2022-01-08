<template>
  <div
    class="
      login
      uk-cover-container
      uk-background-secondary
      uk-flex
      uk-flex-center
      uk-flex-middle
      uk-height-viewport
      uk-overflow-hidden
      uk-light
    "
    data-uk-height-viewport
  >
    <!-- overlay -->
    <div class="uk-position-cover uk-overlay-primary"></div>
    <!-- /overlay -->
    <div
      class="
        uk-position-bottom-center
        uk-position-small
        uk-visible@m
        uk-position-z-index
      "
    >
      <span class="uk-text-small uk-text-muted"
        >© 2021 GENCO Industry -
        <a href="https://www.ismarty.pro">Created by iSmartyPro</a></span
      >
    </div>
    <div
      class="uk-width-medium uk-padding-small uk-position-z-index"
      uk-scrollspy="cls: uk-animation-fade"
    >
      <div class="uk-text-center uk-margin">
        <img src="../assets/logo.svg" alt="Logo" />
      </div>

      <!-- login -->
      <form
        class="toggle-class"
        action="login-dark.html"
        @submit.prevent="onSubmit"
      >
        <fieldset class="uk-fieldset">
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span
                class="uk-form-icon uk-form-icon-flip"
                data-uk-icon="icon: user"
              ></span>
              <input
                class="uk-input uk-border-pill"
                v-model="username"
                required
                placeholder="Имя пользователя"
                type="text"
                name="username"
              />
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span
                class="uk-form-icon uk-form-icon-flip"
                data-uk-icon="icon: lock"
              ></span>
              <input
                class="uk-input uk-border-pill"
                required
                placeholder="Password"
                type="password"
                v-model="password"
                name="password"
              />
            </div>
          </div>
          <div class="uk-margin-bottom">
            <button
              type="submit"
              class="uk-button uk-button-primary uk-border-pill uk-width-1-1"
            >
              Войти
            </button>
          </div>
        </fieldset>
      </form>
      <!-- /login -->

      <!-- recover password -->
      <form class="toggle-class" action="login-dark.html" hidden>
        <div class="uk-margin-small">
          <div class="uk-inline uk-width-1-1">
            <span
              class="uk-form-icon uk-form-icon-flip"
              data-uk-icon="icon: mail"
            ></span>
            <input
              class="uk-input uk-border-pill"
              placeholder="E-mail"
              required
              type="text"
            />
          </div>
        </div>
        <div class="uk-margin-bottom">
          <button
            type="submit"
            class="uk-button uk-button-primary uk-border-pill uk-width-1-1"
          >
            SEND PASSWORD
          </button>
        </div>
      </form>
      <!-- /recover password -->

      <!-- action buttons -->
      <div>
        <div class="uk-text-center">
          <a
            class="uk-link-reset uk-text-small toggle-class"
            data-uk-toggle="target: .toggle-class ;animation: uk-animation-fade"
            >Forgot your password?</a
          >
          <a
            class="uk-link-reset uk-text-small toggle-class"
            data-uk-toggle="target: .toggle-class ;animation: uk-animation-fade"
            hidden
            ><span data-uk-icon="arrow-left"></span> Back to Login</a
          >
        </div>
      </div>
      <!-- action buttons -->
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { authService } from "../components/auth";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { handleError } from "../_helpers";

export default {
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      username: "",
      password: "",
      submitted: false,
      loading: false,
      returnUrl: "",
      error: "",
    };
  },
  validations: {
    username: { required },
    password: { required },
  },
  created() {
    // redirect to home if already logged in
    const router = useRouter();
    if (authService.currentUserValue) {
      return router.push("/");
    }
    this.returnUrl = this.$route.query.returnUrl || "/";
  },
  methods: {
    onSubmit() {
      this.submitted = true;
      this.loading = true;
      authService
        .login(this.username, this.password)
        .then((response) => {
          this.$router.push("/");
        })
        .catch((err) => {
          handleError(err);
          this.username = "";
          this.password = "";
        });
    },
  },
};
</script>

<style>
</style>