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
              @click="setResult({id: d.id, name: d.name})"
              class="autocomplete-result"
              :class="{ 'is-active': idx === arrowCounter }"
            >
              {{ d.name }}
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
  name: "FormSearch",
  props: ["labelText", "placeHolderText", "selectedValues", "filterredData"],
  data() {
    return {
      dataArray: this.selectedValues,
      isOpen: false,
      results: [],
      search: "",
      arrowCounter: 0,
    };
  },
  methods: {
    emitIt(emitValue) {
      this.$emit("update:modelValue", emitValue);
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
      if (this.arrowCounter < (this.results.length - 1 )) {
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
        this.setResult(this.results[this.arrowCounter])
      }
    },
    setResult(result) {
      this.emitIt(result.id);
      this.search = result.name;
      this.isOpen = false;
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    },
    removeItem(e) {
      this.dataArray = this.dataArray.filter(item => item.id !== e)
      this.emitIt(this.dataArray)
    }
  },
  watch: {
    filterredData(val) {
      if(val.length) {
        this.results = val
      } else {
        this.results = []
        this.isOpen = false
      }
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
  padding: 10px;
  background: rgb(236, 236, 236);
  display: inline-block;
  border-radius: 20px;
  margin-right: 15px;
}
.form-search-selected li span {
  cursor: pointer;
  background: #bbb;
  border-radius: 50%;
  padding: 5px;
}
</style>