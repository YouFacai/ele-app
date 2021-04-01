<template>
	<div class="myaddress">
		<publictop style="position: fixed;top: 0px;z-index: 800;" title='我的地址' :isreturn='true' :returnaddress='returnaddress'></publictop>
		<div class="addresslist">
			<ul class="addresslist_ul">
				<li v-for="(data,index) in datalist.address" :key='index' @click="selectaddress(data,index)">
					<div style="width: 40px;height: 70px;float: left;position: relative;top: 50%;margin-top: -20px;">
						<svg class="icon" aria-hidden="true" style="width: 30px;height: 30px;" v-if="currentIndex==index">
						    <use xlink:href="#icon-xuanzhong"></use>
						</svg>
					</div>
					<div style="font-weight: 600;">
						{{data[0].address}}
						<span v-if="data[0].checkedmemo=='学校'" style="background-color: #FEF3F1; color:#E69F9B ; margin-left: 20px; border: 1px solid #FAE9E5;width: 45px;text-align: center; display: inline-block;">学校</span>
						<span v-else-if="data[0].checkedmemo=='家'" style="background-color: #EBFAE6;color:#B3CBA1 ;  margin-left: 20px; border: 1px solid #EAF9E6;width: 45px;text-align: center; display: inline-block;">家</span>
						<span v-else-if="data[0].checkedmemo=='公司'" style="font-weight: 100; color: #A4BFDE; margin-left: 20px; border: 1px solid #E2EEF7;background-color: #ECF8FF; width: 45px;text-align: center; display: inline-block;">公司</span>
					</div>
					<div>{{data[0].house}}</div>
					<div style="color: #808A87;">
						<div style="margin-top: 5px;">{{data[0].name}}</div>
						<div style="position: relative;top: -21px;margin-left: 120px;">({{data[0].checkedsex}})</div>
						<div style="position: relative;top: -41px;margin-left: 180px;">{{data[0].phone}}</div>
					</div>
					<i class="iconfont" style="float:right;position: relative;left:-35px; top: -95px; font-size: 20px;color: #ccc;" @click.stop="removeaddress(data)">&#xe60b;</i>
					<i class="iconfont" style="float:right;position: relative;left:-45px; top: -95px; font-size: 20px;color: #ccc;" @click.stop="updateaddress(data,index)">&#xe6ee;</i>
				</li>
			</ul>
		</div>
		
		<!-- 新增收获地址 -->
		<div class="bottombar" @click="addaddress()">
			<svg class="icon" aria-hidden="true" style="width: 25px;height: 25px;position: relative;top: 6px;">
			    <use xlink:href="#icon-zengjia"></use>
			</svg>
			新增收获地址
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
				datalist:[],
				currentIndex:0,
				from_path:null,
				returnaddress:null
			}
		},
		
		mounted() {
			this.$axios.post('/users/getusers',{
				_id:window.localStorage.getItem('ele_login_id'),
			}).then(resp=>{
				// 第一次请求默认存第一个数据
				this.datalist = resp.data.data[0];
				this.$store.commit('users/BILLINGADDRESS',this.datalist.address[0])
			})
		},
		
		methods:{
			//  编辑地址
			updateaddress(data,index){
				console.log(data)
				data[0].currentindex=index;
				this.$router.push('/addaddress');
				// 存下点击的信息
				this.$store.commit('users/EDITTHEADDRESS',data)
				this.$store.commit("users/TITLE",'编辑地址')
			},
			
			// 删除地址
			removeaddress(data){
				this.$axios.post('/users/removeaddress',{
					_id:window.localStorage.getItem('ele_login_id'),
					_idaddress:data[0]._idaddress
				}).then(resp=>{
					this.$axios.post('/users/getusers',{
						_id:window.localStorage.getItem('ele_login_id'),
					}).then(resp=>{
						this.datalist = resp.data.data[0];
					})
				})
			},
			
			// 跳转路由到addaddress 
			addaddress(){
				this.$router.push('/addaddress');
				this.$store.commit("users/TITLE",'新增地址')
			},
			
			// 选择地址
			selectaddress(data,index){
				this.currentIndex = index;
				// 选中的地址存vuex中
					console.log(this.from_path)
				this.$store.commit('users/BILLINGADDRESS',data)
				// 跳转到  结算购物车菜单
				if(this.from_path=='/me'){
					return ;
				}
			
				if(this.from_path=='/clearing'){
					this.returnaddress = '/clearing'
				}
				this.$router.push('/clearing');
			}
		},
		
		beforeRouteEnter(to,from,next) {
			next(vm=>{
				// 查看是哪里跳转过来的
				if(from.path == '/me'){
					vm.from_path = '/me';
				}
				
				vm.$axios.post('/users/getusers',{
					_id:window.localStorage.getItem('ele_login_id'),
				}).then(resp=>{
					vm.datalist = resp.data.data[0];
				})
			})
		},
		
		
	}
</script>

<style scoped="scoped">
	.bottombar {
		width: 100%;
		background-color: white;
		height: 60px;
		text-align: center;
		line-height: 60px;
		position: absolute;
		bottom: 0px;
		color: #65A6FF;
	}
	
	.addresslist {
		width: 100%;
		height: auto;
		margin-top: 50px;
	}
	
	.addresslist_ul li {
		width: 100%;
		height: 70px;
		background-color: white;
		border-bottom: 1px solid #F1F1F1;
		padding: 10px 20px;
		list-style: none;
	}
</style>
