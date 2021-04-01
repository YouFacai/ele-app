<template>
	<div style="overflow: scroll;height: 500px;">
	<mt-loadmore 
	 :top-method="loadTop"
	 :bottom-method="loadBottom" 
	 :bottom-all-loaded="allLoaded" 
	 :autoFill="false"
	 ref="loadmore">
		<div class="homelist">
			<ul>
				<li v-for="data in datalist" :key="data.filmId" class="homelist_ul_li" @click="getfilmID(data.filmId)">
					<img :src="data.poster" style="width: 100px;height: 120px;float: left;" />
					<div class="datamsg">
						<div style="overflow: hidden;height: 120px;">
							<svg class="icon" aria-hidden="true" style="width: 30px;height: 20px;margin-left: 5px;margin-top: 10px;">
								<use xlink:href="#icon-dianying"></use>
							</svg>
							<!-- 电影名字 -->
							<div style="font-size: 15px;position: relative;top: -25px;left: 35px;width: 60%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{data.name}}</div>
							<!-- 电影icon -->
							<ul style="width: 50px;height: 100%;overflow: hidden;position: relative;left: 75%;top: -45px;text-align: center;">
								<li v-if="data.grade>7.5"><i class="iconfont recommend">&#xe602;</i></li>
								<li v-if="data.filmType.name"><i class="iconfont is3D">&#xe7d1;</i></li>
							</ul>
							<!-- 电影 -->
							<div v-if="data.category" class="datacategory">
								{{data.category}}
							</div>
							<div  class="datadirector">
								演员名单：{{data.director || "暂无"}}
							</div>
							<!-- 电影上映时间 -->
							<div v-if="data.premiereAt" class="datapremiereAt">
								{{data.premiereAt | timefilter}}
							</div>
							<div class="datagrade">{{data.grade || "未评"}}分</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</mt-loadmore>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Loadmore } from 'mint-ui';
	// 定义一个全局的时间过滤器
	Vue.filter('timefilter',(data)=>{
		return new Date(parseInt(data) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ').split(' ')[0];
	})
	export default {
		props:{
			datalist:{
				type:Array
			},
		},
		methods:{
			// 上拉加载
			loadTop(){
				this.$axios('/gateway?cityId=310100&pageNum=1&pageSize=40&type=1&k=2152164',{
					headers:{
						'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1595938362186418760515585","bc":"310100"}',
						'X-Host': 'mall.film-ticket.film.list'
					}
				}).then(resp=>{
					// console.log(resp.data.data.films);
					this.$store.commit('users/CURRENTFILTERTYPE','全部');
					this.datalist=resp.data.data.films;
					// 复原
					this.$refs.loadmore.onBottomLoaded();
				}).catch(err=>{
					console.log(err)
				})
			},
			// 下拉加载
			loadBottom(){
				  this.allLoaded = true;// 若数据已全部获取完毕
				  setTimeout(()=>{
					  this.allLoaded = false;
					  this.$refs.loadmore.onBottomLoaded();
				  },1000)
			},
			
			// 根据电影的id 跳到详细的   进行渲染
			getfilmID(id){
				//   存下id  在本地
				window.localStorage.setItem('filmID',id);
				this.$router.push(`/filmdetailed/${id}`)
			}
		},
		data(){
			return {
				allLoaded:false,
				num:1,
				// 暂存一下传进来的datalist
				tempdata:[],
			}
		},
		
		// 用计算属性事实监听Vuex
		computed:{
			isrank(){
				return this.$store.state.users.isrank;
			}
		},
		
		// 事实监听isrank
		watch:{	
			isrank(newval,oldval){
				// 如果需要排序
				if(newval==true){
					this.datalist.forEach(item=>{
						if(!item.grade){
							item.grade=null
						}
					})
					this.datalist.sort((a,b)=>{
						return b.grade-a.grade
					})
				}else {
					this.datalist.sort(function() {
					    return .5 - Math.random();
					});
				}
			},
		},
		mounted() {

		}
	}
</script>

<style scoped="scoped">
	.homelist {
		padding-bottom: 50px;
		background-color: #F1F1F1;
	}
	
	/* home 下数据的格式 */
	.homelist_ul_li{
		background-color: white;
		overflow: hidden;
		width: 94%;
		margin-left: 3%;
		border-radius: 5px;
		margin-bottom: 8px;
	}
	
	/* msg盒子 */
	.datamsg {
		height: 120px;
	}
	
	/* iconfont 推荐图标 */
	.recommend {
		font-size: 25px;
		color: #FF8C00;
	}
	
	/* 3d icon */
	.is3D{
		font-size: 17px;
		color: #65A6FF;
	}
	
	/* 电影类型的样式 */
	.datacategory {
		position: relative;
		top: -135px;
		left: 10px;
	}
	
	/* 演员 */
	.datadirector {
		position: relative;
		top: -135px;
		left: 10px;
		white-space: nowrap;
		text-overflow:ellipsis;
		overflow: hidden;
		width: 80%;
		margin-top: 8px;
	}
	
	/* 上映时间 */
	.datapremiereAt {
		position: relative;
		top: -135px;
		left: 10px;
		white-space: nowrap;
		text-overflow:ellipsis;
		overflow: hidden;
		width: 80%;
		margin-top: 8px;
	}
	
	/* 电影分数 */
	.datagrade {
		position: relative;
		top: -170px;
		left: 188px;
		margin-top: 8px;
	}
</style>
