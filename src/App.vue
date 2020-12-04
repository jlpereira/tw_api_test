<template>
  <div id="app">
    <div class="topbar">
      <span>TaxonWorks Together 2020</span>
    </div>
    <div class="section-horizontal-layout">
      <div class="panel">
      <autocomplete @onSelect="setTaxonName"/>
      </div>
      <div class="panel">
        <h3 v-html="taxonName.cached_html"/>
        <pre>{{ JSON.stringify(taxonName, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script>

import Autocomplete from '@/components/autocomplete.vue'
import { GetTaxonName } from '@/request/resources.js'

export default {
  name: 'App',
  components: {
    Autocomplete
  },
  data () {
    return {
      taxonName: {}
    }
  },
  methods: {
    async setTaxonName (event) {
      this.taxonName = (await GetTaxonName(event.id)).data
    }
  }
}
</script>

<style lang="scss">
body {
  background: #EDEDED;
  padding: 0;
  margin: 0;
}
#app {
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  .section-horizontal-layout {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }

  .topbar {
    padding: 0px 8px 0px 8px;
    display: flex;
    height: 44px;
    background-color: #4a8b78;
    width: 100%;
    align-items: center;
  }
}

.panel {
  padding: 8px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.2);
}
</style>
