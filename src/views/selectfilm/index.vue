<template>
	<div>
		<publictop title="搜索" :isreturn='true'></publictop>
		<div class="topbar">
			<div class="input_box">
				<i class="iconfont search_icon">&#xe612;</i>
				<input type="text" placeholder="请输入您要搜索的电影" v-model="filmval" class="searchcity" />
			</div>
			<span class="return" @click="select()">搜索</span></br>
		</div>
		<selectfilmlist ></selectfilmlist>
	</div>
</template>

<script>
	import selectfilmlist from '@/components/selectfilmlist/index.vue'
	import publictop from '@/components/publictop/index.vue'
	export default {
		components:{
			publictop,
			selectfilmlist
		},
		
		data(){
			return {
				filmval:'',
				datalist:[],
				tempdata:[],
			}
		},
		
		watch:{
			filmval(newval,oldval){
				this.datalist=this.screeningfilm(newval);
			}
		},
		
		methods:{
			// 筛选电影
			screeningfilm(data){
				var temparr=this.tempdata.filter((item,index)=>{
					return item.name.indexOf(data)!=-1;
				})
				return temparr;
			},
			
			// 点击搜索
			select(){
				// 和实时监听是一样的效果
				this.datalist=this.screeningfilm(this.filmval);
				// 存 vuex  是用搜索点击来的 
				this.$store.commit('users/ISCHECKSELECT',true)
			}
		},
		
		mounted() {
			// 请求一次全部电影
			this.$axios('https://m.maizuo.com/gateway/?cityId=310100&pageNum=1&pageSize=50&type=1&k=2152164',{
				headers:{
					'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1595938362186418760515585","bc":"310100"}',
					'X-Host': 'mall.film-ticket.film.list'
				}
			}).then(resp=>{
				this.datalist = resp.data.data.films;
				this.tempdata = resp.data.data.films;
			}).catch(err=>{
				console.log(err)
			})
		}
	}
</script>

<style scoped="scoped">
	.topbar {
		width: 100%;
		height: 60px;
		background-color: white;
	}
	
	/* 输入框外面的灰色盒子 */
	.input_box {
		width: 75%;
		background-color: #F1F1F1;
		height: 40px;
		border-radius: 8px;
		float: left;
		margin-left: 7%;
		margin-top: 10px;
	}
	
	.return {
		color: #7AB2FF;
		float: left;
		margin-top: 17px;
		margin-left: 10px;
	}
	
	/* icon 图标 */
	.search_icon {
		font-size: 22px;
		line-height: 40px;
		margin-left: 10px;
		opacity: 0.5;
	}
	
	/* input 输入框 */
	.searchcity {
		position: relative;
		top: -5px;
		margin-left: 3px;
		outline: none;
		border: none;
		background-color: #F1F1F1;
	}
</style>
