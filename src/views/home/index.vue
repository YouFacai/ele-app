<template>
	<div class="content">
		<div class="masking" v-if="this.$store.state.users.ismasking || this.$store.state.users.isscreen" @click="reset()"></div>
		<div class="swiper_img">
			<!-- 轮播图1 -->
			<mt-swipe :auto="2000" >
			<mt-swipe-item>
				<img src="@/assets/img/swper1.jpg" alt="" style="width: 100%;height: 100%;border-radius: 10px;">
			</mt-swipe-item>
			<mt-swipe-item>
				<img src="@/assets/img/swper2.jpg" alt="" style="width: 100%;height: 100%;border-radius: 10px;">
			</mt-swipe-item>
			<mt-swipe-item>
				<img src="@/assets/img/swper3.jpg" alt="" style="width: 100%;height: 100%;border-radius: 10px;">
			</mt-swipe-item>
			<mt-swipe-item>
				<img src="@/assets/img/swper4.jpg" alt="" style="width: 100%;height: 100%;border-radius: 10px;">
			</mt-swipe-item>
			</mt-swipe>
		</div>
		<!-- 轮播图2 -->
		<div class='swiper2'>
			<mt-swipe :auto="0" :showIndicators='false'   >
			<mt-swipe-item >
				<ul class="mt-swipe-item_ul">
					<li class="mt-swipe-item_li">
						<svg class="icon" aria-hidden="true" style="width: 100%;height: 100%;">
							<use xlink:href="#icon--happy" ></use>
						</svg>
						<div class="mt-swipe-item_ul_fontdiv">搞笑</div>
					</li>
					<li class="mt-swipe-item_li">
						<svg class="icon" aria-hidden="true" style="width: 100%;height: 100%;">
							<use xlink:href="#icon-huaxuegongye" ></use>
						</svg>
						<div class="mt-swipe-item_ul_fontdiv">化工</div>
					</li>
					<li class="mt-swipe-item_li">
						<svg class="icon" aria-hidden="true" style="width: 100%;height: 100%;">
							<use xlink:href="#icon-icon-test" ></use>
						</svg>
						<div class="mt-swipe-item_ul_fontdiv">恐怖</div>
					</li>
					<li class="mt-swipe-item_li">
						<svg class="icon" aria-hidden="true" style="width: 100%;height: 100%;">
							<use xlink:href="#icon-huaxueyongpin" ></use>
						</svg>
						<div class="mt-swipe-item_ul_fontdiv">化学</div>
					</li>
				</ul>
				<ul class="mt-swipe-item_ul">
					<li class="mt-swipe-item_li">
						<svg class="icon" aria-hidden="true" style="width: 100%;height: 100%;">
							<use xlink:href="#icon-huwai" ></use>
						</svg>
						<div class="mt-swipe-item_ul_fontdiv">体育</div>
					</li>
					<li class="mt-swipe-item_li">
						<svg class="icon" aria-hidden="true" style="width: 100%;height: 100%;">
							<use xlink:href="#icon-education" ></use>
						</svg>
						<div class="mt-swipe-item_ul_fontdiv">教育</div>
					</li>
					<li class="mt-swipe-item_li">
						<svg class="icon" aria-hidden="true" style="width: 100%;height: 100%;">
							<use xlink:href="#icon-aiqing" ></use>
						</svg>
						<div class="mt-swipe-item_ul_fontdiv">情感</div>
					</li>
					<li class="mt-swipe-item_li">
						<svg class="icon" aria-hidden="true" style="width: 100%;height: 100%;">
							<use xlink:href="#icon-youxi" ></use>
						</svg>
						<div class="mt-swipe-item_ul_fontdiv">游戏</div>
					</li>
				</ul>
			</mt-swipe-item>
			<mt-swipe-item>
				<div class="small_swiperbox">
					<ul class="mt-swipe-item_ul">
							<li class="mt-swipe-item_li">
								<svg class="icon" aria-hidden="true" style="width: 100%;height: 100%;">
									<use xlink:href="#icon-shouqiang" ></use>
								</svg>
								<div class="mt-swipe-item_ul_fontdiv">警匪</div>
							</li>
							<li class="mt-swipe-item_li">
								<svg class="icon" aria-hidden="true" style="width: 100%;height: 100%;">
									<use xlink:href="#icon-comwswcospa" ></use>
								</svg>
								<div class="mt-swipe-item_ul_fontdiv">动漫</div>
							</li>	
					</ul>
				</div>
			</mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="recommend">-- 推荐商家 --</div>
		<filterview  @filtration='filtration()' @okfrom='reset()'></filterview>
		<div style="width: 100%;height: 10px;background-color: #F1F1F1;"></div>
		<!-- home 下面的内容列表渲染 -->
		<homelist :datalist='selectfilms'></homelist>
	</div>
</template>

<script>
	//swiper 组件
	import { Swipe, SwipeItem } from 'mint-ui';
	import Vue from 'vue'
	import filterview from '@/components/filterview'
	import homelist from '@/components/homelist'
	Vue.component(Swipe.name, Swipe);
	Vue.component(SwipeItem.name, SwipeItem);
	export default {
		data(){
			return {
				allfilms:[],
				selectfilms:[],
			}
		},
		mounted(){
			// 把第一页的电影都请求过来
				this.$axios('https://m.maizuo.com/gateway/?cityId=310100&pageNum=1&pageSize=50&type=1&k=2152164',{
					headers:{
						'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1595938362186418760515585","bc":"310100"}',
						'X-Host': 'mall.film-ticket.film.list'
					}
				}).then(resp=>{
					this.allfilms = resp.data.data.films;
					this.selectfilms = resp.data.data.films;
				}).catch(err=>{
					console.log(err)
				})
		},
		methods:{
			filtration(data){
				//Vuex 存的电影类型
				var filmtype = this.$store.state.users.Filtertype;
				this.selectfilms = this.allfilms.filter((itme,index)=>{
					return itme.category.indexOf(`${filmtype}`)!= -1
				})
				// this.$nextTick(()=>{
				// 	console.log(this.selectfilms)
				// })
			},
			reset(){
				this.$store.commit('users/ISMASKING',false)
				this.$store.commit('users/ISSCREEN',false)
			}
		},
		components:{
			filterview,
			homelist,
		}
	}
</script>

<style scoped="scoped">
	/* 蒙版 */
	.masking {
		width: 100%;
		height: 100%;
		background-color: #999;
		opacity: 0.7;
		position: fixed;
		top: 0;
		z-index: 800;
	}
		
	/* 整体内容 */
	.content {
		width: 100%;
		height: auto;
		background-color: white;
	}
	
	/* 里面的轮播 */
	.swiper_img {
		width: 92%;
		height: 100px;
		padding: 10px 4%;
	}
	
	/* 第二个轮播的大盒子 */
	.swiper2 {
		width: 100%;
		height: 190px;
		background-color: white;
		overflow: hidden;
	}
	
	.mt-swipe-item_ul{
		width: 100%;
		height: auto;
		padding: 0px;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		margin-bottom: 10px;
	}
	
	.mt-swipe-item_li {
		width: 50px;
		height: 70px;
		list-style: none;
		padding: 0 10px;
		text-align: center;
	}
	
	/* icon下面的font */
	.mt-swipe-item_ul_fontdiv {
		position: relative;
		top: -10px;
		font-weight: 600;
	}
	
	/* 推 荐  文字 */
	.recommend {
		text-align: center;
		font-weight: 600;
		margin-bottom: 10px;
	}
</style>
