<template>
	<div class="msgbox" v-if="isshow">
		<!-- 开始渲染 msgbox -->
		<div class="toptitle">
			<img src="@/assets/img/brand.png" alt="" class="toptitle_img">
			<span style="font-weight: 600;font-size: 18px;">{{datalist.shopName}}</span>
		</div>
		<!-- 中间部分 -->
		<div class="centre">
			<ul class='centre_ul'>
				<li>
					<div>4.8</div>
					<p>评分</p>
				</li>
				<li>
					<div>1000+</div>
					<p>月售</p>
				</li>
				<li>
					<div>美团专送</div>
					<p>约41分钟</p>
				</li>
				<li>
					<div>￥3元</div>
					<p>配送费</p>
				</li>
				<li>
					<div>1.9km</div>
					<p>距离</p>
				</li>
			</ul>
		</div>
		<div style="font-size: 14px;color: #999;margin-top: 10px;text-align: center;">--公告--</div>
		<!-- 公告提示语 -->
		<div style="font-size: 14px;font-weight: 600;margin-top: 10px;text-align: center;">{{datalist.deliveryMsg}}</div>
	</div>
</template>

<script>
	export default {
		props:{
			isshow:{
				default:false,
				type:Boolean
			}
		},
		
		data(){
			return {
				datalist:[]
			}
		},
		
		mounted() {
			this.$axios.post('/users/milkytea').then(resp=>{
				this.datalist = resp.data.data;
			})
		}
	}
</script>

<style scoped="scoped">
	.msgbox {
		width: 310px;
		height: 200px;
		position: absolute;
		left: 50%;
		background-color: white;
		overflow: hidden;
		margin-left: -155px;
		z-index: 900;
		border-radius: 8px;
	}
	
	.toptitle {
		display: flex;
		justify-content: center;
		margin-top: 25px;
	}
	
	/* 品牌图片的样式 */
	.toptitle_img {
		border-radius: 10px;
		width: 50px;
		margin-right: 5px;
	}
	
	/* 中间部分 */
	.centre {
		width: 100%;
		margin-top: 20px;
	
	}
	
	.centre_ul {
		justify-content: space-around;
		display: flex;
		width: 100%;
		height: auto;
	}
	
	.centre li {
		float: left;
		list-style: none;
		width: auto;
		text-align: center;
	}
	
	.centre_ul div {
		font-weight: 600;
	}
	
	.centre p {
		font-size: 14px;
	}
</style>
