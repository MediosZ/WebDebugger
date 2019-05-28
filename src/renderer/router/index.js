import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [    
    {
      path: '/',
      name: 'main',
      component: require('@/components/Client').default
    },
    {
      path: '/detail',
      name: 'detail',
      component: require('@/components/Detail').default
    },

  ]
})
