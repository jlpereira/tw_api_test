<template>
  <div class="tw-autocomplete">
    <input
      class="autocomplete-input"
      placeholder="Search a taxon name..."
      v-model="fieldValue"
      type="text">
      <ul class="autocomplete-list">
        <li v-if="searchDone && !resultList.length">No records found.</li>
        <li
          v-for="item in resultList"
          @click="selectObject(item)"
          :key="item.id"
          v-html="item.label_html"/>
      </ul>
  </div>
</template>

<script>

import axios from 'axios'
import apiConfig from '@/config.json'

export default {
  props: {
    endpoints: {
      type: Array,
      default: () => {
        return [
          {
            url: apiConfig.apiUrl,
            param: 'term',
            extraParams: apiConfig.apiParams
          },
          // {
          //   url: 'https://api.bionomia.net/user.json',
          //   param: 'q'
          // }
        ]
      }
    }
  },
  data () {
    return {
      fieldValue: '',
      resultList: [],
      timer: 500,
      timeOut: undefined,
      searchDone: false
    }
  },
  watch: {
    fieldValue(newVal) {
      clearTimeout(this.timeOut)
      this.searchDone = false
      if(newVal.length) {
        this.timeOut = setTimeout(() => {
          this.getRecords()
        }, 500)
      }
    }
  },
  methods: {
    getRecords () {
      this.searchDone = false
      this.resultList = []
      this.processEndpoints (this.endpoints.slice())
    },
    processEndpoints (endpoints) {
      if(endpoints.length) {
        const endpoint = endpoints.shift()

        axios.get(endpoint.url, { params: Object.assign({}, { [endpoint.param]: this.fieldValue }, endpoint.extraParams || {} )}).then(response => {
          if(response.data.length) {
            this.resultList = response.data
          } else {
            this.processEndpoints(endpoints)
          }
        })
      } else {
        this.searchDone = true
      }
    },
    selectObject (item) {
      this.$emit('onSelect', item)
      this.reset()
    },
    reset () {
      this.searchDone = false
      this.fieldValue = ''
      this.resultList = []
    }
  }
}
</script>
<style lang="scss">
  .tw-autocomplete {
    .autocomplete-list:hover,
    .autocomplete-input:focus ~ .autocomplete-list {
        display: block;
    }

    .autocomplete-input {
      height: 30px;
      padding: 0px 8px 0px 8px;
      border: 1px solid #EAEAEA;
    }

    .autocomplete-list {
      display: none;
      margin: 0px;
      padding: 0px;
      position: absolute;
      box-shadow: 0px 2px 2px 0px rgba(0,0,0, 0.2);
      list-style: none;

      li {
        background-color: white;
        border-bottom: 1px solid black;
        padding: 8px;
        cursor: pointer;
      }

      li:last-child {
        border-bottom: none;
      }

      li:hover {
        background-color: #EDEDED;
      }
    }
  }
</style>