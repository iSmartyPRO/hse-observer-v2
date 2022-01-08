<template>
  <Header v-if="currentUser" />
  <Leftbar v-if="currentUser" />
  <Content v-if="currentUser">
    <router-view />
  </Content>
  <div v-else>
    <router-view />
  </div>
  <Offcanvas v-if="currentUser" />
</template>

<script>
import { authService } from "./components/auth";
import Header from "./views/Layout/Header.vue";
import Leftbar from "./views/Layout/Leftbar.vue";
import Content from "./views/Layout/Content.vue";
import Offcanvas from "./views/Layout/Offcanvas.vue";

import { useToast } from "vue-toastification";

export default {
  components: { Header, Leftbar, Content, Offcanvas },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      currentUser: null,
      apiUrl: this.$router.options.apiUrl,
    };
  },
  created() {
    this.toast.success("Welcome to HSE System!!!");
    authService.currentUser.subscribe((x) => {
      this.currentUser = x;
    });
    if (!this.currentUser) this.$router.push("/login");
  },
  mounted() {},
  computed: {
    isAdmin() {
      return this.currentUser && this.currentUser.roles.includes("admin");
    },
    isObserver() {
      return this.currentUser && this.currentUser.roles.includes("observer");
    },
    isStandard() {
      return this.currentUser && this.currentUser.roles.includes("standard");
    },
  },
};
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}
.img-avatar {
  border-radius: 50%;
}
</style>
