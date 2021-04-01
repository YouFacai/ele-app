<template>
	<div class="announcement" v-if="isshowmask">
		<ul style="padding: 20px;" class="announcement_ul">
			<li v-for="(data,index) in datalist.activityList" :key='index'>
				<div>
					<img :src="data.iconUrl" alt="" style="width: 20px;height: 20px;margin-right: 10px;">
					<span>{{data.actDesc}}</span>
				</div>
			</li>	
			<div style="margin-top: 20px;font-size: 16px;">
				<div>配送</div>
				<div style='font-size: 12px;margin-top: 10px;'>起送￥20</div>
				<div style='font-size: 12px;'>配送时间：10:30-22:00</div>
			</div>
			<div style="margin-top: 20px;">
				<div>公告</div>
				<div style="font-size: 12px;margin-top: 10px;">{{datalist.tip}}</div>
			</div>
		</ul>
	</div>
</template>

<script>
	export default {
		props:{
			isshowmask:Boolean,
			datalist:Object
		}
	}
</script>

<style scoped="scoped">
	.announcement {
		width: 100%;
		height: auto;
		position: fixed;
		bottom: 0px;
		background-color: white;
		z-index: 900;
	}
	
	.announcement_ul li {
		list-style: none;
		margin-bottom: 8px;
	}
</style>
