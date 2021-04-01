<template>
	<div class="usableredpacket">
		<publictop style="position: fixed;top: 0px;z-index: 800;" title='选择红包' :isreturn='true' ></publictop>
		<div style="width: 100%;height: 100vh;margin-top: 50px;">
			<!-- 使用红包的提示说明 -->
			<div class="redpackethint">
				<svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;position: relative;top: 4px;margin-left: 10px;">
				    <use xlink:href="#icon-gantanhao"></use>
				</svg>
				<span style="margin-left: 3px;font-size: 14px;">饿了么红包，商家代金卷使用说明</span>
			</div>
			<div class="redpackettitle">
				可使用红包(2)
			</div>
			<!-- 1111 -->
			<div class="redpacket" @click="updateisshow1()">
				<div style="width: 100%;">
					<svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;position: relative;top: 10px;margin-left: 10px;">
					    <use xlink:href="#icon-changyongtubiao-xianxingdaochu-zhuanqu--copy"></use>
					</svg>
					<span style="font-weight: 600;margin-left: 10px;position: relative;top: 5px;">轻享会员红包</span>
					<div style="margin-left: 10px;margin-top: 12px;">
						有效期至{{currenttime}}
					</div>
					<hr style="width: 90%;margin:20px  auto 10px;">
					<div style="width: 90%;height: 50px;margin: 0 auto;color: #ccc;font-size: 12px;">
						<div style="width: 100%;overflow: hidden;">限非到店自取订单使用,限登录和收餐手机号19884687266使用.</div>
					</div>
					<div style="width: 60px;height: 60px;float: right;position: relative;top: -135px;margin-right: 30px;text-align: center;">
						<span style="font-size: 30px;color: red;"><span style="font-size: 18px;">￥</span>4</span>
						<div style="font-size: 14px;color: #ccc;">无门槛</div>
					</div>
					<div id="triangle-topright" v-if="isshow1">
						<i class="iconfont" style="font-size: 10px; position: relative;top: -33px;left: -17px;color: white">&#xeba4;</i>
					</div>
				</div>
			</div>
			<!-- 2222 -->
			<div class="redpacket" @click="updateisshow2()">
				<div style="width: 100%;">
					<svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;position: relative;top: 10px;margin-left: 10px;">
					    <use xlink:href="#icon-changyongtubiao-xianxingdaochu-zhuanqu--copy"></use>
					</svg>
					<span style="font-weight: 600;margin-left: 10px;position: relative;top: 5px;">轻享会员红包</span>
					<div style="margin-left: 10px;margin-top: 12px;">
						有效期至{{currenttime}}
					</div>
					<hr style="width: 90%;margin:20px  auto 10px;">
					<div style="width: 90%;height: 50px;margin: 0 auto;color: #ccc;font-size: 12px;">
						<div style="width: 100%;overflow: hidden;">限非到店自取订单使用,限登录和收餐手机号19884687266使用.</div>
					</div>
					<div style="width: 60px;height: 60px;float: right;position: relative;top: -135px;margin-right: 30px;text-align: center;">
						<span style="font-size: 30px;color: red;"><span style="font-size: 18px;">￥</span>6</span>
						<div style="font-size: 14px;color: #ccc;">无门槛</div>
					</div>
					<div id="triangle-topright" v-if="isshow2">
						<i class="iconfont" style="font-size: 10px; position: relative;top: -33px;left: -17px;color: white">&#xeba4;</i>
					</div>
				</div>
			</div>
			<!-- 3333 -->
			<div class="redpacket" @click="updateisshow3()">
				<div style="width: 100%;">
					<svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;position: relative;top: 10px;margin-left: 10px;">
					    <use xlink:href="#icon-changyongtubiao-xianxingdaochu-zhuanqu--copy"></use>
					</svg>
					<span style="font-weight: 600;margin-left: 10px;position: relative;top: 5px;">轻享会员红包</span>
					<div style="margin-left: 10px;margin-top: 12px;">
						有效期至{{currenttime}}
					</div>
					<hr style="width: 90%;margin:20px  auto 10px;">
					<div style="width: 90%;height: 50px;margin: 0 auto;color: #ccc;font-size: 12px;">
						<div style="width: 100%;overflow: hidden;">限非到店自取订单使用,限登录和收餐手机号19884687266使用.</div>
					</div>
					<div style=" overflow: hidden; width: 60px;height: 60px;float: right;position: relative;top: -135px;margin-right: 30px;text-align: center;">
						<span style="font-size: 30px;color: red;"><span style="font-size: 18px;">￥</span>10</span>
						<div style="font-size: 14px;color: #ccc;">无门槛</div>
					</div>
					<div id="triangle-topright" v-if="isshow3">
						<i class="iconfont" style="font-size: 10px; position: relative;top: -33px;left: -17px;color: white">&#xeba4;</i>
					</div>
				</div>
			</div>
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
				isshow1:false,
				isshow2:false,
				isshow3:false,
			}
		},
		
		computed:{
			currenttime(){
				var date = new Date();
				return date .toLocaleString( ).split(' ')[0]; //获取日期与时间
			}
		},
		
		methods:{
			updateisshow1(){
				this.isshow1 = !this.isshow1;
				this.isshow2 = false;
				this.isshow3= false;
				if(this.isshow1){
					this.$store.commit('users/REDPACKET',4);
				}else{
					this.$store.commit('users/REDPACKET',null);
				}
				this.$router.push('/clearing');
			},
			updateisshow2(){
				this.isshow1 = false;
				this.isshow2 = !this.isshow2;
				this.isshow3= false;
				if(this.isshow2){
					this.$store.commit('users/REDPACKET',6);
				}else{
					this.$store.commit('users/REDPACKET',null);
				}
				this.$router.push('/clearing');
			},
			updateisshow3(){
				this.isshow1 = false;
				this.isshow2 = false;
				this.isshow3 = !this.isshow3;
				if(this.isshow3){
					this.$store.commit('users/REDPACKET',10);
				}else{
					this.$store.commit('users/REDPACKET',null);
				}
				
				this.$router.push('/clearing');
			},
		}
	}
</script>

<style scoped="scoped">
	.redpackethint {
		width: 100%;
		height: 30px;
		background-color: #FEF6DF;
	}
	
	.redpackettitle {
		font-weight: 600;
		margin-left: 20px;
		margin-top: 10px;
		margin-bottom: 12px;
	}
	
	.redpacket {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
/* 		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		flex-direction: column; */
		height: 130px;
		overflow: hidden;
		background: #fff;
		margin: 0 10px 10px;
		border-radius: 5px;
	}
	
	/* 倒三角 */
	#triangle-topright {
	    width: 0;
	    height: 0;
	    border-top: 30px solid red;
	    border-left:30px solid transparent; 
		position: relative;
		top: -140px;
		float: right;
		left: 89px;
	}
</style>
