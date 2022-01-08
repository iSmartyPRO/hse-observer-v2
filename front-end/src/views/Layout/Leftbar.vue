<template>
  <!-- LEFT BAR -->
  <aside id="left-col" class="uk-light uk-visible@m">
    <div class="left-logo uk-flex uk-flex-middle">
      <img class="custom-logo" src="img/dashboard-logo.svg" alt="" />
    </div>
    <div class="left-content-box content-box-dark">
      <img src="/no-avatar.png" alt="" class="uk-border-circle profile-img" />
      <h4 class="uk-text-center uk-margin-remove-vertical text-light">
        {{ user.name }}
      </h4>
      <div class="uk-position-relative uk-text-center uk-display-block">
        <a
          href="#"
          class="uk-text-small uk-text-muted uk-display-block uk-text-center"
          data-uk-icon="icon: triangle-down; ratio: 0.7"
          >{{ user.position }}</a
        >
        <!-- user dropdown -->
        <div
          class="uk-dropdown user-drop"
          data-uk-dropdown="mode: click; pos: bottom-center; animation: uk-animation-slide-bottom-small; duration: 150"
        >
          <ul class="uk-nav uk-dropdown-nav uk-text-left">
            <li>
              <a href="#"><span data-uk-icon="icon: info"></span> Summary</a>
            </li>
            <li>
              <a href="#"><span data-uk-icon="icon: refresh"></span> Edit</a>
            </li>
            <li>
              <a href="#"
                ><span data-uk-icon="icon: settings"></span> Configuration</a
              >
            </li>
            <li class="uk-nav-divider"></li>
            <li>
              <a href="#"><span data-uk-icon="icon: image"></span> Your Data</a>
            </li>
            <li class="uk-nav-divider"></li>
            <li>
              <a href="#"
                ><span data-uk-icon="icon: sign-out" @click="logout"></span>
                Sign Out
              </a>
            </li>
          </ul>
        </div>
        <!-- /user dropdown -->
      </div>
    </div>
    <div class="languages uk-text-center">
      <span v-for="language in languages" :key="language.id">
        <img
          :src="'/' + language.id + '.png'"
          class="flag"
          alt=""
          :title="language.displayName"
          @click="changeLanguage(language.id, language.name)"
        />
      </span>
    </div>
    <div class="left-nav-wrap">
      <ul class="uk-nav uk-nav-default uk-nav-parent-icon" data-uk-nav>
        <li class="uk-nav-header">{{ $t("actions") }}</li>
        <li>
          <router-link
            :to="{ name: 'Dashboard' }"
            :class="this.$route.meta.menu === 'Dashboard' ? 'active-menu' : ''"
            ><span
              data-uk-icon="icon: home"
              class="uk-margin-small-right"
            ></span
            >{{ $t("menu.dashboard") }}</router-link
          >
        </li>
        <li v-if="showObserves">
          <router-link
            :to="{ name: 'Observes' }"
            :class="this.$route.meta.menu === 'Observes' ? 'active-menu' : ''"
            ><span
              data-uk-icon="icon: camera"
              class="uk-margin-small-right"
            ></span
            >{{ $t("menu.observes") }}</router-link
          >
        </li>
        <li v-if="showBranches">
          <router-link
            :to="{ name: 'Branches' }"
            :class="this.$route.meta.menu === 'Branches' ? 'active-menu' : ''"
            ><span
              data-uk-icon="icon: location"
              class="uk-margin-small-right"
              class-active="active"
            ></span
            >{{ $t("menu.branches") }}</router-link
          >
        </li>
        <li v-if="showDepartments">
          <router-link
            :to="{ name: 'Departments' }"
            :class="
              this.$route.meta.menu === 'Departments' ? 'active-menu' : ''
            "
            ><span
              data-uk-icon="icon: social"
              class="uk-margin-small-right"
            ></span
            >{{ $t("menu.departments") }}</router-link
          >
        </li>
        <li v-if="showRoles">
          <router-link
            :to="{ name: 'Roles' }"
            :class="this.$route.meta.menu === 'Roles' ? 'active-menu' : ''"
            ><span
              data-uk-icon="icon: unlock"
              class="uk-margin-small-right"
            ></span
            >{{ $t("menu.roles") }}</router-link
          >
        </li>
        <li v-if="showUsers">
          <router-link
            :to="{ name: 'Users' }"
            :class="this.$route.meta.menu === 'Users' ? 'active-menu' : ''"
            ><span
              data-uk-icon="icon: users"
              class="uk-margin-small-right"
            ></span
            >{{ $t("menu.users") }}</router-link
          >
        </li>
      </ul>
      <div class="left-content-box uk-margin-top">
        <h5>{{ $t("shortStat") }}</h5>
        <div>
          <span class="uk-text-small">Traffic <small>(+50)</small></span>
          <progress class="uk-progress" value="50" max="100"></progress>
        </div>
        <div>
          <span class="uk-text-small">Income <small>(+78)</small></span>
          <progress class="uk-progress success" value="78" max="100"></progress>
        </div>
        <div>
          <span class="uk-text-small">Feedback <small>(-12)</small></span>
          <progress class="uk-progress warning" value="12" max="100"></progress>
        </div>
      </div>
    </div>
    <div class="bar-bottom">
      <ul
        class="uk-subnav uk-flex uk-flex-center uk-child-width-1-5"
        data-uk-grid
      >
        <li>
          <router-link :to="{ name: 'Dashboard' }"
            ><span class="uk-icon-link" data-uk-icon="icon: home"></span
          ></router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Profile' }"
            ><span class="uk-icon-link" data-uk-icon="icon: user"></span
          ></router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Logout' }"
            ><span class="uk-icon-link" data-uk-icon="icon: sign-out"></span
          ></router-link>
        </li>
      </ul>
    </div>
  </aside>
  <!-- /LEFT BAR -->
