<template>
	<div :class="this.$store.state.users.ismasking||this.$store.state.users.isscreen?'maskfilterview':'filterview'">
		<ul class="filterview_ul" ref='filterview_ul'>
			<li @click.self='foucs($event)' name='first'>{{basics.one}}<i class="iconfont">&#xe656;</i></li>
			<li @click='foucs($event)' name='twe'>{{basics.twe}}</li>
			<li @click='foucs($event)'>{{basics.three}}</li>
			<li @click.self='foucs($event)' name='last'>{{basics.four}}<i class="iconfont" style="font-size: 14px;color: #808A87">&#xe8bf;</i></li>
		</ul>
		<!-- 如果点了综合排序渲染这个 -->
		<div v-if="this.$store.state.users.ismasking" class="Filter_dropdown">
			<ul v-for="(data,index) in Filter_dropdown" :key='index'>
				<li @click="select(index,data)" :class="index==currentFilter?'filterselected':'filterselected2'">{{data.category}}<i v-if='index==currentFilter' class="iconfont" style="font-size: 20px;float: right;margin-right: 80px;">&#xe620;</i></li>
			</ul>
		</div>
		<!-- 如果点了筛选渲染这个 -->
		<div v-if="this.$store.state.users.isscreen" class="Filter_screen">
			<div class="Business_services">
				<div class="screen_font">商家服务 (可多选)</div>
				<ul class="screen_ul">
					<li v-for="(data,index) in Business_services" :class="data.ischecked?'screen_lichecked':'screen_li'" @click="Choose_preferential(data,index,$event)" :key='index'>
						<svg v-if="data.icon" class="icon" aria-hidden="true" style="width: 20px;height: 20px;">
						    <use :xlink:href='data.icon'></use>
						</svg>
						{{data.font}}
					</li>
				</ul>
			</div>
			<div class="discounts">
				<div class="screen_font">优惠活动 (单选)</div>
				<ul class="screen_ul">
					<li v-for="(data,index) in discounts" :key='index' :class="(currentdiscounts==index)?'screen_lichecked':'screen_li'" @click="discountscheck(data,index)">
						<svg v-if="data.icon" class="icon" aria-hidden="true" style="width: 20px;height: 20px;">
						    <use :xlink:href='data.icon'></use>
						</svg>
						{{data.font}}
					</li>
				</ul>
			</div>
			<div class="consumption">
				<div class="screen_font">人均消费</div>
				<ul class="screen_ul">
					<li v-for="(data,index) in consumption" :key='index' :class="(currentconsumption==index)?'screen_lichecked':'screen_li'" @click="consumptioncheck(data,index)">
						<svg v-if="data.icon" class="icon" aria-hidden="true" style="width: 20px;height: 20px;">
						    <use :xlink:href='data.icon'></use>
						</svg>
						{{data.font}}
					</li>
				</ul>
			</div>
			<div class="Filter_screen_button" v-if="this.$store.state.users.isscreen">
				<ul class="Filter_screen_button_ul">
					<li @click="resetchecked()">清空</li>
					<li @click="$emit('okfrom')">提交</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		methods:{
			foucs(el){
				var filterview_li = this.$refs.filterview_ul.getElementsByTagName('li');
				//每个都遍历下为		black
				filterview_li.forEach((item,index)=>{
					item.style.fontWeight = 500
				})
				el.target.style.fontWeight = 600;
				// 如果选择的是  综合排序
				if(el.target.getAttribute('name')=='first'){
					//点击九修改  为true   需要遮罩层
					this.$store.commit('users/ISMASKING',true)
					this.$store.commit('users/ISSCREEN',false)
					this.$store.commit('users/ISRANK',false);
				}
				if(el.target.getAttribute('name')=='last'){
					//点击筛选九不需要  综合排序下面的listdata
					this.$store.commit('users/ISMASKING',false)
					this.$store.commit('users/ISRANK',false);
					this.$store.commit('users/ISSCREEN',true)
				}
				if(el.target.getAttribute('name')=='twe'){
					//点击筛选九不需要  综合排序下面的listdata
					this.$store.commit('users/ISRANK',true);
				}
			},
			
			// 点击电影类别  跟换选中
			select(index,data){
				this.currentFilter = index;
				//basics.one   的综合排序  文字也要更换
				this.basics.one = data.category;
				this.$store.commit('users/ISMASKING',false);
				this.$store.commit('users/isscreen',false);
				this.$store.commit('users/CURRENTFILTERTYPE',data.category);
				//子传父	 	 用函数   点击类别触发  电影筛选
				this.$emit('filtration');
			},
			// 商家服务的多选
			Choose_preferential(data,index,el){
				console.log(data,index,el.target)
				this.Business_services[index].ischecked = !this.Business_services[index].ischecked;
			},
			//优惠服务的单选
			discountscheck(data,index){
				this.currentdiscounts = index
			},
			consumptioncheck(data,index){
				this.currentconsumption = index;
				console.log(11)
			},
			// 重置选中
			resetchecked(){
				this.currentdiscounts=-1;
				this.currentconsumption=-1;
				// 进行遍历全部 选中都变为false
				this.Business_services.forEach((item,index)=>{
					item.ischecked=false
				})
			}
		},
		
		data(){
			return {
				Filter_dropdown:[],
				currentFilter:0,
				basics:{
					one:'综合排序',
					twe:'评分优先',
					three:'品质联盟',
					four:'筛选',
				},
				// 商家服务
				Business_services:[],
				// 优惠
				discounts:[],
				// 人均消费
				consumption:[],
				// 	优惠下的选中情况
				currentdiscounts:-1,
				currentconsumption:-1,
			}
		},
		
		mounted() {
			// 用axios请求  自己写的数据Filter_dropdown
			this.$axios.post('/users/Filter_dropdown')
			.then(resp=>{
				this.Filter_dropdown = resp.data.type;
			}).catch(err=>{
				console.log(err)
			})
			
			
			// 过滤列表   的第一块数据axios
			this.$axios.post('/users/Filter_screen')
				.then(resp=>{
					// console.log(resp.data.Business_services)
					this.Business_services = resp.data.Business_services
				}).catch(err=>{
					console.log(err)
				})

		// 过滤列表   的第二块数据axios
			this.$axios.post('/users/discounts')
				.then(resp=>{
					// console.log(resp.data)
					this.discounts = resp.data.discounts
				}).catch(err=>{
					console.log(err)
				})
				
		// 过滤列表   的第二块数据axios
			this.$axios.post('/users/consumption')
				.then(resp=>{
					// console.log(resp.data)
					this.consumption = resp.data.consumption
				}).catch(err=>{
					console.log(err)
				})
		}
	}
