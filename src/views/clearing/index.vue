<template>
	<div class="clearing">
		<publictop style="position: fixed;top: 0px;z-index: 800;" title='确定订单' :isreturn='true' returnaddress='/filmdetailed/2864'></publictop>
		<div class="topbar">
			<!-- 公告内容 -->
			<div class="notice">
				<i class="iconfont">&#xe60d;</i>
				<span>为了减少接触，降低风险，请修改下方备注</span>
			</div>
			<div class="addressmsg">
				<div class="address">
					<!-- 提示文字    和    收货地址二选一 -->
					<div v-if="this.addressdata.length==0" style="width: 100%;height: 90px;background-color: white;border-radius: 8px;">
						<div class="selectfontaddress" v-if="this.addressdata.length!=0" @click="$router.push('/myaddress')">请选择配送地址</div>
						<div class="selectfontaddress" v-else @click="$router.push('/addaddress')">新增配送地址</div>
						<i class="iconfont" style="position: relative;top: -53px;float: right;margin-right: 20px;color: #ccc;">&#xe60a;</i>
					</div>
					<!-- 收货地址 -->
					<div v-else style="width: 100%;height: 70px;background-color: white;border-radius: 8px;" @click="$router.push('/myaddress')">
						<span style="margin-left: 10px;margin-top: 20px; font-size: 14px; display: inline-block;text-align: center;line-break: 30px; width: 40px;height: 20px;background-color: #E2F5FC;color: #40C0EF;">{{Billingaddress[0].checkedmemo}}</span>
						<!-- 详细地址 -->
						<span style="position: relative;top: 6px; margin-left: 10px;font-weight: 600;font-size: 20px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 80%;display: inline-block;">{{Billingaddress[0].address}}{{Billingaddress[0].house}}</span>
						<div style="margin-left: 10px;margin-top: 10px;color: #C4C4C4;font-size: 14px;">{{Billingaddress[0].name}}({{Billingaddress[0].checkedsex}}) {{Billingaddress[0].phone}}</div>
					</div>
					<!-- 选择时间 -->
					<div class="selectiontime">
						<div style="float: left;margin-left: 10px;">立即送出</div>
						<i class="iconfont" style="float: right;position: relative; top: 2px;left:-20px;color: #ccc;">&#xe60a;</i>
						<div style="float: right;position: relative;left: -35px; color: #32BCF2;">大约{{currenttime}}送到</div>
					</div>
					<!-- 选择支付方式 -->
					<div :class="addressdata.length?'selectionpayment':'selectionpayment2' ">
						<div style="float: left;margin-left: 10px;">支付方式</div>
						<i class="iconfont" style="float: right;position: relative; top: 2px;left:-19px;color: #ccc;">&#xe60a;</i>
						<div style="float: right;position: relative;left: -34px;color: #32BCF2;">支付宝</div>
					</div>
				</div>
			</div>
			<!-- 购物车中的商品 -->
			<div class="Rendering_goods">
				<div class="Rendering_goods_title">
					{{shopName}}
				</div>
				<div class="Renderinglist">
					<li v-for="(data,index) in shoppingdata" :key='index'>
						<img :src="data.littleImageUrl" style="width: 60px;height: 60px;float: left;" alt="">
						<div style="width: calc(100% - 70px);height: 60px;margin-left: 80px;">
							<div style="white-space:normal;word-break:break-all; width: 70%; font-weight: 600;font-size: 14px;">{{data.spuName}}</div>
							<div style="white-space:normal;word-break:break-all; width: 70%;font-size: 14px;color:rgb(196, 196, 196); margin-top: 5px;">
								默认/少糖/不加冰/加珍珠
							</div>
							<div class="quantity" style="color: rgb(196, 196, 196);font-size: 14px;">
								×{{data.praiseNum}}
							</div>
						</div>
						<!-- 单价 -->
						<div class="univalence">
							￥{{data.currentPrice}}
						</div>
					</li>
				</div>
				<!-- 包装费 -->
				<div class="packing">
					<span style="font-size: 14px;">包装费</span>
					<span style="float: right;font-weight: 600;margin-right: 20px;">￥4</span>
				</div>
				<!-- 配送费 -->
				<div class="delivery">
					<span style="font-size: 14px;">配送费(蓝骑士专送)</span>
					<span style="float: right;font-weight: 600;margin-right: 20px;">￥0</span>
					<div style="font-size: 13px;color: red;margin-top: 3px;">免费配送</div>
					<del style="float: right;font-weight: 600;margin-right: 20px;color: rgb(196, 196, 196);position: relative;top: -15px;">￥5</del>
				</div>
				<!-- 店铺 -->
				<div class="Discountstores">
					<svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;">
					    <use xlink:href="#icon-xin"></use>
					</svg>
					<span style="font-size: 14px;position: relative;top: -2px;margin-left: 4px;">首次光临立减</span>
					<span style="color: red;float: right;position: relative;left: -20px;">-￥1</span>
				</div>
				<!-- 红包 -->
				<div class="redpacket" @click="$router.push('/usableredpacket')">
					<svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;">
					    <use xlink:href="#icon-method-draw-image"></use>
					</svg>
					<span style="font-size: 14px;position: relative;top: -2px;margin-left: 4px;">红包/抵用卷</span>
					<i class="iconfont" style="position: relative;float: right;margin-top: 3px; margin-left: -19px;color: rgb(196, 196, 196);">&#xe60a;</i>
					<div style="color: red;float: right;display: inline-block;margin-right: 20px;">{{redpacket || "无可用红包"}}</div>
				</div>
				<div class="subtotal">
					<span style="color: rgb(196, 196, 196);font-size: 14px;">优惠说明</span>
					<i class="iconfont" style="position: relative;top: 0px;left: 5px;font-size: 14px;color: rgb(196, 196, 196);">&#xe613;</i>
					<span style="font-size: 14px;float: right;">已知最大的优惠<span style="font-size: 16px;color: red;">￥{{(this.$store.state.users.redpacket+1)}}</span><span>小计￥<span style="font-weight: 600;font-size: 20px;">{{total-(this.$store.state.users.redpacket+1)}}</span> </span> </span>
				</div>
			</div>
			<!-- 备注 和 发票 -->
			<div class="Multi">
				<!-- 备注 -->
				<div class="remark" @click="$router.push('/remark')">
					<span>备注</span>
					<div style="margin-left:35px ; width: calc(100% - 35px);height: 40px;position: relative;top: -40px;overflow: hidden;margin-bottom: 10px;">
						<!-- <span style="color: rgb(196, 196, 196);font-size: 14px;margin-right: 10px;">点击无可选择无接触配送</span> -->
						<i class="iconfont" style="position: relative;top: 2px;color: #ccc;float: right;">&#xe60a;</i>
						<span style="text-align: right; width: 90%; color: rgb(196, 196, 196);font-size: 14px;margin-right: 10px;float: right;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{$store.state.users.Theordernote}}</span>
					</div>
				</div>
				<!-- 餐具份数 -->
				<div class="tableware" @click="isshow = true">
					<span>餐具份数</span>
					<span style="float: right;">
						<span style="color: rgb(196, 196, 196);font-size: 14px;margin-right: 10px;">{{tablewaresum}}</span>
						<i class="iconfont" style="position: relative;top: 2px;color: #ccc;">&#xe60a;</i><br>
					</span>
					<div class="gresshint">
						<div style="width: 350px;float: right;">
							<svg class="icon" aria-hidden="true" style="width: 14px;height: 14px;">
							    <use xlink:href="#icon-huanbao"></use>
							</svg>
							<div style="font-size: 10px;position: relative;top: -30px;left: 20px;color: #25BE7B;">选无需餐具，用支付宝付款获得16g能量</div>
						</div>	
					</div>
				</div>
				<!-- 发票 -->
				<div class="invoice">
					<span>发票</span>
					<span style="float: right;">
						<span style="color: rgb(196, 196, 196);font-size: 14px;margin-right: 10px;">该店不支持线上开票，请电话联系商户</span>
					</span>
				</div>
			</div>
			<!-- 收货地址提示 -->
			<div class="addresshint" v-if="Billingaddress">
				送至:{{Billingaddress[0].address}}{{Billingaddress[0].house}}
			</div>
			<!-- 总结菜单 -->
			<div class="sumup">
				<div style="
					width: 200px;
					height: 50px;
					float: right;

				">
					<div style="width: 100px;height: 50px;">
						<div>合计:<span style="color: red;">{{total-(this.$store.state.users.redpacket+1)}}</span></div>
						<div style="color: red;">已优惠￥{{this.$store.state.users.redpacket+1}}元</div>
					</div>
					<div style="
						width: 100px;
						height: 50px;
						background-color: red;
						position: relative;
						top: -50px;
						left: 100px;
						border-radius: 30px;
						background-color: #65A6FF;
						color: white;
						text-align: center;
						line-height: 50px;
					" @click="jumppay()">提交订单</div>
				</div>
				
			</div>
		</div>
		<!-- 餐具份数选择 -->
		<!-- 遮罩层 -->
		<div class="masking" v-if="isshow" @click="isshow=false"></div>
		<picker @cancelshade='isshow = false' class='picker' @Numberoftableware='Numberoftableware' v-if='isshow'></picker>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import picker from '@/components/picker'
	import publictop from '@/components/publictop'
	export default {
		components: {
			publictop,
			picker,
		},

		data() {
			return {
				shoppingdata: [],
				addressdata:[],
				Billingaddress:[],
				shopName:'',
				total:Number,
				isshow:false,
				// 当前时间
				currenttime:null,
			}
		},
		
			
		methods:{
			// 接收子元素传过来的餐具数量
			Numberoftableware(data){
		
			},
			
			// 跳转到pay 
			jumppay(){
				// 存下当前消费
				if(this.addressdata.length==0){
					Toast({
					  message: '请先填写地址',
					  position: 'middle',
					  duration: 2000
					});
				}else {
					this.$store.commit("users/CURRENTCONSUMPTION",this.total-(this.$store.state.users.redpacket+1));
					this.$router.push('/pay');
				}
			}
		},
		
		watch:{
			shoppingdata(newval,oldval){
				var sum=0;
				newval.forEach((item,index)=>{
					sum+=item.praiseNum*item.currentPrice;
				})
				this.total = sum;
			},
			
			Billingaddress(newval,oldval){
				// console.log(newval)
				
			}
		},

		computed:{
// 			餐具数量的显示
			tablewaresum(){
				if(this.$store.state.users.currenttableware){
					if(this.$store.state.users.currenttableware == 0){
						return "未选择";
					}
					return this.$store.state.users.currenttableware+"份餐具";
				}
				return "未选择";
			},
			
			// 红包金额
			redpacket(){
				if(this.$store.state.users.redpacket!=null){
					return "已抵扣"+this.$store.state.users.redpacket+"元"
				}
			}
		},
		
		mounted() {
			
		},
		
		beforeRouteEnter(to,from,next) {
			next(vm =>{
				vm.shoppingdata = vm.$store.state.users.shoppingdata;
				vm.$axios.post('/users/getusers',{
					_id:window.localStorage.getItem('ele_login_id'),
				}).then(resp=>{
					// console.log(resp.data.data[0].address.length)
					vm.addressdata = resp.data.data[0].address;
				})
				
				// 进路由就要重新请求一下最新的地址  VUEX 中的地址
				if(vm.$store.state.users.Billingaddress==null){
					vm.$axios.post('/users/getusers',{
						_id:window.localStorage.getItem('ele_login_id'),
					}).then(resp=>{
						// 第一次请求默认存第一个数据
						vm.$store.commit('users/BILLINGADDRESS',resp.data.data[0].address[0])
						vm.Billingaddress = resp.data.data[0].address[0];
					})
				}else {
					vm.Billingaddress = vm.$store.state.users.Billingaddress
				}
				
				
				// 存店面
				vm.shopName = window.localStorage.getItem('shopName');
				
				// 进入路由就获取当前时间
					var date = new Date();
					var hour = date.getHours()
					var Minutes = date.getMinutes()+22;
					if(Minutes>=60){
						Minutes-=60;
						hour+=1;
					}
					if(Minutes<=9){
						Minutes="0"+Minutes
					}
					if(hour>=24){
						hour-=24;
						if(hour>=0 && hour<=9){
							hour="0"+hour
						}
					}
					var currentdate = hour+":"+Minutes;
					vm.currenttime =  currentdate;
			})
		}
	}