</template>

<script>
import { authService } from "../../components/auth";
import { requestOptions, languages, handleError } from "../../_helpers";
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

import i18n from "../../i18n";
import { useToast } from "vue-toastification";
import { computed, ref } from "@vue/reactivity";
import router from "../../router";
import { onMounted } from "@vue/runtime-core";
export default {
  setup() {
    const { t } = i18n.global;
    const toast = useToast();
    const roles = VueJwtDecode.decode(
      authService.currentUserValue.token
    ).roles.map((item) => item.toLowerCase());
    const rolesModified = roles.map((item) => item.toLowerCase());

    // GET USER DATA
    const user = ref(new Object());
    axios
      .get(`${process.env.VUE_APP_API}/profile`, requestOptions.get())
      .then((response) => {
        user.value = response.data.data;
      })
      .catch((err) => handleError(err));

    // SHOW MENUS DEPEND ON ROLE
    const showBranches = computed(() => {
      const routeAuthorizeRoles = router.options.routes
        .find((item) => item.name === "Branches")
        .meta.authorize.map((item) => item.toLowerCase());
      return routeAuthorizeRoles.filter((value) =>
        roles.includes(value.toLowerCase())
      ).length
        ? true
        : false;
    });
    const showObserves = computed(() => {
      const routeAuthorizeRoles = router.options.routes
        .find((item) => item.name === "Observes")
        .meta.authorize.map((item) => item.toLowerCase());
      return routeAuthorizeRoles.filter((value) =>
        roles.includes(value.toLowerCase())
      ).length
        ? true
        : false;
    });
    const showDepartments = computed(() => {
      const routeAuthorizeRoles = router.options.routes
        .find((item) => item.name === "Departments")
        .meta.authorize.map((item) => item.toLowerCase());
      return routeAuthorizeRoles.filter((value) =>
        roles.includes(value.toLowerCase())
      ).length
        ? true
        : false;
    });
    const showRoles = computed(() => {
      const routeAuthorizeRoles = router.options.routes
        .find((item) => item.name === "Roles")
        .meta.authorize.map((item) => item.toLowerCase());
      return routeAuthorizeRoles.filter((value) =>
        roles.includes(value.toLowerCase())
      ).length
        ? true
        : false;
    });
    const showUsers = computed(() => {
      const routeAuthorizeRoles = router.options.routes
        .find((item) => item.name === "Users")
        .meta.authorize.map((item) => item.toLowerCase());
      return routeAuthorizeRoles.filter((value) =>
        roles.includes(value.toLowerCase())
      ).length
        ? true
        : false;
    });

    // Methods
    const changeLanguage = (language, languageName) => {
      i18n.global.locale = language;
      axios
        .patch(
          `${process.env.VUE_APP_API}/profile`,
          JSON.stringify({ language }),
          requestOptions.headersData()
        )
        .then((request) => {
          if (request.status === 200) {
            toast.success(t("languageSwitchNotification", { languageName }));
            let ls = JSON.parse(localStorage.getItem("currentUser"));
            ls.language = language;
            localStorage.setItem("currentUser", JSON.stringify(ls));
            authService.currentUser.subscribe((res) => {
              res.language = language;
            });
          }
        })
        .catch((err) => handleError(err));
    };
    const logout = () => {
      this.$router.push("/logout");
    };
    return {
      toast,
      roles,
      rolesModified,
      user,
      showBranches,
      showObserves,
      showDepartments,
      showRoles,
      showUsers,
      changeLanguage,
      logout,
    };
  },
  data() {
    return {
      languages,
    };
  },
};
</script>

<style scope>
/* Active Navbar Link */

.flag {
  width: 30px;
  padding: 3px;
  cursor: pointer;
}
</style>