<template>
  <div class="uk-container uk-text-center">
    <div class="uk-margin-bottom">
      <div class="spin"></div>
      {{ loading }}
    </div>

  </div>
</template>

<script>
import i18n from '../i18n'

export default {
  setup() {
    const loading = i18n.global.t('loadingData')
    return { loading }
  }
};
</script>

<style>
.spin {
  display: block;
  width: 40px;
  height: 40px;
  margin: 30px auto;
  border: 3px solid transparent;
  border-radius: 50%;
  border-top-color: #ff8800;
  animation: spin 1s ease infinite;
}
@keyframes spin {
  to {
    transform: rotateZ(360deg);
  }
}
</style>