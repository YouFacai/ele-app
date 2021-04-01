<template>
	<div class="addaddress">
		<publictop :title="title" :isreturn='true' ></publictop>
		<div class="from">
			<div style="border-bottom: 1px solid #F1F1F1;border-top: 1px solid #F1F1F1;padding: 10px 0px 2px;">
				<span style="width: 60px;display: inline-block;">联系人</span>
				<input type="text" placeholder="姓名" v-model="name" class="inputstyle" style="border-bottom: 1px solid #F1F1F1;">
				<div class="sexchoose">
					<label form="sex" :class="checkedsex=='先生'?'labelstyle1':'labelstyle2'">
						<input type="radio" name="sex" value="先生" v-model="checkedsex"><span style="font-size: 14px;">先生</span>
					</label>
					<label form="sex" :class="checkedsex=='女士'?'labelstyle1':'labelstyle2'">
						<input type="radio" name="sex" value="女士" v-model="checkedsex"><span style="font-size: 14px;">女士</span>
					</label>
				</div>
			</div>
			<div style="border-bottom: 1px solid #F1F1F1;border-top: 1px solid #F1F1F1;padding: 10px 0px 2px;">
				<span style="width: 60px;display: inline-block;">电话</span>
				<input type="text" v-model="phone" placeholder="手机号码" class="inputstyle" >
				<i class="iconfont" style="color: #65A6FF;">&#xe609;</i>
				<span style="color: #65A6FF;">通讯录</span>
			</div>
			<div style="border-bottom: 1px solid #F1F1F1;border-top: 1px solid #F1F1F1;padding: 10px 0px 2px;">
				<span style="width: 60px;display: inline-block;">地址</span>
				<input type="text" placeholder="选择收货地址"  v-model="address" class="inputstyle" >
				<i class="iconfont" style="color: #E2E2E2;margin-left: 20px;" @click="AutoNaviabbr()">&#xe60a;</i>
			</div>
			<div style="border-bottom: 1px solid #F1F1F1;border-top: 1px solid #F1F1F1;padding: 10px 0px 2px;">
				<span style="width: 60px;display: inline-block;">门牌号</span>
				<input type="text" placeholder="例: 5号楼203室" v-model="house" class="inputstyle" >
			</div>
			<div style="border-bottom: 1px solid #F1F1F1;border-top: 1px solid #F1F1F1;padding: 10px 0px 9px;">
				<span style="width: 60px;display: inline-block;">标签</span>
				<div class="tagboard">
					<label form="memo" :class="checkedmemo=='家'?'labelstyle1':'labelstyle2'">
						<input type="radio" name="memo" value="家" v-model="checkedmemo"><span style="font-size: 14px;">家</span>
					</label>
					<label form="memo" :class="checkedmemo=='公司'?'labelstyle1':'labelstyle2'">
						<input type="radio" name="memo" value="公司" v-model="checkedmemo"><span style="font-size: 14px;">公司</span>
					</label>
					<label form="memo" :class="checkedmemo=='学校'?'labelstyle1':'labelstyle2'">
						<input type="radio" name="memo" value="学校" v-model="checkedmemo"><span style="font-size: 14px;">学校</span>
					</label>
				</div>
			</div>
		</div>
		<div class="save" @click="submit">
			保存
		</div>
	</div>
</template>

