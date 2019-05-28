<template lang="pug">
#detail
  el-button.ret(@click="goback()") X
  h1.fix Response Details:
  .content(v-if="res")
    .con 
      p.res-key url: 
      p.res-val {{res.url}}
    .con 
      p.res-key status:
      p.res-val {{res.status}}
    .con 
      p.res-key methods:
      p.res-val {{res.res.config.method}}
    .con 
      p.res-key headers:
      p.res-val {{res.res.headers}}
    .con 
      p.res-key content_type:
      p.res-val {{res.res.headers["content-type"]}}
    .con 
      p.res-key params:
      p.res-val {{res.res.config.params || res.res.config.data}}
    .con 
      p.res-key data:
      p.res-val {{res.res.data}}

</template>

<script lang="ts">
/*
    .res-left
      p.res-key url: 
      p.res-key status:
      p.res-key method: 
      p.res-key headers:
      p.res-key content_type:
      p.res-key params:
      p.res-key data: 
    .res-right
      p {{res.url}}
      p {{res.status}}
      p {{res.res.config.method}}
      p {{res.res.headers}}
      p {{res.res.headers["content-type"]}}
      p {{res.res.config.params || res.res.config.data}}
      p {{res.res.data}}
*/
module.exports = {
  data(){
    return{
      msg: "hello",
      res: null,
      index: this.$store.getters.getIndex
    }
  },
  created(){
    console.log("created")
    this.idx = this.$store.getters.getIndex
    //console.log(this.idx)
    this.res = this.$store.getters.getConns[this.idx]   
  },
  watch: {
     '$store.state.detail_idx': function(){
        console.log("state changed ")
        this.idx = this.$store.getters.getIndex
        //console.log(this.idx)
        this.res = this.$store.getters.getConns[this.idx]
     }
  },
  methods:{ 
    goback(){
      //console.log("go back")
      this.$router.push('/')
    },
    reload() {
      console.log("got detail")
      //console.log(this.$route.params)
      this.idx = this.$store.getters.getIndex
      //console.log(this.idx)
      this.res = this.$store.getters.getConns[this.idx]
    },
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#detail 
  background-color #eee
  overflow auto
  width 100%
  .fix 
    color blue
    position fixed 
    top 100px
    margin-top 10px
  .ret 
    margin-top 10px
    position fixed 
    top 100px
    right 0
  .content
    width 100%
    font-size 25px
    margin-top 30px
    display flex
    flex-direction column
    .con
      .res-key
        width 150px
        color white
        border white solid thin
        background-color #006699
        padding 10px
        margin 10px
        border-radius 10px
      .res-val
        margin 20px
        margin-left 60px
        font-weight bold

</style>