</script>

<style scoped="scoped">
	.filterview {
		width: 100%;
		height: 40px;
	}
	
	.maskfilterview {
		width: 100%;
		height: 40px;
		position: fixed;
		top: 45px;
		z-index: 1000;
		background-color: white;
	}
	
	.filterview_ul {
		display: flex;
		justify-content: space-around;
		color: #000000;
		border-bottom: 1px solid #666666;
	}
	
	.filterview_ul li {
		list-style: none;
		line-height: 40px;
		z-index: 999;
	}
	
	/* 综合排序模板后下拉 */
	.Filter_dropdown {
		border-top: 1px solid #65A6FF;
		background-color: white;
		font-weight: 600;
	}
	
	/* 选中的下拉 */
	 .filterselected {
		 width: 100%;
		 height: 40px;
		 line-height: 40px;
		 padding-left: 25px;
		 color:#65A6FF;
	 }
	 
	 /* 没选中的下拉 */
	  .filterselected2 {
	 	 width: 100%;
	 	 height: 40px;
	 	 line-height: 40px;
	 	 padding-left: 25px;
	  }
	  
	  /* 筛选下面的下拉列表 */
	  .Filter_screen {
		  width: 100%;
		  height: auto;
		  background-color: white;
		  border-top: 1px solid #65A6FF;
	  }
	  
	  /* 比如商家服务那几个字 */
	  .screen_font {
		  margin-left: 20px;
		  margin-top: 10px;
		  color: darkgray;
		  font-weight: 600;
		  margin-bottom: 10px;
	  }
	  
	  /* 商家服务下面的ul */
	  .screen_ul {
		  width: 80%;
		  height: auto;
		  padding-left:15%;
		  /* 父元素清除浮动 */
		  overflow: hidden;
	  }
	  
	   .screen_li {
		   list-style: none;
		   width: 120px;
		   height: 30px;
		   /* 子元素浮动 */
		   float: left;
		   padding-left: 10px;
		   background-color: #F9F9F9;
		   line-height: 30px;
		   margin-right:10px;
		   margin-bottom: 5px;
	   }
	   
	   /* 选中后 */
	   .screen_lichecked {
		   list-style: none;
		   width: 120px;
		   height: 30px;
		   /* 子元素浮动 */
		   float: left;
		   padding-left: 10px;
		   background-color: #F9F9F9;
		   line-height: 30px;
		   margin-right:10px;
		   margin-bottom: 5px;
		   background-color:#EBF3FF;
		   color: #65A6FF;
	   }

		/* 筛选下面的按钮 */
		.Filter_screen_button_ul {
			width: 100%;
			height: 45px;
			display: flex;
			justify-content: space-around;
		}

		/* 清空按钮 */
		.Filter_screen_button_ul li:nth-of-type(1) {
			line-height: 45px;
			list-style: none;
			width: 50%;
			text-align: center;
			border-top: 1px solid #ccc;
			background-color: white;
		}
		
		/* 提交按钮 */
		.Filter_screen_button_ul li:nth-of-type(2) {
			line-height: 45px;
			list-style: none;
			width: 50%;
			text-align: center;
			border-top: 1px solid #ccc;
			background-color: #05C655;
		}
</style>
