<template lang="pug">
#header
  h1 Line for Everyone !
</template>

<script lang="ts">

module.exports = {
  data(){
    return{
      msg: "hello",
      count: this.$store.getters.getCount
    }
  },
  computed:{
    c(){
      return this.$store.getters.getCount
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#header 
  background-color #eee
</style>
