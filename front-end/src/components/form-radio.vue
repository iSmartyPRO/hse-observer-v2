<template>
  <div class="uk-margin">
    <label class="uk-form-label" for="form-stacked-text">
      {{ labelText }}
    </label>
    <div class="uk-form-controls">
      <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
        <label v-for="d in dataArray" :key="d.id" :uk-tooltip="d.hint"
          ><input
            ref="selected"
            class="uk-radio"
            type="radio"
            :name="dataArray[0].id"
            v-model="val"
            :value="d.id"
            :checked="d.id === val"
          />
          {{ d.name }}
        </label>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "@vue/runtime-core";
export default {
  name: "FormRadio",
  props: {
    labelText: { type: String, required: true },
    required: { type: Boolean, required: false },
    dataArray: { type: Object, required: true },
    modelValue: { type: String, required: false },
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