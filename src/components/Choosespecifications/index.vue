<template>
	<div>
		<!-- 遮罩层 -->
		<div class="mask" v-if="isshow" @click="returnisshow"></div>
		<transition name='Choosespecifications'>
			<div v-if="isshow">
				<div  class="Choosespecifications">
					<div style="text-align: center; font-weight: 600;position: fixed;left: 50%;margin-left: -149px;width: 298px;background-color: white;height: 40px;line-height: 40px;">{{datalist.spuName}}</div>
					<div style="margin-top: 40px;overflow: auto;height: 200px;">
						<ul v-for="(data,index) in datalist.spuAttrList" :key='index' class="Choosespecifications_ul" >
							<div style="margin-left: 10px;overflow: hidden;">{{data.spuAttrName}}:</div></br>
							<div class="Choosespecifications_div" ref='index'>
								<li v-for="(select,i) in data.spuAttrValueList" :ref='i' :key='select.attrId' @click="selectburdening(data.spuAttrValueList,index,$event)">{{select.attrValue}}</li>
							</div>
						</ul>
					</div>
					<div class="count">
						<div style="font-size: 28px;color: red;width: 50%;height: 60px;line-height: 60px;margin-left: 15px;">￥{{this.datalist.praiseNum*this.datalist.currentPrice}}</div>
						<calculate @updatenum='updatenum' v-if="this.datalist.praiseNum!=0" :num='this.datalist.praiseNum'></calculate>
						<div v-else class="Choose_specifications" @click="add()" >加入购物车</div>
					</div>
				</div>
				
			</div>
		</transition>
	</div>

</template>

<script>
	import calculate from '@/components/calculate'
	export default {
		components:{
			calculate,
		},
		data(){
			return {

			}
		},
		props:{
			datalist:Object,
			isshow:{
				default:true,
				string:Boolean,
			}
		},
		methods:{
			returnisshow(){
				this.$emit('Cancelmask');	
			},
			
			// 点击选项  选项卡变色
			selectburdening(datalist,index,el){
				var allli = this.$refs.index[index].getElementsByTagName('li');
				allli.forEach((item,index)=>{
					item.style.color = 'black';
					item.style.backgroundColor = 'white';
				})
				el.target.style.color = '#FFB000';
				el.target.style.borderColor = '#FFB000';
			},
			
			// 加入购物车
			add(){
				this.datalist.praiseNum++;
			},
			
			updatenum(data){
				this.datalist.praiseNum=data;
			}
		},
		
		watch:{
	
		}
	}
</script>

<style scoped="scoped">
	/* mask 遮罩层*/
	.mask {
		width: 1000%;
		height: 1300px;
		position: absolute;
		top: -500px;
		z-index: 900;
		background-color: #999;
		opacity: 0.6;
	}
	
	.Choosespecifications {
		width: 310px;
		height: 300px;
		position: fixed;
		left: 50%;
		background-color: white;
		margin-left: -155px;
		z-index: 900;
		border-radius: 8px;
		background-color: white;
		top: 30%;
	}
	
	.Choosespecifications-enter-active, .Choosespecifications-leave-active {
	  transition: opacity .5s;
	}
	.Choosespecifications-enter, .Choosespecifications-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0;
	}
	
	.Choosespecifications_div {
		width: 85%;
		/* display: flex;
		justify-content: space-around;
		flex-wrap: wrap; */
		display: block;
		padding: 0px 20px;
	}
	
	.Choosespecifications_div li {
		list-style: none;
		height: 25px;
		border: 1px solid #c4c4c4;
		padding: 5px 10px;
		line-height: 25px;
		margin-bottom: 5px;
		border-radius: 2px;
		float: left;
		margin-right: 5px;
	}
	
	.Choosespecifications_ul {
		width: 100%;
		height: auto;
		overflow: hidden;
	}
	
	/* 计算全部的钱 */
	.count {
		width: 310px;
		height: 60px;
		z-index: 900;
		position: absolute;
		left: 50%;
		margin-left: -155px;
		border-radius: 0 0 8px 8px ;
	}
	
	/* 加入购物车样式 */
	.Choose_specifications {
	    border-radius: 20px;
	    background-color: #ffbd27;
	    /* background-image: linear-gradient(-135deg, #FFBD27 0%, #FFD161 100%); */
	    line-height: 35px;
	    font-size: 12px;
		height: 35px;
		text-align: center;
	    padding: 0 10px;
		width: 66px;
		position: relative;
		top: -45px;
		left: 190px;
	}
</style>