</script>

<style scoped="scoped">
	.clearing {
		width: 100%;
		height: auto;
	}
	
	.topbar {
		position: absolute;
		top: 49px;
		width: 100%;
		height: 170px;
		background-image: linear-gradient(#65A6FF, #F1F1F1);
	}
	
	/* 疫情公告 */
	.notice {
		position: relative;
		top: 10px;
		width: 95%;
		height: 40px;
		background-color:#FFF4C7 ;
		margin: auto;
		border-radius: 8px;
		color: #FDB04F;
		text-align: center;
		line-height: 40px;
		font-size: 14px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
	.addressmsg {
		width: 95%;
		height: 170px;
		margin: auto;
		background-color: white;
		position: relative;
		top: 20px;
		border-radius: 8px;
	}
	
	.selectfontaddress {
		font-weight: 600;
		font-size: 22px;
		text-align: center;
		position: relative;
		top: 10px;
		height: 80px;
		overflow: hidden;
	}
	
	.selectiontime {
		padding-top: 20px;
		height: 40px;
		width: 100%;
		overflow: hidden;
	}
	
	.selectionpayment {
		overflow: hidden;
		height: 40px;
		width: 100%;
	}
	
	.selectionpayment2 {
		overflow: hidden;
		height: 40px;
		width: 100%;
		position: relative;
		top: -80px;
	}
	
	/* 渲染购物车中的商品 */
	.Rendering_goods {
		width: 95%;
		height: auto;
		margin: auto;
		background-color: white;
		margin-top: 30px;
		border-radius: 8px;
	}
	
	.Rendering_goods_title {
		color: rgb(196, 196, 196);
		padding-left: 10px;
		padding-top: 10px;
		padding-bottom: 10px;
	}
	
	/* 商品列表 */
	.Renderinglist {
		width: 95%;
		height: auto;
		margin: auto;
		background-color: white;
		border-radius: 8px;
		overflow: hidden;
	}
	
	.Renderinglist li {
		list-style: none;
		width: 100%;
		height: 80px;
	}
	
	.univalence {
		width: 70px;
		height: 30px;
		float: right;
		position: relative;
		top: -60px;
		left: 0px;
		font-weight: 600;
		text-align: center;
	}
	
	.packing {
		width: 95%;
		height: 30px;
		margin: auto;
	}
	
	/* 配送费 */
	.delivery {
		width: 95%;
		height: 45px;
		margin: 0 auto;
	}
	
	/* 店铺优惠 */
	.Discountstores {
		width: 95%;
		height: 30px;
		margin: auto;
		background-color: white;
		border-radius: 8px;
		margin-top: 0px;
		overflow: hidden;
	}
	
	/* 红包 */
	.redpacket {
		width: 95%;
		height: 30px;
		margin: auto;
		border-radius: 8px;
		margin-top: 0px;
		overflow: hidden;
	}

	/* 小计 */
	.subtotal {
		width: 95%;
		height: 60px;
		margin: auto;
		margin-top: 5px;
		overflow: hidden;
		border-top: 1px solid #F1F1F1;
		line-height: 60px;
	}

	/* 备注  和 发票等信息 */
	.Multi {
		width: 95%;
		height: auto;
		margin: auto;
		background-color: white;
		border-radius: 8px;
		margin-top: 10px;
	}
	
	.remark {
		height: 40px;
		background-color: white;
		width: 95%;
		border-radius: 8px;
		margin: auto;
		line-height: 40px;
	}
	
	.tableware {
		height: 50px;
		background-color: white;
		width: 95%;
		border-radius: 8px;
		margin: auto;
		line-height: 40px;
		overflow: hidden;
	}
	
	/* 绿色提示 */
	.gresshint {
		width: 300px;
		height: 30px;
		line-height: 30px;
		position: relative;
		top: -15px;
		left: 150px;
		z-index: 700;
	}
	
	/* 发票 */
	.invoice {
		height: 40px;
		background-color: white;
		width: 95%;
		border-radius: 8px;
		margin: 0 auto;
		line-height: 40px;
		overflow: hidden;
	}
	
	.addresshint {
		width: 100%;
		height: 40px;
		background-color: #FEF6DF;
		margin-top: 15px;
		line-height: 40px;
		padding-left: 10px;
		font-size: 12px;
	}
	
	/* 总结菜单 */
	.sumup {
		width: 100%;
		height: 50px;
		background-color: white;
	}
	
	/* 全局蒙版 */
	.masking {
		width: 100%;
		height: 100vh;
		opacity: 0.5;
		background-color: #999;
		position: fixed;
		z-index: 900;
	}
	
	/* 餐具份数选择 */
	.picker {
		width: 100%;
		margin: auto;
		background-color: white;
		position: fixed;
		bottom: 0px;
		z-index: 900;
		height: 200px;
	}
	
</style>