<script>
	import publictop from '@/components/publictop'
	import { Toast } from 'mint-ui';
	export default {
		components:{
			publictop,
		},
		
		data(){
			return {
				checkedsex:'',
				checkedmemo:'',
				address:'',
				name:'',
				phone:'',
				house:'',
				currentindex:String,
				_idaddress:null,
			}
		},

		mounted(){

		},
		
		methods:{
			idaddress(){
				if(this._idaddress == null){
					return Math.floor(Math.random()*999999999999999)
				}else {
					return this._idaddress;
				}
			},
			
			AutoNaviabbr(){
				// 跳转到高德的3D  地图
				this.$router.push('/AutoNaviabbr');
			},
			
			// 提交表单
			submit(){
				var data={
					_id:window.localStorage.getItem('ele_login_id'),
					_idaddress:this.idaddress(),
					name:this.name,
					checkedsex:this.checkedsex,
					checkedmemo:this.checkedmemo,
					address:this.address,
					phone:this.phone,
					house:this.house,
					index:this.currentindex,
				}
				if(data.name==''){
					Toast({
					  message: '请填写姓名',
					  position: 'bottom',
					  duration: 5000
					});
					return ;
				}
				
				if(data.checkedsex==''){
					Toast({
					  message: '请选择性别',
					  position: 'bottom',
					  duration: 5000
					});
					return ;
				}
				
				if(data.phone==''){
					Toast({
					  message: '请填写手机号',
					  position: 'bottom',
					  duration: 5000
					});
					return ;
				}
				
				if(data.address==''){
					Toast({
					  message: '请填写详细地址',
					  position: 'bottom',
					  duration: 5000
					});
					return ;
				}
				
				if(data.house==''){
					Toast({
					  message: '请填写详细门牌号',
					  position: 'bottom',
					  duration: 5000
					});
					return ;
				}
				
				if(data.checkedmemo==''){
					Toast({
					  message: '请选择住址标签',
					  position: 'bottom',
					  duration: 5000
					});
					return ;
				}
				
				if(this.$store.state.users.title == '新增地址'){
					this.$axios.post('/users/addaddress',{
						data
					}).then(resp=>{
						this.checkedsex='';
						this.checkedmemo='';
						this.address='';
						this.name='';
						this.phone='';
						this.house='';
						// 添加地址后跳转路由
						this.$router.push('/myaddress')
					})
				}else if(this.$store.state.users.title == '编辑地址'){
					this.$axios.post('/users/updateaddress',{
						data
					}).then(resp=>{
						this.checkedsex='';
						this.checkedmemo='';
						this.address='';
						this.name='';
						this.phone='';
						this.house='';
						// 添加地址后跳转路由
						this.$router.push('/myaddress')
					})
				}
				
			
			}
		},
		
		computed:{
			title(){
				return this.$store.state.users.title
			}
		},
		
		// 进入路由
		beforeRouteEnter(to,from,next) {
			next((vm)=>{
				if(vm.$store.state.users.shippingaddress!=''){
					vm.address = vm.$store.state.users.shippingaddress;
				}
				if(vm.$store.state.users.edittheaddress != null){
					vm.checkedsex=vm.$store.state.users.edittheaddress[0].checkedsex;
					vm.checkedmemo=vm.$store.state.users.edittheaddress[0].checkedmemo;
					vm.address=vm.$store.state.users.edittheaddress[0].address;
					vm.name=vm.$store.state.users.edittheaddress[0].name;
					vm.phone=vm.$store.state.users.edittheaddress[0].phone;
					vm.house=vm.$store.state.users.edittheaddress[0].house;
					vm.currentindex=vm.$store.state.users.edittheaddress[0].currentindex;
					vm._idaddress=vm.$store.state.users.edittheaddress[0]._idaddress;
				}
			})
		},
		
		// 离开路由
		 beforeRouteLeave (to, from, next) {
			 // Vuex 地址的值全部清空
			if(to.path!='/AutoNaviabbr'){
				this.checkedsex='';
				this.checkedmemo='';
				this.address='';
				this.name='';
				this.phone='';
				this.house='';
			}
			this.$store.commit('users/EDITTHEADDRESS',null)
			this.$store.commit('users/SHIPPINGADDRESS','')
			next();
			
		
		  }
	}
</script>

<style scoped="scoped">
	.addaddress {
		width: 100%;
		background-color: white;
		padding-bottom: 20px;
	}
	
	.from {
		width: 100%;
		height: 100%;
		background-color: white;
		padding: 20px 10px;
		font-size: 18px;
	}
	
	/* input的样式 */
	.inputstyle {
		outline: none;
		border: none;
		padding-bottom: 10px;
		margin-left: 30px;
		font-size: 18px;
		color: #999;
		width: 50%;
	}
	
	input::-webkit-input-placeholder{
	    color:#E2E2E2;
	}
	
	/* 性别单选框的外大框 */
	.sexchoose {
		margin: 15px 0px;
		display: flex;
		justify-content: center;
	}
	
	/* 选中单选框的样式 */
	.labelstyle1 {
		border: 1px solid #65A6FF;
		color: #65A6FF;
		padding: 2px 25px;
		margin-right: 10px;
		border-radius: 5px;
		width: 30px;
		text-align: center;
	}
	
	/* 没选中单选框的样式 */
	.labelstyle2 {
		border: none;
		color: black;
		border: 1px solid #E2E2E2;
		padding: 2px 25px;
		margin-right: 10px;
		border-radius: 5px;
		width: 30px;
		text-align: center;
	}
	
	/* 去除单选框原有的样式 */
	.labelstyle1 input ,.labelstyle2 input {
		-webkit-appearance:none;
	}
	
	.tagboard {
		display: flex;
		justify-content: center;
	}
	
	/* 保存按钮 */
	.save {
		width: 96%;
		border-radius: 5px;
		margin: auto;
		height: 50px;
		background-color:#4DC160 ;
		text-align: center;
		line-height: 50px;
		color: white;
	}
</style>
