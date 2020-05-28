  
<template>
    <div>The component will appear here</div>
</template>
<script>
import axios from 'axios'
var host = 'http://localhost:8015/'
import WebDataRocks from 'webdatarocks'
export default {
  mounted: function() {
    axios.get(host + 'api/publikasi/').then(res => {
      console.log(res.data)
      this.webdatarocks = new WebDataRocks({
        report: { data: res.data },
        container: this.$el,
        toolbar: true
      })
    })
  },
  beforeUpdate() {
    return false
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '~webdatarocks/webdatarocks.min.css';
</style>
