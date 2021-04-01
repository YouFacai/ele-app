<template>
	<div style="width: 100%;height: 100%; background-image: linear-gradient(#FEFEFE,#F2F2F2);">
		<!-- 顶部订单 -->
		<div class="topbar">
			<span style="font-weight: 600;margin-left: 10px;font-size: 20px;">订单</span>
			<i class="iconfont" style="color: #000000;font-size: 30px;float: right;margin-right: 20px;">&#xe612;</i>
		</div>
		<div class="content">
			<!-- 渲染后端的订单信息 -->
			<ul class="content_ul">
				<li v-for="(data,index) in datalist" :key='index' @click.stop="orderdetail(data)">
					<div style="margin-left: 10px;">{{data.datalist.ordertime}}</div>
					<div style="float: right;position: relative;margin-right: 22px;top: 50px;">
						￥{{data.datalist.currentconsumption}}
					</div>
					<div style="position: relative;width: 60px;position: relative;float: right;top: 73px;color: #ccc;font-size: 13px;left: 62px;">共{{data.datalist.datamsg.length}}件</div>
					<img style="float: left; width: 60px;height: 60px;" src="http://p0.meituan.net/waimaipoi/ed6d855ec95d8dbd18643dce292b1bd5534802.png" alt="">
					<div class="content_ul_detail">
						<span style=" font-size: 14px;color: rgb(192,192,192);float: right;position: relative;left: 100px;">支付成功</span>
						<span style="font-weight: 600;display: inline-block;width: auto;">
							古茗 中心街(洞头店)
							<i class="iconfont" style="position: relative;top: 1px;left: 10px;">&#xe60a;</i>
						</span>
					</div>
					
					<!-- 渲染点过的商品 -->
					<div style="height: auto;overflow: hidden;">
						<li v-for="(item,i) in data.datalist.datamsg" :key='i' style="overflow: hidden;line-height: 60px;">
							<img style="float: left; width: 60px;height: 60px;" :src="item.littleImageUrl" alt="">
							<div style="font-size: 14px;color: gray;">{{item.spuName}}</div>
						</li>
					</div>
					
					<!-- 再来一单 -->
					<div class="Another_list" @click.stop="Another_list">
						再来一单
					</div>
				</li>
			</ul>
		</div>
		<bottombar></bottombar>
	</div>
</template>

<script>
	import bottombar from '@/components/bottombar'
	export default {
		components:{
			bottombar,
		},
		
		data(){
			return {
				datalist:[],
			}
		},
		
		methods:{
			orderdetail(data){
				this.$router.push({name:'orderinfo',params:data});
			},
			
			// 再来一单
			Another_list(){
				this.$router.push(`/filmdetailed/${localStorage.getItem('filmID')}/shippingorder`);
			}
		},
		
		beforeRouteEnter(to,from,next) {
			next(vm=>{
				vm.$axios.post('/users/getusers',{
					_id:window.localStorage.getItem('ele_login_id'),
				}).then(resp=>{
					vm.datalist = [];
					for(var i=0;i<=resp.data.data[0].orderlist.length;i++){
						vm.datalist = [...resp.data.data[0].orderlist[i],...vm.datalist]
					}
				})
			})
		}
	}
</script>

<style scoped="scoped">
	.topbar {
		width: 100%;
		height: 50px;
		background-color: white;
		line-height: 50px;
		position: fixed;
		top: 0px;
		z-index: 800;
	}
	
	.content {
		width: 98%;
		height: auto;
		margin: auto;
		position: relative;
		top: 50px;
		margin-bottom: 60px;
	}
	
	.content_ul {
		margin-top: 10px;
		width: 98%;
		height: auto;
		margin: auto;
		overflow: hidden;
	}
	
	.content_ul li {
		list-style: none;
		overflow: hidden;
		margin-top: 10px;
		background-color: white;
		padding-top: 10px;
	}
	
	.content_ul_detail {
		/* overflow: hidden; */
		margin-left: 70px;
		width: 100%;
		height: auto;
	}
	
	.Another_list {
		width: 90px;
		height: 40px;
		border-radius: 20px;
		text-align: center;
		line-height: 40px;
		border: 2px solid #58CCF8;
		color: #5ECAF3;
		font-weight: 600;
		float: right;
		position: relative;
		margin-bottom: 10px;
	}
</style>
