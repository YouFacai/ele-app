<template>
	<div>
		<div class="mask" v-if="isshowbasket && iscartempty!=true"></div>
		<div class="basket" v-if="isshowbasket && iscartempty!=true">
			<div class="Deliveryconditions">已满足起送价</div>
			<div class="basket_head">
				<div style="font-size: 14px;">购物车</div>
				<div class="clearcart" @click="clearcart()">
					<img src="../../assets/img/trash.png" alt="" style="width: 20px;height: 20px;position: relative;top: 5px;left: -5px;">
					<span>清空购物车</span>
				</div>
			</div>
			<div class="basket_content">
				<ul class="basket_content_ul">
					<li v-for="(data,index) in allcommodity" :key='index'>
						<img :src="data.littleImageUrl" alt="" style="width: 90px;height: 90px;float: left;">
						<div class="datacontent">
							<div style="padding-left: 10px;padding-top: 15px;font-size: 14px;font-weight: 600;">{{data.spuName}}</div>
							<div style="font-size: 14px;color: #999;margin-top: 2px;">+加椰果 / 正常冰 / 七分甜 (推荐)</div>
							<div style="color: red;margin-left: 10px;margin-top: 5px;">￥{{data.currentPrice * data.praiseNum}}</div>
							<div style="position: relative;z-index: 900;top: 30px;" @click="update(data)">
								<calculate style="float: right;margin-right: 130px;width: 150px;" :num='data.praiseNum' @updatenum='updatenum'></calculate>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="cart">
			<div class="logo" @click="showbasket()">
				<div class="sumcount" v-if="sumcount!=0">{{sumcount}}</div>
				<img style="width: 50px;height: 50px;position: relative;left: 10px;top: -10px;" :src="iscartempty?'//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9096d347/c6896f9806bdcb2399cb680fb5dec8c0.png':'		http://s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9096d347/03098cb323a0263fdbbb102c696433c5.png'" alt="">
			</div>
			<div @click="showbasket()">
				<div style="font-size: 20px;margin-left: 20px;color: white;" v-if="!iscartempty">￥{{sumprice}}</div>
				<div style="font-size: 14px;margin-left: 20px;">另需配送费￥4</div>
			</div>
			<!-- 支付  /   20元起送 -->
			<div :class="sumprice<20?'Uptosend':'buy'">
				<div v-if="!sumprice">20元起送</div>
				<div v-else-if="sumprice<20">
					还差{{20-sumprice}}元
				</div>
				<div v-else @click="settle()">去结算</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	import calculate from '@/components/calculate'
	export default {
		components:{
			calculate,
		},
		
		props:{
			iscartempty:{
				default:true,
				type:Boolean,
			},
			sumprice:Number,
			sumcount:Number,
			allcommodity:Array,
		},
		
		methods:{
			showbasket(){
				this.isshowbasket=!this.isshowbasket;
			},
			
			updatenum(data){
				this.tempnum = data 
			},
			
			update(data){
				data.praiseNum = this.tempnum; 
			},
			
			clearcart(){
				this.allcommodity.forEach((item,index)=>{
					item.praiseNum=0;
				})
			},
			
			// 点击去结算
			settle(){
				// 将选中的商品存 vuex
				this.$store.commit('users/SHOPPINGDATA',this.allcommodity);
				// 跳转路由到  商品结算
				this.$router.push('/clearing');
			}
		},
		
		data(){
			return {
				isshowbasket:false,
				tempnum:Number,
			}
		},
		
		watch:{
		},
		
	}
</script>

<style scoped="scoped">
	/* 遮罩层 */
	.mask {
		width: 1000%;
		height: 1300px;
		position: absolute;
		top: -500px;
		z-index: 900;
		background-color: #999;
		opacity: 0.6;
	}
	
	.cart {
		z-index: 2;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background: #3b3b3c;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		color: #999;
		height: 50px;
		z-index: 900;
	}
	
	/* 20元起送 */
	.Uptosend {
		width: 80px;
		height: 50px;
		background-color: #3b3b3c;
		font-size: 14px;
		font-weight: 600;
		position: absolute;
		right: 0;
		text-align: center;
		line-height: 50px;
	}
	
	/* 购物车有多少个东西 */
	.sumcount {
		position: absolute;
		left: 40px;
		top: -15px;
		color: #fff;
		background-color: #FB4E44;
		font-size: 13px;
		width: 20px;
		height: 20px;
		z-index: 900;
		line-height: 20px;
		border-radius: 50%;
		text-align: center;
	}
	
	/* 立即购买 */
	.buy {
		width: 60px;
		height: 50px;
		color: #333;
		font-size: 16px;
		height: 50px;
		line-height: 50px;
		background: #f8c74e;
		padding: 0 30px;
		position: absolute;
		right: 0;
		text-align: center;
		line-height: 50px;
	}
	
	/* 上面部分的菜篮子 */
	.basket {
		width: 100%;
		height: auto;
		max-height: 300px;
		position: fixed;
		bottom: 50px;
		z-index: 900;
	}
	
	/* 已满足配送条件 */
	.Deliveryconditions {
		background: #fff1d0;
		text-align: center;
		height: 25px;
		line-height: 25px;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		letter-spacing: 0.15px;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-justify-content: center;
		-ms-flex-pack: center;
		justify-content: center;
		font-size: 11px;
	}
	
	.basket_head {
		width: 100%;
		line-height: 30px;
		height: 30px;
		background: #F4F4F4;
		padding: 4px 15px;
	}
	
	/* 清空购物车 */
	.clearcart {
		position: absolute;
		top: 30px;
		right: 10px;
		font-size: 14px;
	}
	
	/* 主要渲染的内容 */
	.basket_content {
		width: 100%;
		height: auto;
		overflow: auto;
	}
	
	.basket_content_ul {
		max-height: 237px;
		overflow: auto;
		background-color: white;
	}
	.basket_content_ul::-webkit-scrollbar {display:none}
	
	.basket_content_ul li {
		height: 100px;
	}
	
	.datacontent {
		width: calc(100% - 90px);
		height: 100px;
		overflow: hidden;
	}
</style>
