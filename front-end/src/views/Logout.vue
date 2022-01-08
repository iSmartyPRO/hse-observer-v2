<template>

</template>

<script>
import {authService} from "../components/auth"
export default {
  created() {
    authService.logout()
    this.$router.push('/login')
  }
}
</script>

<style>

</style>