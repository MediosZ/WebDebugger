<template lang="pug">
  #app 
    Header(msg="Test! ").header
    .main
      .list
        Card.card(v-for="(item, index) in connections" :label="item" :key="index" :idx="index")
      
      router-view.view
</template>
<script>
import Vue from 'vue'
import Header from '@/components/Header'
import Card from '@/components/Card'
import {ipcRenderer} from 'electron'
import { writeFileSync, readFileSync, constants } from 'fs';
const { dialog } = require('electron').remote

export default Vue.extend({
  components:{
    Header,
    Card
  },
  created(){
    ipcRenderer.on('action', (event, arg) => {
      let path = ""
      switch(arg){        
      case 'save': //新建文件
          //console.log("click save")
          //console.log(this.$store.getters.getConns)
          path = dialog.showSaveDialog()
          //console.log(path)
          let data = JSON.stringify(this.$store.getters.getConns)
          writeFileSync(path, data)
          //console.log(data)
          //let restore = JSON.parse(data)
          //console.log(restore)
          //fs.writeFileSync(path, file)
          break;
      case 'load':
          path = dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })[0]
          let raw = readFileSync(path)
          let redata = JSON.parse(raw)
          console.log(redata)
          for(let item of redata){
            console.log(item)
            this.$store.commit('pushConns', item)
          }
          //this.$store.commit('restore', redata)
      }
    })
  },
  data(){
    return{
      connections: this.$store.getters.getConns
    }
  },
  computed:{

  }

})
</script>
<style lang="stylus">
  #app
    overflow hidden
    background-color #fafaf9 
    height 100%
    width 100%
    .header 
      position fixed
      display flex
      justify-content center
      align-items center
      height 100px
      width 100%
      z-index 5
      margin 0
      background-color #0099cc
      h1 
        color white
      .link 
        margin 20px
        text-decoration none
        color red 
        font-size 25px
    .main
      display flex
      flex-direction columns 
      margin 0
      height 100%
      width 100%
      
      .list
        position absolute
        display flex 
        flex-direction column
        width 20%
        height auto
        margin 0
        top 100px
        
        overflow auto
        .card
          margin 6px 
          margin-right 20px
      .view 
        width 75%
        height 80%
        margin 0
        padding 0
        position fixed
        right 0
        top 150px
        margin-right 20px
        background-color #fafaf9 



</style>
