<template lang="pug">
#client
  .action
    el-select(v-model="value" placeholder="请选择")
      el-option(v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value")
    el-input.url(placeholder="input some " v-model="url")
    el-button(type="primary", @click="Send()") Send
  .change-btns
    el-button.btn(@click="showParam = false") Params
    el-button.btn(@click="showParam = true") Headers
  .params-box(v-if="showParam === true")
    .params-label
      h3 Headers 
      el-button.btn(@click="addHeaders()" ) add headers
      el-button.btn(@click="hfold = !hfold") Fold
    h4(v-if="hfold") Folded Headers
    .params-input(v-else v-for="pa in headers")
      p Key
      el-input(v-model="pa.key")
      p Value
      el-input(v-model="pa.value")
  .params-box(v-else)
    .params-label
      h3 Params 
      el-button.btn(@click="addParams()" ) add params
      el-button.btn(@click="pfold = !pfold") Fold
    h4(v-if="pfold") Folded Params
    .params-input(v-else v-for="pa in params")
      p Key
      el-input(v-model="pa.key")
      p Value
      el-input(v-model="pa.value")
  h2(v-if="msg === 'wrong'") something is {{msg}}! 
  h2(v-if="msg === 'wrong'") check out the url!  
  h2(v-if="msg === 'method'") Please choose a method
  .client-view(v-if="res && msg !== 'wrong'")
    el-button.btn(@click="flag=true") raw
    el-button.btn(@click="flag=false") preview
    .raw(v-if="flag" )
      h4(v-if="/<html/.test(res.res.data)") {{res.url}}
      h4(v-else) {{res.res.data}}
    .preview(v-else )
      iframe.frame(v-if="/<html/.test(res.res.data)" :src="res.url")
      pre.pre(v-else v-html="highlight")


    
  //.params(v-for="(value, name) in res")
  //  p {{name}} : {{value}}
</template>

<script>

import axios from 'axios';
import { doesNotThrow } from 'assert';
import { constants } from 'fs';

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'jnumber';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'jkey';
            } else {
                cls = 'jstring';
            }
        } else if (/true|false/.test(match)) {
            cls = 'jboolean';
        } else if (/null/.test(match)) {
            cls = 'jnull';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

export default {
  data(){
    return{
      url:"http://www.mediosz.club:8084/",
      msg: "",
      fixed_url: "",
      requestMethods: {
        get: axios.get,
        post: axios.post,
        put: axios.put,
        delete: axios.delete
      },
      flag:true,
      pfold:false,
      hfold:false,
      showParam: false,
      headers: [{
          key: 'tes',
          value: 'aa'      
        },
        {
          key: 'taa',
          value: 'asss'   
        }],
      params: [{
          key: 'tes',
          value: 'aa'      
        },
        {
          key: 'taa',
          value: 'asss'   
        }],



      options:[
        {
          value: 'get',
          label: 'Get'
        }, {
          value: 'post',
          label: 'Post'
        }, {
          value: 'put',
          label: 'Put'
        }, {
          value: 'delete',
          label: 'Delete'
        }],
      value: "get",
    }
  },
  computed: {
    res(){
      return this.$store.getters.getFirstConn
    },
    highlight(){
      let s = JSON.stringify(this.$store.getters.getFirstConn.res.data, undefined, 4)
      let data = syntaxHighlight(s)
      console.log(data)
      return data
    }
    
  },
  methods:{
    Send() {
      this.$store.commit('increment', 5)
      //console.log(this.$store.getters.getCount)

      if(this.value){
        //console.log("send "+this.url)
        let flag = /http(s)?:\/\//.test(this.url)
        //console.log(flag)
        let url = this.url
        if(!flag){
          url = 'http://'+url
        }
        //console.log(url)
        if(this.value === 'get'){
          console.log(this.params)
          
          let params = {}
          for(let pa of this.params){
            console.log(`key: ${pa.key}, value: ${pa.value}`)
            params[pa.key] = pa.value
          }
          console.log(params)

          let headers = {}
          for(let pa of this.headers){
            console.log(`key: ${pa.key}, value: ${pa.value}`)
            headers[pa.key] = pa.value
          }
          console.log(headers)

          axios.get(url, {
            params: params,
            headers: headers
          })
          .then(res=>{
            //console.log(res)  
            //this.res = res
            this.msg = res.data
            this.$store.commit('pushConns', {
              url: url,
              status: res.status,
              res: res,
            })
            return 
            //this.res = this.$store.getters.getFirstConn
            //console.log(this.res)
          })
          .catch(e => {
            //console.log(e)
            this.msg = "wrong"
            console.log("get wrong")
            this.$store.commit('pushConns', {
              url: this.url,
              status: 404,
              res: "null",
            })
            return
          })
          
        } else if(this.value === 'post'){
          console.log(this.params)
          
          let params = {}
          for(let pa of this.params){
            console.log(`key: ${pa.key}, value: ${pa.value}`)
            params[pa.key] = pa.value
          }
          console.log(params)

          console.log('post')

          let headers = {}
          for(let pa of this.headers){
            console.log(`key: ${pa.key}, value: ${pa.value}`)
            headers[pa.key] = pa.value
          }
          console.log(headers)

          axios.post(url, params, {headers: headers})
          .then(res=>{
            //console.log(res)  
            //this.res = res
            this.msg = res.data
            this.$store.commit('pushConns', {
              url: this.url,
              status: res.status,
              res: res,
            })
            return 
            //this.res = this.$store.getters.getFirstConn
            //console.log(this.res)
          })
          .catch(e => {
            //console.log(e)
            this.msg = "wrong"
            this.$store.commit('pushConns', {
              url: this.url,
              status: 404,
              res: "null",
            })
            return
          })
        } else if(this.value === 'put'){
          console.log(this.params)
          
          let params = {}
          for(let pa of this.params){
            console.log(`key: ${pa.key}, value: ${pa.value}`)
            params[pa.key] = pa.value
          }
          console.log(params)

          console.log('put')

          let headers = {}
          for(let pa of this.headers){
            console.log(`key: ${pa.key}, value: ${pa.value}`)
            headers[pa.key] = pa.value
          }
          console.log(headers)

          axios.put(url, params, {headers: headers})
          .then(res=>{
            //console.log(res)  
            //this.res = res
            this.msg = res.data
            this.$store.commit('pushConns', {
              url: this.url,
              status: res.status,
              res: res,
            })
            return 
            //this.res = this.$store.getters.getFirstConn
            //console.log(this.res)
          })
          .catch(e => {
            //console.log(e)
            this.msg = "wrong"
            this.$store.commit('pushConns', {
              url: this.url,
              status: 404,
              res: "null",
            })
            return
          })
        } else if(this.value === 'delete'){
          console.log(this.params)
          
          let params = {}
          for(let pa of this.params){
            console.log(`key: ${pa.key}, value: ${pa.value}`)
            params[pa.key] = pa.value
          }
          console.log(params)

          console.log('delete')

          let headers = {}
          for(let pa of this.headers){
            console.log(`key: ${pa.key}, value: ${pa.value}`)
            headers[pa.key] = pa.value
          }
          console.log(headers)

          axios.delete(url, {
            params: params,
            headers: headers
          })
          .then(res=>{
            //console.log(res)  
            //this.res = res
            this.msg = res.data
            this.$store.commit('pushConns', {
              url: this.url,
              status: res.status,
              res: res,
            })
            return 
            //this.res = this.$store.getters.getFirstConn
            //console.log(this.res)
          })
          .catch(e => {
            //console.log(e)
            this.msg = "wrong"
            this.$store.commit('pushConns', {
              url: this.url,
              status: 404,
              res: "null",
            })
            return
          })
        } 
      }
      else{
        this.msg = "method"
      }

    },
    addParams(){
      console.log('add params')
      this.params.push({
          key: 'cookie',
          value: 'hash'   
        })
    },
    addHeaders(){
      console.log('add header')
      this.headers.push({
          key: 'header',
          value: 'test'   
        })
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#client
  overflow auto
  .btn
    margin 10px
  background-color #eee
  display block
  .action
    display flex
    .url 
      margin-right 50px
  .params-box
    .params-label
      display flex 
      flex-direction row
      align-items center
      h3 
        margin-right 20px
    .params-input
      display flex 
      flex-direction row
      align-items center
      p 
        margin 10px
        font-weight bold 
  h2 
    color red
  .client-view 
    
    font-size 25px
    color #333

    p 
      margin 0
      margin-top 10px
    .preview 
      .frame
        width 100%
        height 300px
      .pre 
        outline 1px solid #fff
        word-wrap break-word
        padding 5px 
        margin 5px

  
</style>
