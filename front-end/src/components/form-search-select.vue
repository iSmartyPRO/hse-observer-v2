<template>
  <div>
    <div class="uk-margin">
      <label class="uk-form-label" for="form-stacked-text">{{
        labelText
      }}</label>
      <div class="uk-form-controls">
        <div class="autocomplete">
          <input
            type="search"
            class="uk-input uk-input-large"
            :placeholder="placeHolderText"
            v-model="search"
            @input="onChange"
            @keydown.down="onArrowDown"
            @keydown.up="onArrowUp"
            @keydown.enter="onArrowEnter"
          />
          <ul
            id="autocomplete-results"
            v-show="isOpen"
            class="autocomplete-results"
          >
            <li
              v-for="(d, idx) in results"
              :key="idx"
              @click="setResult(d)"
              class="autocomplete-result"
              :class="{ 'is-active': idx === arrowCounter }"
            >
              {{ d.name }}
            </li>
          </ul>
        </div>
        <div class="uk-margin">
          <ul class="form-search-selected">
            <li
              v-for="d in selectedValues"
              :key="d.id"
              class="uk-position-relative"
              :uk-tooltip="d.hint"
            >
              {{ d.name }} &nbsp;<span
                uk-icon="icon: close"
                @click="removeItem(d.id)"
              ></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {debounce} from 'lodash'
export default {
  name: "FormSearchSelect",
  props: {
    labelText: { type: String },
    placeHolderText: { type: String },
    selectedData: { type: Object },
    filterredData: { type: Object },
  },
  data() {
    return {
      selectedValues: [],
      isOpen: false,
      results: [],
      search: "",
      arrowCounter: 0,
    };
  },
  methods: {
    emitIt() {
      this.$emit("update:modelValue", this.selectedValues);
    },
    onChange() {
      if (this.search.length) {
        let runIt = debounce(() => {
          this.$emit('filterData', this.search)
          this.isOpen = true;
        }, 1000)
        runIt()
      } else {
        this.isOpen = false;
        this.results = [];
      }
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length - 1) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onArrowEnter() {
      if (this.search && this.results.length) {
        this.setResult(this.results[this.arrowCounter]);
      }
    },
    setResult(result) {
      if(!this.selectedValues.find(item => item.id === result.id)) {
        this.selectedValues.push(result)
        this.emitIt();
      }
      this.search = ""
      this.isOpen = false;
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    },
    removeItem(e) {
      this.selectedValues = this.selectedValues.filter((item) => item.id !== e);
    },
  },
  watch: {
    filterredData(val) {
      if (val.length) {
        this.results = val;
      } else {
        this.results = []
        this.isOpen = false
      }
    },
    selectedData(val){
      this.selectedValues = this.selectedData
    }
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside)
  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  }
};
</script>

<style>
.autocomplete {
  position: relative;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 170px;
  overflow: auto;
  width: 100%;
  background: #ffffff;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #2f3d58;
  color: #fff;
}

.form-search-selected {
  list-style: none;
  padding: 0px;
}
.form-search-selected li {
  padding: 2px 15px;
  background: rgb(236, 236, 236);
  display: inline-block;
  border-radius: 20px;
  margin-right: 15px;
}
.form-search-selected li span {
  cursor: pointer;
  font-size: 0.9rem;
  background: #bbb;
  border-radius: 50%;
  padding: 5px;
}
</style>