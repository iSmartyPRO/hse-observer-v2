<template>
  <div class="uk-margin">
    <label class="uk-form-label" for="form-stacked-text">
      {{ labelText }} <span v-if="required" class="uk-text-danger">*</span>
    </label>
    <div class="uk-form-controls">
      <select v-model="val" class="uk-select">
        <option
          ref="sel"
          v-for="d in dataArray"
          :key="d.id"
          :value="d.id"
          :uk-tooltip="d.hint"
        >
          {{ d.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
export default {
  name: "FormSelect",
  props: {
    labelText: { required: true, type: String },
    dataArray: { required: true, type: Object},
    required: { required: false, type: Boolean },
    modelValue: { required: false, type: String },
  },
  setup(props, { emit }) {
    const val = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });
    return { val }
  },
};
</script>

<style>
</style>