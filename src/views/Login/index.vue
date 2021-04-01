<template>
	<div class="Login">
		<!-- 下面是饿了么的 Logo -->
		<img src="../../assets/img/Login_logo.png" style="width: 250px;height: 70px;position: absolute;left: 50%;margin-left: -125px;margin-top: 20px;">
		<!-- 下面是	Login 表单  input用组件    -->
		<div class="Login_form">
			<inputelement 
			title="text" 
			:become='become' 
			:err='err.mail' 
			:isdisabled='isdisabled' 
			:placeholder="placeholder"
			 :btnvalue='btnvalue' 
			 :isbtn="isbtn" 
			 @send='Sendverification'></inputelement>
			<inputelement 
			:key='err.verification'
			 title="text" 
			 placeholder="输入验证码"
			 :err='err.verification'
			  @sendverification='saveverification' ></inputelement>
			<div style="color: gray;opacity: 0.8;font-size: 14px;width: 60%;text-align: center;margin-bottom: 15px;" >新用户登录即自动注册，表示已同意<a href="#" style="color: #0000FF;">用户登录协议</a> </div>
			<input type="button" value="登录" @click="Login" :disabled="canlogin" :class="canlogin?'loginbtn2':'loginbtn1'" />
		</div>
	</div>
</template>

<script>
	import inputelement from '../../components/input/index.vue'
	export default {
		name:'Login',
		data(){
			return {
				placeholder:'QQ邮箱',
				btnvalue:'发送验证码',
				isbtn:true,
				verification:'',
				mail:'',
				//err 用一个对象 因为有 邮箱错误和验证码错误   
				//如  在邮箱处错误 :err='err.mail' 
				//如  在验证码处错误 :err='err.verification' 
				err:{
					mail:'',
					verification:'',
				},
				become:'',
				isdisabled:false,
			}
		},
		components:{
			inputelement,
		},
		methods:{
			//这个data 是子控件传来的  value 存的是输入的邮箱
			Sendverification(data){
				this.mail = data;
				if(!data){
					//存邮箱
					this.err.mail = '邮箱不能为空' 
					this.become = 'red'
					//正则匹配qq邮箱
				} else if(!(/^\d{5,12}@[qQ][qQ]\.(com|cn)$/.test(data))){
					this.err.mail = '邮箱错误' 
					this.become = 'red'
				} else {
					this.err = {},
					this.become = ''
					//倒计时
					var time = 30 ; 
					var timer = setInterval(()=>{
						this.isdisabled = true
						this.btnvalue = time-- + '秒后点击';
						if(time == 0){
							this.btnvalue ='发送验证码';
							// 按钮禁用
							this.isdisabled = false;
							clearInterval(timer);
						}

					},1000)
					//发送验证码 axios
					this.$axios.post('/users/send_verification',{
						mail:data,
					}).then(resp=>{
						console.log(resp.data)
					}).catch(err=>{
						console.log(err)
					})
				}
			},
			
			saveverification(data){
				this.verification=data;
			},
			
			//发出登录ajax
			Login(){
				 this.$axios.post('/users/login',{
					 mail:this.mail,
					 verification:this.verification,
				 }).then(resp=>{
					 if(resp.data.status == -1){
						 this.err.verification = '验证码错误' 
					 }else if (resp.data.status == -2){
						  this.err.verification = '验证码已过期' 
					 }else if (resp.data.status == -3){
						  this.err.verification = '验证码发送失败' 
					 }else{
						   this.err= {};
						   window.localStorage.setItem('ele_login_id',resp.data.data[0]._id);
						   this.$router.push('/home')
					 }
				 }).catch(err=>{
					  console.log(err)
				 })
			}
			
		},
		mounted() {

		},
		
		computed:{
			canlogin(){
				if(this.mail && this.verification ){
					return false
				}else {
					return true
				}
			}
		}
	}
</script>

<style scoped="scoped">

	html,body {
		width: 100%;
		height: 100%;
	}
	.Login_form {
		width: 100%;
		position: absolute;
		left: 20%;
		top: 20%;
	}
	
	/* 如果没有输入 */
	.loginbtn1 {
		width: 60%;
		height: 35px;
		border-radius: 5px;
		outline: none;
		border: none;
		color: white;
		background-color: #90EE90;
	}
	/* 有输入 */
	.loginbtn2 {
		width: 60%;
		height: 35px;
		border-radius: 5px;
		outline: none;
		border: none;
		color: white;
		background-color: #90EE90;
		opacity: 0.6;
	}
</style>
