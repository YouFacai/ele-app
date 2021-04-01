<template>
	<div class="location">
		<div class="search">
			<span @click="$router.push('/city')">{{this.$store.state.users.address.city}}</span>
			<i class="iconfont">&#xe656;</i>
			<i class="iconfont" style="opacity: 0.5;margin-left: 3px;">&#xe612;</i>
			<input type="text" placeholder="小区/写字楼/学校等" v-model="address" class="search_input">
			<div class="detail">
				<span style="font-size: 14px;margin-top: 20px;margin-bottom: 5px;">当前定位</span></br>
				<i class="iconfont" style="color:#65A6FF;display: block;margin-top: 5px;">&#xe61f;</i>
				<div class="detaillocation">{{this.$store.state.users.address.location}}</div>
			</div>
		</div>
		<!-- 地址列表的渲染 -->
		<div class="addresslist" ref='addresslist'>
			<div>
				<ul v-for="(data,index) in datalist" :key = 'index' @tap="setcity(data)">
					<div class='single_data'>
						{{data.name}}
						<span style="
						margin-left: 10px;
						font-size: 14px;
						white-space: nowrap;
						display: inline-block;
						width: 10px;
						text-overflow: ellipsis;
						">({{data.district}})</span>
						<div style="margin-top: 8px;color: gray;font-weight: 100;font-size: 14px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{data.address==''?'暂无详细数据':data.address}}</div>
					</div>
				</ul>
			</div>
			<div style="clear: both;"></div>
		</div>
	</div>
</template>

<script>
	import BScroll from "better-scroll"
	export default {
		methods:{
			Select(newval){
				var self = this;	
				AMap.plugin('AMap.Autocomplete', function() {
					var autoOptions = {
						//city 限定城市，默认全国
						city: self.$store.state.users.address.city,
					};
					// 实例化AutoComplete
					var autoComplete = new AMap.Autocomplete(autoOptions);
					// 根据关键字进行搜索
					autoComplete.search(newval, function(status, result) {
						// 搜索成功时，result即是对应的匹配数据
						// console.log(result);
						//将返回的数据放到数组进行渲染
						self.datalist = result.tips
						self.$nextTick(()=>{
							const bscroll = new BScroll(self.$refs.addresslist, {
								 scrollbar:{
									 fade:false,	//是否需要滚动条
									 interactive:false
								 },
								 //注意better-scroll中  @click 是使用不了的  要用@tap
								 tap:true,
							})
						})
					})
				})
			},
			
			//选择城市
			setcity(data){
				//存Vuex
				this.$store.commit('users/SAVEADDRESS',{
					location:data.name,
					city:this.$store.state.users.address.city
				})
				//跳转路由
				this.$router.push('/home')
			}
		},
		data() {
			return {
				address: '',
				datalist:[]
			}
		},
		watch:{
			address(newval,oldval){
				this.Select(newval);
			}
		},
		mounted() {
			// console.log(this.$store.state.users.address.city)
		}
	}
</script>

<style scoped="scoped">
	.location {
		width: 100%;
		height: 110px;
		background-color: white;
	}

	/* 搜索框 外面的大盒子 */
	.search {
		width: 80%;
		height: 40px;
		background-color: #F1F1F1;
		border-radius: 10px;
		position: relative;
		left: 50%;
		margin-left: -40%;
		top: 10px;
		line-height: 40px;
		padding-left: 5px;
	}

	.search_input {
		background-color: #F1F1F1;
		outline: none;
		border: none;
		position: relative;
		top: -2px;
		margin-left: 2px;
		/* 动态款多用计算 */
		width: calc(100% - 150px);
		display: inline-block;
	}

	/* 下面的那个具体细节 */
	.detail {
		line-height: 20px;
		font-weight: 600;
	}

	.detaillocation {
		width: 80%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		position: absolute;
		top: 60px;
		left: 30px;
		margin-top: 7px;
	}
	
	/* 地址列表的渲染 */
	.addresslist {
		width: 100%;
		height: 70vh;
		background-color: white;
		position: absolute;
		top: 180px;
		overflow: hidden;
	}
	
	
	.addresslist ul {
		height: auto;
		border-bottom: 1px solid #ccc;
	}
	/* 渲染列表下的单个数据 */
	.single_data {
		font-weight: 600;
		height: 45px;
		margin-bottom: 5px;
		padding-top: 3px;
		padding-left:20px;
		display: inline-block;
	}
</style>
