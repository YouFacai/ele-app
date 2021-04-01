<template>
	<div class="itemfood" v-if="isshowitemfood">
		<div class="itemfood_head">
			<img @click="$emit('cancel')" style="position: relative;width: 40px;height: 40px;float: right;margin-right: 20px;margin-top: 10px;" src="http://s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9096d347/df125964473c5a2c4edadb74d8a11995.png" alt="">
			<img :src="selectdata.bigImageUrl" alt="" style="width: 100%;height: 300px;">
		</div>
		<div class="itemfood_content">
			<div style="margin-left: 20px;margin-top: 10px;font-size: 18px;font-weight: 600;">{{selectdata.spuName}}</div>
			<div style="margin-left: 20px;margin-top: 10px;">
				<span style="color: red;font-size: 18px;">￥{{selectdata.currentPrice}}</span>
				<del style="font-size: 14px;color: #999;margin-left: 5px;">￥{{selectdata.originPrice}}</del>
			</div>
			<div style="position: relative;top: 20px;float: right;right: 170px;">
				<calculate  :num='selectdata.praiseNum' @updatenum='updatenum'></calculate>
			</div>
			<div style="margin-left: 20px;font-size: 14px;color: #999;margin-top: 10px;">
				{{selectdata.spuDesc}}
			</div>
		</div>
		<div class="appraise">
			<div style="font-size: 18px;font-weight: 600;">商品评价</div>
			<div style="margin-top: 30px;font-size: 14px;color: #999;">暂无评价</div>
		</div>
	</div>
</template>

<script>
	import calculate from '@/components/calculate'
	export default {
		components:{
			calculate
		},
		
		methods:{
			updatenum(data){
				this.selectdata.praiseNum = data;
			}
		},
		
		props:{
			isshowitemfood:Boolean,
			selectdata:Array,
		},
		
		watch:{
			selectdata(a,b){
				console.log(a)
			}
		}
	}
</script>

<style scoped="scoped">
	.itemfood {
		width: 100%;
		position: absolute;
		top: -280px;
		height: 1000px;
		z-index: 900;
		background-color: white;
	}
	
	/* 主要内容 */
	.itemfood_content {
		width: 100%;
		height: auto;
	}
	
	.appraise {
		margin-left: 20px;
		margin-top: 30px;
	}
</style>
