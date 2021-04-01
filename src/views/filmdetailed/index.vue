<template>
	<div style="background-color: white;">
		<!-- 全局蒙版 -->
		<div class="masking" v-if="isshow" @click="isshow=false"></div>
		<!-- 顶部导航栏 -->
		<div class="topbar">
			<i class="iconfont" style="color: white; font-size: 20px;margin-left: 5%;" @click="$router.push('/home')">&#xe641;</i>
			<div style="position: relative;top: -90px; background-color: red;">
				<i class="iconfont" style="color: white; font-size: 24px;float: right;margin-right: 20px;">&#xe672;</i>
				<span style="color: white;float: right;">收藏</span>
				<i class="iconfont" style="color: white; font-size: 20px;float: right;">&#xe647;</i>
				<i class="iconfont" style="color: white; font-size: 26px;float: right;">&#xe612;</i>
			</div>
		</div>
		<!-- 顶部内容 -->
		<div class="topcontents">
			<div style="background-color: #000;">
				<img ref='bgimg' src="../../assets/img/guming.jpg" class="topcontents_bg"/>
			</div>
			<div style="justify-content: center;display: flex;height: 30px;">
				<img :src="datalist.shopPic" style="width: 80px;position: relative;top: -50px;height: 70px;" />
			</div>
			<!-- 点击商家店铺 显示具体信息 -->
			<div class="merchantmsg" @click="isshow=true">
				<div style="text-align: center;font-weight: 600;font-size: 22px;">{{datalist.shopName}}</div>
			</div>
			<transition name="merchantmsgbox">
				<merchantmsgbox :isshow='isshow'></merchantmsgbox>
			</transition>
			<div style="text-align: center;color: #999;font-size: 14px;margin-top: 5px;margin-bottom: 10px;">评分4.8 月售999+ 美团专送约41分钟</div>
			<div style="width: 100%;display: flex;justify-content: center;white-space: nowrap;">
				<img src="http://p0.meituan.net/activityconfig/dfb8be4fc2eb746ecbc4c1485dba635a1127.png" style="width: 20px;height: 20px;" alt="">
				<div style="font-size: 14px;color: #999;">{{datalist.actDesc}}</div>
			</div>
		</div>
		<!-- 点餐   评价   商家   三个组件跳转 -->
		<div style="width: 100%;position: relative;">
			<navbar></navbar>
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
	</div>
</template>

<script>
	import merchantmsgbox from '@/components/merchantmsgbox'
	import navbar from '@/components/navbar'
	export default {
		mounted() {
			this.$axios.post('/users/milkytea').then(resp=>{
				// console.log(resp.data.data)
				this.datalist = resp.data.data;
			})
		},
		
		methods:{
		},
		
		data(){
			return {
				datalist:[],
				isshow:false
			}
		},
		
		components:{
			merchantmsgbox,
			navbar
		}
	}
</script>

<style scoped="scoped">
	/* 全局蒙版 */
	.masking {
		width: 100%;
		height: 100%;
		opacity: 0.5;
		background-color: #999;
		position: absolute;
		z-index: 900;
	}
	
	/* 顶部的导航栏 */
	.topbar {
		width: 100%;
		height: 80px;
		background-color: transparent;
		position: relative;
		z-index: 900;
		line-height: 80px;
	}
	
	.topcontents {
		width: 100%;
		height: 200px;
		position: relative;
		top: -160px;
	}
	
	.topcontents_bg {
		width: 100%;
		height: 160px;
		opacity:0.6;
		filter: alpha(opacity=80);
	}
	
	.topcontents {
		width: 100%;
		height: 200px;
	}
	
	/* 顶部的商家信息 */
	.merchantmsg {
		width: 100%;
		height: auto;
	}
	
	/* 过渡动画 */
	.merchantmsgbox-enter-active {
		transition: opacity 2s;
	}
	.merchantmsgbox-enter, .merchantmsgbox-leave-to {
		opacity: 0;
		transition: opacity 2s;
	}

</style>
