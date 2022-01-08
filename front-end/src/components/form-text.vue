<template>
  <div class="uk-margin">
    <label class="uk-form-label" for="form-stacked-text"
      >{{labelText}} <span v-if="required" class="uk-text-danger">*</span></label
    >
    <div class="uk-form-controls">
      <input
        class="uk-input"
        type="text"
        :placeholder="placeHolderText"
        @input="$emit('update:modelValue', $event.target.value)"
        autocomplete="off"
        v-model="modelValue"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: "FormText",
  props: ['labelText', 'placeHolderText', 'required', 'modelValue', 'class'],
}
</script>

<style>

</style>