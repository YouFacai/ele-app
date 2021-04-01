<template>
	<div>
		<publictop title='选择收获地址' :isreturn='isreturn' :returnaddress='returnaddress'></publictop>
		<location></location>
	</div>
</template>

<script>
	import publictop from '@/components/publictop'
	import location from '@/components/location'
	export default {
		components:{
			publictop,
			location,
		},
		data(){
			return {
				isreturn:true,
				returnaddress:'/home',
			}
		},
		
		// 路由守卫    控制这个返回  路由的跳转
		beforeRouteEnter(to, from, next) {
			if(from.path == '/AutoNaviabbr'){
				next(vm=>{
					vm._data.returnaddress = null;
				});
			}else {
				next();
			}
		}
	}
</script>

<style scoped="scoped">
	
</style>
