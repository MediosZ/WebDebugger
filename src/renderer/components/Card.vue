<template lang="pug">
#card
  el-button.del-btn(@click="del(idx)" size='mini' type="danger") X
  p.card-url {{label.url}}
  p(v-if="label.res.config") method:{{label.res.config.method}}
  p.succ(v-if="label.status === 200") status: {{label.status}}
  p.fail(v-else) status: {{label.status}}
  //router-link(:to="{ name: 'detail', params: { idx: test }}") detail {{test}}
  el-button(@click="push(idx)") detail 
</template>

<script>

module.exports =  {
  props: ['label', 'idx'],
  data(){
    return{
      test:0
    }
  },

  created(){
    //console.log(this.label.url)
    //console.log(this.$props.idx)
    this.test = this.$props.idx
    //console.log(this.test)

  },
  methods:{
    del(index){
      //console.log(index)
      this.$store.commit('popConns', index)
      if(this.$store.getters.getConns.length === 0){
        this.$router.push({ path: '/' })
      }
    },
    push(i){
      //console.log(`router idx: ${i}`)
      this.$store.commit('changeDetailIndex', i)
      console.log(this.$store.getters.getIndex)
      //let p = `/detail/${i}`
      //console.log(p)
      this.$router.push({ path: '/detail' })
      
      //console.log(window.location.href)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#card 
  background-color #fff
  border solid #ddd thin
  .del-btn
    float right
    z-index 10
  .card-url 
    word-wrap break-word
    font-size 20px 
    font-weight bold

  .succ 
    font-size 15px
    color green 
  .fail 
    font-size 15px
    color red
</style>
