<template>
	<div class="merchant">
		<div class="mask" @click="vanish()" v-if="isshowmask"></div>
		<div class="merchant_content">
			<div style="margin-top: 5px;">
				<svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-left: 20px;margin-top: 20px;">
				    <use xlink:href="#icon-location"></use>
				</svg>
				<div style="position: relative;top: -25px;left: 45px;">{{datalist.shopAddress}}</div>
			</div>
			<div>
				<svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-left: 20px;margin-top: 0px;">
				    <use xlink:href="#icon-anquan"></use>
				</svg>
				<div style="position: relative;top: -25px;left: 45px;">{{datalist.poiQualificationInfo.content}}</div>
			</div>
			<div>
				<svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-left: 20px;margin-top: 0px;">
				    <use xlink:href="#icon-shijian01"></use>
				</svg>
				<div style="position: relative;top: -25px;left: 45px;">配送时间: 10:30-22:00</div>
			</div>
			<div @click="showmsg()">
				<svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-left: 20px;margin-top: 0px;">
				    <use xlink:href="#icon-laba"></use>
				</svg>
				<div style="position: relative;top: -25px;left: 45px;width: 80%;height: 20px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{datalist.tip}}</div>
				<div style="position: relative;top: -45px;left: 350px;opacity: 0.5;">
					<svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-left: 20px;margin-top: 0px;">
					    <use xlink:href="#icon-xiala1"></use>
					</svg>
				</div>
			</div>
			<div style="margin-top: -30px;">
				<svg class="icon" aria-hidden="true" style="width: 15px;height: 15px;margin-left: 20px;margin-top: 0px;margin-right: 4px;">
				    <use xlink:href="#icon-ico_commodity_defaul"></use>
				</svg>
				<span>商家服务</span>
				<svg class="icon" aria-hidden="true" style="width: 15px;height: 15px;margin-left: 20px;margin-top: 0px;;margin-right: 4px;">
				    <use xlink:href="#icon-pai"></use>
				</svg>
				<span>商家服务</span>
				<svg class="icon" aria-hidden="true" style="width: 15px;height: 15px;margin-left: 20px;margin-top: 0px;;margin-right: 4px;">
				    <use xlink:href="#icon-fu"></use>
				</svg>
				<span >商家服务</span>
			</div>
			<div style="margin-left: 20px;margin-top: 20px;">
				<div v-for="(data,index) in datalist.activityList" :key='index'>
					<img :src="data.iconUrl" alt="" style="width: 20px;height: 20px;margin-right: 5px;">
					<span >{{data.actDesc}}</span>
				</div>
			</div>
		</div>
		<transition name="fade" >
			<merchantannouncement :isshowmask='isshowmask' :datalist='datalist'></merchantannouncement>
		</transition>
	</div>
</template>

<script>
	import merchant_announcement from '@/components/merchant_announcement'
	export default {
		components:{
			merchantannouncement:merchant_announcement,
		},
		
		mounted() {
			this.$axios.post('/users/merchant').then(resp=>{
				this.datalist = resp.data
				console.log(resp.data)
			})
		},
		
		data(){
			return {
				datalist:[],
				isshowmask:false,
			}
		},
		
		methods:{
			showmsg(){
				this.isshowmask = true;
			},
			
			vanish(){
				this.isshowmask = false
			}
		}
	}
</script>

<style scoped="scoped">
	.mask {
		width: 100%;
		height: 1000px;
		background-color: #999999;
		opacity: 0.5;
		position: fixed;
		top: 0px;
		z-index: 900;
	}
	
	.merchant {
		width: 100%;
		height: 600px;
		overflow: hidden;
	}
	
	/* 过渡动画 */
	.fade-enter-active, .fade-leave-active {
	   transition: all .5s ease;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	 transform: translateY(500px);
	}
</style>
