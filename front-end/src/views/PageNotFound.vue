<template>
  <Content>
    <h1 class="uk-text-bold uk-text-danger">{{$t("error")}}</h1>
    <h4>{{$t('pageNotFound')}}</h4>
  </Content>
</template>

<script>
import Content from '../views/Layout/Content.vue'
import {useToast} from 'vue-toastification'
export default {
  setup() {
    const toast = useToast()
    return {toast}
  },
  components: {Content},
  mounted() {
    this.toast.error(`${this.$t('error')}\n${this.$t('requestedPageNotFound')}`);
  }

}
</script>

<style>

</style>