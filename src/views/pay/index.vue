<template>
	<div class="pay">
		<publictop title='收银台' :isreturn='true'></publictop>
		<!-- 店名  和  总价钱 和倒计时 -->
		<div class="top">
			<div style="width: 100%;text-align: center;position: relative;top: 30px;">{{shopName}}</div>
			<div style="width: 100%;text-align: center;position: relative;top: 50px;font-size: 40px;font-weight: 600;"><span style="font-size: 25px;font-weight: 600;">￥</span>{{$store.state.users.currentconsumption}}.00</div>
			<div style="width: 100%;text-align: center;position: relative;top: 50px;font-size: 12px;">支付剩余时间：{{minute}}:{{second}}</div>
		</div>
		<!-- 支付方式 -->
		<div class="Online_payment">
			<div style="width: 90%;margin: auto;" >
				<div class="Online_payment_title">在线支付</div>
				<div class="Payment_options" @click="show1()">
					<div class="round" v-if='!isshow1'></div>
					<svg class="icon" aria-hidden="true" style="width: 34px;height: 34px;">
					    <use xlink:href="#icon-wechat_pay"></use>
					</svg>
					<!-- 微信  以及打勾的部分 -->
					<span style="height: 40px;display: inline-block;line-height: 40px;position: relative;top: -10px;margin-left: 10px;">微信支付</span>
					<!-- 勾选图标 -->
					<svg v-if='isshow1' class="icon" aria-hidden="true" style="width: 20px;height: 20px;float: right;margin-top: 5px;">
					    <use xlink:href="#icon-xuanzhong"></use>
					</svg>
					
				</div>
				
				<!-- 支付宝 -->
				<div class="Payment_options" @click="show2()">
					<div class="round" v-if='!isshow2'></div>
					<svg class="icon" aria-hidden="true" style="width: 34px;height: 34px;">
					    <use xlink:href="#icon--zhifubao"></use>
					</svg>
					<!-- 微信  以及打勾的部分 -->
					<span style="height: 40px;display: inline-block;line-height: 40px;position: relative;top: -10px;margin-left: 10px;">微信支付</span>
					<!-- 勾选图标 -->
					<svg v-if='isshow2' class="icon" aria-hidden="true" style="width: 20px;height: 20px;float: right;margin-top: 5px;">
					    <use xlink:href="#icon-xuanzhong"></use>
					</svg>
				</div>
			</div>
		</div>
		<!-- 其他支付方式 -->
		<div style="color: rgb(192,192,192); width: 100%;height: 40px;background-color: white;margin-top: 30px;text-align: center;line-height: 40px;">其他付款方式</div>
		<!-- 付款按钮 -->
		<div :class="isshow1 || isshow2? 'Payment_button1':'Payment_button2'" @click="orderover()">
			{{paymentmethod}}付款￥{{$store.state.users.currentconsumption}}.00
		</div>
	</div>
</template>

<script>
	import publictop from '@/components/publictop'
	export default {
		components:{
			publictop,
		},
		
		data(){
			return {
				isshow1:true,
				isshow2:false,
				paymentmethod:'',
				minute:14,
				second:59,
			}
		},
		
		mounted() {
			
		},
		
		computed:{
			// 用计算属性返回当前  进入的店铺名
			shopName(){
				return window.localStorage.getItem('shopName')+"外卖订单"
			}
		},
		
		methods:{
			show1(){
				this.isshow1=!this.isshow1;
				this.isshow2=false;
				this.paymentmethod='微信';
			},

			show2(){
				this.isshow2=!this.isshow2;
				this.isshow1=false;
				this.paymentmethod='支付宝';
			},
			
			// 完成订单
			orderover(){
				// 要存的商品信息
				var myDate = new Date();
				this.$axios.post('/users/addorder',{
					datalist:{
						transaction_code:myDate.getTime()+' '+Math.floor(Math.random()*8999+1000),
						redpacket:this.$store.state.users.redpacket,
						_id:window.localStorage.getItem('ele_login_id'),
						datamsg:this.$store.state.users.shoppingdata,
						ordertime:myDate.toLocaleString(),
						Billingaddress:this.$store.state.users.Billingaddress,
						currentconsumption:this.$store.state.users.currentconsumption,
					}
				}).then((resp)=>{
					console.log(resp.data);
					this.$router.push('/order')
				})
			}
		},
		
		beforeRouteEnter(to , from ,next) {
			next(vm=>{
				vm.minute=14;
				vm.second=59;
				var timer = setInterval(()=>{
					if(vm.minute =='00' && vm.second=='01'){
						clearInterval(timer);
						vm.minute=14;
						vm.second=59;
					}
					vm.second -- ;
					if(vm.second == '00'){
						vm.second = 59;
						vm.minute--;
						if(vm.minute <10){
							vm.minute='0'+vm.minute;
						}
					}
					if(vm.second <10){
						vm.second="0"+vm.second;
					}
					if(vm.second =='00' && vm.minute=='00'){
						clearInterval(timer);
						vm.$router.push('/clearing');
					}
					
				},1000)
			})
		}
	}
</script>

<style scoped="scoped">
	.pay {
		width: 100%;
		height: 100vh;
		/* background-color: white; */
	}
	
	.top {
		width: 100%;
		height: 170px;
		background-color: #F1F1F1;
	}
	
	.Online_payment {
		width: 100%;
		height: 160px;
		background-color: white;
	}
	
	/* 在线支付 */
	.Online_payment_title {
		padding: 10px 0px; 
		border-bottom:1px solid rgb(196, 196, 196) ;
	}
	
	/* 微信支付选择 */
	.Payment_options {
		margin-top: 15px;
		height: 40px;
		width: 100%;
	}
	
	/* 圆圈 */
	.round {
		width: 17px;
		height: 17px;
		border-radius: 50%;
		border: 1px solid rgb(196, 196, 196);
		position: relative;
		top: 5px;
		float: right;	
	}
	
	
	/* 付款按钮的样式 */
	.Payment_button1 {
		width: 96%;
		height: 50px;
		background-color: #4CDA64;
		position: fixed;
		bottom: 0;
		margin-left: 8px;
		border-radius: 5px;
		text-align: center;
		line-height: 50px;
		color: white;
	}
	
	.Payment_button2 {
		width: 96%;
		height: 50px;
		background-color: #4CDA64;
		position: fixed;
		bottom: 0;
		opacity: .5;
		margin-left: 8px;
		border-radius: 5px;
		text-align: center;
		line-height: 50px;
		color: white;
	}
</style>
