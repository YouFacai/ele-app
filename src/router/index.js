import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue'),
	children:[{
		path:'home',
		component:()=>import('@/views/home/index.vue')
	},
	{
		path:'/',
		redirect:'home'
	}]
	
  },
  {
  	path:'/me',
  	component:()=>import('@/views/me/index.vue')
  },
  {
	name:'orderinfo',
  	path:'/orderinfo',
  	component:()=>import('@/views/orderinfo/index.vue')
  },
  {
  	path:'/pay',
  	component:()=>import('@/views/pay/index.vue')
  },
  {
  	path:'/clearing',
  	component:()=>import('@/views/clearing/index.vue')
  },
  {
  	path:'/usableredpacket',
  	component:()=>import('@/views/clearing/usableredpacket.vue')
  },
  {
  	path:'/AutoNaviabbr',
  	component:()=>import('@/views/AutoNaviabbr/index.vue')
  },
  {
  	path:'/myaddress',
  	component:()=>import('@/views/me/myaddress.vue')
  },
  {
  	path:'/remark',
  	component:()=>import('@/views/clearing/remark.vue')
  },
  {
  	path:'/addaddress',
  	component:()=>import('@/views/me/addaddress.vue')
  },
  {
  	path:'/order',
  	component:()=>import('@/views/order/index.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
  	path:'/address',
  	component:()=>import('@/views/address/index.vue')
  },
  {
  	path:'/city',
  	component:()=>import('@/views/city/index.vue')
  },
  {
  	path:'/selectfilm',
  	component:()=>import('@/views/selectfilm/index.vue')
  },
  {
  	path:'/filmdetailed/:id',
  	component:()=>import('@/views/filmdetailed/index.vue'),
	redirect:'/filmdetailed/:id/shippingorder',
	children:[{
		path:'shippingorder',
		component:()=>import('@/views/filmdetailed/shippingorder.vue'),
	},
	{
		path:'evaluate',
		component:()=>import('@/views/filmdetailed/evaluate.vue'),
	},
	{
		path:'merchant',
		component:()=>import('@/views/filmdetailed/merchant.vue'),
	},
	]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
	//效果全局路由懒拦截 没有登录就定位到 Login
  //全局路由守卫   如果你还没登录本地就没有localStorage
  //如果是to.path == '/Login'  去登录的话那直接next()
	if(to.path == '/Login'){
		next()
	}else {
		//如果不是登录 但是已经登录过的 也直接next()
		if(window.localStorage.getItem('ele_login_id') !=null){
			next()
		}else {
		//如果不是登录 可是还没登录过的 就定向到/login  然后走28行的钩子的next()
		//next('/Login')知识个钩子他不能直接到  /Login
			next('/Login')
		}
	}
})

export default router
