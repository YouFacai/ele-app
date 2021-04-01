<template>
	<div class="orderinfo">
		<publictop style="position: fixed;top: 0px;z-index: 800;" title='订单详情' :isreturn='true'></publictop>
		<!-- 顶部内容  如订单已送达 -->
		<div class="topbar">
			<div style="font-size: 30px;color: white;margin-left: 20px;position: relative;top: 10px;">订单已送达</div>
			<!-- topbar 中间的感谢框 -->
			<div class="thank">
				感谢您对尤子龙的信任，期待再次光临
			</div>
			<div class="advertising" >
				<mt-swipe :auto="3000" :show-indicators="false">
				  <mt-swipe-item>
					  <img src="../../assets/img/advertising1.png" alt="">
				  </mt-swipe-item>
				  <mt-swipe-item>
					<img src="../../assets/img/advertising2.png" alt="">
				  </mt-swipe-item>
				  <mt-swipe-item>
					<img src="../../assets/img/advertising3.png" alt="">
				  </mt-swipe-item>
				</mt-swipe>
			</div>
		</div>
		<!-- 具体的商品信息 -->
		<div class="bigcontent">
			<!-- 第一层消费信息 -->
			<div class="consumptionmsg">
				<div style="margin-left: 10px;padding-top: 20px;font-weight: 600;margin-bottom: 10px;">
					古茗 中心街 (洞头店)<i class="iconfont" style="color: #ccc;">&#xe60a;</i>
				</div>
				<div class="shoppinglist">
					<div style="float: right;position: relative;top: 18px;margin-right: 20px;font-weight: 600;">￥{{datalist.datalist.currentconsumption}}</div>
					<li v-for="(data,index) in datalist.datalist.datamsg" :key='index'>
						<img :src="data.littleImageUrl" style="width: 70px;height: 70px;float: left;" alt="">
						<div class="shoppinglist_msg">
							<div style="
								width: 60%;
								height: auto;
								white-space: normal;
								word-break: break-all;
								font-weight: 600;
							">{{data.spuName}}</div>
							<div style="width: width: 60%;color: rgb(192,192,192);font-size: 14px;">默认</div>
							<div style="color: rgb(192,192,192);">×{{data.praiseNum}}</div>
						</div>
					</li>
				</div>
				<!-- 包装费 -->
				<div style="
					margin: auto;
					width: 96%;
					padding: 6px;
					font-size: 14px;
				">包装费
					<span style="float: right;font-size: 16px;font-weight: 600;">￥0</span>
				</div>
				<!-- 配送费 -->
				<div style="margin: auto;width: 96%;padding: 6px;font-size: 14px;">
					配送费(蓝骑士专送)
					<span style="float: right;font-size: 16px;font-weight: 600;">￥0</span>
				</div>
				<!-- 优惠 -->
				<div class="discounts">
					<div>
						<svg class="icon" aria-hidden="true" style="width: 25px;height: 25px;">
						    <use xlink:href="#icon-xin"></use>
						</svg>
						<span style="position: relative;top: -5px;left: 7px;font-size: 14px;">店铺满减</span>
						<span style="color: red;float: right;">-￥1</span>
					</div>
					<div>
						<svg class="icon" aria-hidden="true" style="width: 27px;height: 27px;">
						    <use xlink:href="#icon-method-draw-image"></use>
						</svg>
						<span style="position: relative;top: -5px;left: 5px;font-size: 14px;">红包/抵用卷</span>
						<span style="color: red;float: right;">-￥{{datalist.datalist.redpacket}}</span>
					</div>
				</div>
				<!-- 商家联系电话 和购物车  -->
				<div class="shopping">
					<!-- 商家电话 -->
					<svg class="icon" aria-hidden="true" style="width: 27px;height: 27px;margin-top: 18px;margin-left: 10px;">
					    <use xlink:href="#icon-dianhua"></use>
					</svg>
					<span style="position: relative;top: -8px;margin-left: 5px;font-size: 14px;color: #2C6FE1;">商家电话</span>
					<!-- 已优惠  和 实付 -->
					<span style="position: relative;top: -2px;float: right;margin-right: 10px;">实付￥<span style="font-size: 25px;font-weight: 600;">{{datalist.datalist.currentconsumption}}.00</span></span>
					<span style="font-size: 14px;position: relative;float: right;margin-right: 6px;">已优惠<span style="color: red;font-weight: 600;">￥{{datalist.datalist.redpacket+1}}</span> </span>
				</div>
			</div>
			<!-- 配送信息 -->
			<div class="Shipping_information">
				<div style=" font-weight: 600; width: 96%;margin: auto; height: 50px;line-height: 50px;margin-left: 10px;border-bottom: 1px solid rgb(192,192,192);">配送信息</div>
				<div class="Shipping_information">
					<div style=" width: 96%;margin: auto; height: 50px;line-height: 50px;margin-left: 10px;border-bottom: 1px solid rgb(192,192,192);">
						<span style="float: right;font-size: 14px;color: #ccc;margin-right: 10px;">尽快送达</span>
						<div >送达时间</div>
						
					</div>
					<!-- 收货地址 -->
					<div class="shipping_address">
						<div style="position: relative;top: 10px;">
							收货地址
							<span style="float: right;margin-right: 10px;color: #ccc;">{{datalist.datalist.Billingaddress[0].address}}{{datalist.datalist.Billingaddress[0].house}}</span>
						</div>
						<div style="float: right;margin-right: 10px; color: #ccc;margin-top: 12px;">{{datalist.datalist.Billingaddress[0].name}}({{datalist.datalist.Billingaddress[0].checkedsex}}) {{datalist.datalist.Billingaddress[0].phone}}</div>
					</div>
					<!-- 配送方式 -->
					<div class="parcel">
						<div >配送方式<span style="float: right;margin-right: 10px;color: #ccc;">蓝骑士专送</span></div>
					</div>
				</div>
			</div>
			<!-- 订单信息 -->
			<div class="ordermsg">
				<div style="
					font-weight: 600;
					width: 96%;
					margin: auto auto auto 10px;
					height: 50px;
					line-height: 50px;
					border-bottom: 1px solid rgb(192, 192, 192);
				">订单信息</div>
				<!-- 订单号 -->
				<div class="order_number">
					订单号
					<span style="color: #65A6FF;float: right;">复制</span>
					<span style="float: right;margin-right: 40px;color: #ccc;">{{datalist.datalist.transaction_code}}</span>
				</div>
				<!-- 支付方式 -->
				<div style='
					width: 96%;
					margin: auto;
					height: 50px;
					border-bottom: 1px solid rgb(192,192,192);
					line-height: 50px;
				'>
					支付方式
					<span style="float: right;font-size: 16px;color: #ccc;">在线支付</span>
				</div>
				<!-- 下单时间 -->
				<div style='
					width: 96%;
					margin: auto;
					height: 50px;
					line-height: 50px;
				'>
					下单时间
					<span style="float: right;font-size: 16px;color: #ccc;">{{datalist.datalist.ordertime}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import publictop from '@/components/publictop'
	import { Swipe, SwipeItem } from 'mint-ui';
	Vue.component(Swipe.name, Swipe);
	Vue.component(SwipeItem.name, SwipeItem);
	export default {
		components:{
			publictop,
			
		},
		
		data(){
			return {
				datalist:[],
			}
		},
		
		beforeRouteEnter(to,from,next) {
			next(vm=>{
				console.log(to.params)
				vm.datalist = to.params;
			})
		}
	}
</script>

<style scoped="scoped">
	.orderinfo {
		width: 100%;
		height: auto;
	}
	
	.topbar {
		margin-top: 50px;
		width: 100%;
		height: 215px;
		background-image: linear-gradient(#65A6FF, #F1F1F1);
	}
	
	/* 感谢 */
	.thank {
		width: 96%;
		margin: auto;
		text-align: center;
		height: 60px;
		background-color: white;
		border-radius: 8px;
		margin-top: 20px;
		line-height: 60px;
		font-size: 18px;
	}
	
	.advertising {
		width: 96%;
		margin: auto;
		height: 80px;
		border-radius: 8px;
		margin-top: 10px;
	}
	
	.advertising img {
		width: 100%;
		height: 80px;
	}
	
	/* 内容外面的大框 */
	.bigcontent {
		width: 96%;
		height: auto;
		margin: auto;
		border-radius: 8px;
	}
	
	/* 第一块消费内容 */
	.consumptionmsg {
		background-color: white;
	}
	
	.shoppinglist {
		width: 100%;
		height: auto;
	}
	
	.shoppinglist li {
		width: 100%;
		list-style: none;
		height: auto;
		overflow: hidden;
	}
	
	.shoppinglist_msg {
		width: calc(100% - 85px);
		height: 100px;
		margin-left: 85px;
	}
	
	/* 满减优惠 */
	.discounts {
		margin: 5px auto 0px;
		width: 96%;
		height: 70px;
		border-bottom: 1px solid rgb(192,192,192);
	}

	/* 购物车 和商家电话 */
	.shopping {
		width: 100%;
		height: 65px;
		line-height: 65px;
	}
	
	/* 配送信息的大盒子 */
	.Shipping_information {
		width: 100%;
		height: 190px;
		background-color: white;
		border-radius: 8px;
		margin-top: 8px;
	}
	
	.shipping_address {
		margin: 5px auto 0px;
		width: 96%;
		height: 70px;
		border-bottom: 1px solid rgb(192,192,192);
	}
	
	.parcel {
		margin: 5px auto 0px;
		width: 96%;
		height: 50px;
		line-height: 50px;
		margin-left: 10px;
	}
	
	.ordermsg {
		width: 100%;
		height: 205px;
		background-color: white;
		margin-top: 73px;
		border-radius: 8px;
		position: relative;
		bottom: 8px;
	}
	
	/* 订单号 */
	.order_number {
		width: 96%;
		margin: auto;
		height: 50px;
		border-bottom: 1px solid rgb(192,192,192);
		line-height: 50px;
	}
</style>
