<template>
  <div class="uk-margin">
    <label class="uk-form-label" for="form-stacked-text"
      >{{ labelText }}
      <span v-if="required" class="uk-text-danger">*</span></label
    >
    <div class="uk-form-controls">
      <input
        class="uk-input"
        type="password"
        v-model="val"
        :placeholder="placeHolderText"
        autocomplete="current-password"
      />
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
export default {
  name: "FormPassword",
  props: {
    labelText: { type: String, required: true },
    placeHolderText: { type: String, required: true },
    required: { type: Boolean, required: false },
    modelValue: { type: Object, require: false },
  },
  setup(props, { emit }) {
    const val = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });
    return { val };
  }
};
</script>

<style>
</style>