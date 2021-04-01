<template>
	<div class="datalist" ref='datalist'>
		<img src="http://fuss10.elemecdn.com/2/67/64f199059800f254c47e16495442bgif.gif" style="width: 100%;" v-if="isfindfilm"/>
		<ul class="datalist_ul" v-else>
			<li v-for="data in datalist" :key='data.filmId' class="datalist_li" @tap="getfilmID(data.filmId)">
				<img :src="data.poster" style="width: 40px;height: 40px; margin-left: 30px;margin-top: 10px;float: left;" alt="">
				<div style="position: relative;top: 20px;left: 10px;width: 60%;text-overflow: ellipsis;overflow: hidden; white-space: nowrap;">{{data.name}}</div>
				<div style="font-size: 12px; overflow: hidden; position: relative;left: 190px;text-align: center;width: 100px;color: #708090;">评分{{data.grade || alt}}</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { InfiniteScroll } from 'mint-ui';
	Vue.use(InfiniteScroll);
	import BScroll from "better-scroll"
	export default {	
		data(){
			return {
				// 无评分的提示
				alt: "暂无",
				// 不需要未查到的图片
				isfindfilm:false,
				datalist:[],
				loading:false,
			}
		},
		
		watch:{
			datalist(newval,oldval){
				const bscroll = new BScroll(this.$refs.datalist, {
					 scrollbar:{
						 fade:false,	//是否需要滚动条
						 interactive:false
					 },
					 //注意better-scroll中  @click 是使用不了的  要用@tap
					 tap:true,
				})
				this.isfindfilm = false
			// 如果 1---传进来的是空 同时 2--是按了搜索传进来的
			if(this.datalist.length == 0 && this.$store.state.users.ischeckselect){
				this.$store.commit('users/ISCHECKSELECT',false);
				// 下面做图片的渲染
				this.isfindfilm = true
			}	
			}
		},
		
		mounted() {
			this.$axios('https://m.maizuo.com/gateway/?cityId=310100&pageNum=1&pageSize=30&type=1&k=2152164',{
				headers:{
					'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1595938362186418760515585","bc":"310100"}',
					'X-Host': 'mall.film-ticket.film.list'
				}
			}).then(resp=>{
				this.datalist=resp.data.data.films;
			})
		},
		
		methods:{
			// 根据电影的id 跳到详细的   进行渲染
			getfilmID(id){
				//   存下id  在本地
				window.localStorage.setItem('filmID',id);
				this.$router.push(`/filmdetailed/${id}`)
			}
		}
	}
</script>

<style scoped="scoped">
	.datalist {
		width: 100%;
		background-color: white;
		height: 82vh;
		overflow: hidden;
	}
	
	/* 外面的小盒子 */
	.datalist_ul {
		height: auto;
	}
	
	/* selectfilmlist 下面的li标签 */
	.datalist .datalist_li {
		overflow: hidden;
	}
</style>
