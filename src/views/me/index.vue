<template>
	<div>
		<!-- 头部  -->
		<div class="topbar">
			<img style="float: left; width: 90px;height: 90px;position: relative;left: 20px;top: 20px;" src="http://s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9096d347/835c1ccacf724c558dc7e8247d7dc9d3.png" alt="">
			<div class="topbar_content">
				<div style="margin-bottom: 10px; font-weight: 600;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{use_id}}</div>
				<i class="iconfont">&#xe662;</i>
				<span style="font-size: 14px;color: #999;">{{usersmsg.mail | hidemail}}</span>
				<div style="font-size: 14px;color: #999;margin-top: 10px;">填饱了肚子人就不会空虚</div>
			</div>
		</div>
		
		<!-- 收货地址 -->
		<div class="takeaddress" @click="detailedsite()">
			<svg class="icon" aria-hidden="true" style="width: 30px;height: 30px;">
			    <use xlink:href="#icon-dingwei1"></use>
			</svg>
			<span style="position: relative;top: -7px;">我的地址</span>
			<div style="float: right;margin-right: 30px;">
				<svg class="icon" aria-hidden="true" style="width: 30px;height: 30px;transform: rotateZ(-90deg);">
				    <use xlink:href="#icon-xiala1"></use>
				</svg>
			</div>
		</div>
		
		<!-- 退出登录 -->
		<div class="quit" @click="removeid()">
			退出登录
		</div>
		
		<!-- 底部 -->
		<bottombar></bottombar>
	</div>
</template>

<script>
	import Vue from 'vue'
	import bottombar from '@/components/bottombar'
	Vue.filter('hidemail',(data)=>{
		return String(data).replace(/(\w?)(\w+)(\w)(@\w+\.[a-z]+(\.[a-z]+)?)/, '$1****$3$4');
	})
	export default {
		components:{
			bottombar,
		},
		
		data(){
			return {
				use_id:'',
				usersmsg:[],
			}
		},
		
		methods:{
			removeid(){
				// 把本地的ele_login_id 删除了 就  自动跳转到 login
				localStorage.removeItem('ele_login_id');
				this.$router.push('/Login')
			},
			
			// 跳转详细地址的选择
			detailedsite(){
				var _id = window.localStorage.getItem('ele_login_id');
				this.$axios.post('/users/getusers',{
					_id,
				}).then(resp=>{
					// console.log(resp.data.data[0].address)
					if(resp.data.data[0].address.length == 0 ){
						this.$router.push('/addaddress')
					}else {
						this.$router.push('/myaddress')
					}
				})
			}
		},
		
		mounted() {
			this.use_id = window.localStorage.getItem('ele_login_id');
			this.usersmsg = this.$axios.post('/users/getusers',{
				_id:this.use_id,
			}).then(resp=>{
				this.usersmsg = resp.data.data[0]
			})
		}
	}
</script>

<style scoped="scoped">
	.topbar {
		width: 100%;
		height: 150px;
		background-color: white;
	}
	
	/* 头部的内容部分 */
	.topbar_content {
		width: calc(100% - 140px);
		overflow: hidden;
		position: relative;
		left: 30px;
		top: 30px;
		height: auto;
	}
	
	.takeaddress {
		width: 100%;
		background-color: white;
		margin-top: 20px;
		padding: 15px 20px;
	}
	
	/* 退出登录 */
	.quit {
		margin-top: 30px;
		width: 100%;
		height: 70px;
		color: red;
		line-height: 70px;
		text-align: center;
		font-size: 18px;
		font-weight: 600;
		background-color: white;
	}
</style>
