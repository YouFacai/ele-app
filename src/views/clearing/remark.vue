<template>
	<div class="remark">
		<publictop title='订单备注' :isreturn='true' :isaccomplish='true' @accomplish='accomplish'></publictop>
		<div class="entertext" >
			<textarea placeholder="无接触配送,幸苦将商品挂在门把手上,放前台桌上或者指定地点" v-model="text"
				style="
				width: 94%;
				height: 100%;
				background-color: #F9F9F9;
				border: none;
				outline: none;
				padding: 3% 3%;
				font-size: 16px;
			"></textarea>
			<!-- 文字个数提示 -->
			<div class="textsum">
				{{textlen}}/50个字
			</div>
		</div>
		<!-- 快捷输入 -->
		<div class="fasttitle">快捷输入</div>
		<div style="width: 90%;height: 200px;padding-left: 20px;font-size: 13px;overflow: hidden;">
			<!-- 快捷输入的选项 -->
			<!-- 第一层的ul -->
			<ul class="oneul">
				<li v-for="(data,index) in multiplechoice1" :key='index' @click="addtext(data)">{{data}}</li>
			</ul>
			<!-- 第二层ul -->
			<ul class="tweul">
				<li v-for="(data,index) in multiplechoice2" :key='index' @click="addtext(data)">{{data}}</li>
			</ul>
			<!-- 第三层 -->
			<ul class="threeul">
				<li class="muchli" v-for="(data,index) in muchchoice" :key='index' @click="addtext(data)">{{data}}</li>
			</ul>
			
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import publictop from '@/components/publictop'
	export default {
		components:{
			publictop,
		},
		
		data(){
			return {
				text:'',
				// 快捷输入的选项 （单选）（多选）
				multiplechoice1:['挂门把手上','放在台桌上','放门口','请电话联系我'],
				multiplechoice2:['不要辣','少点辣','多点辣'],
				muchchoice:['不要香菜','不要洋葱','多点醋','多点葱'],
				clickcount:0,
			}
		},
		
		computed:{
			textlen(){
				return this.text.length;
			}
		},
		
		methods:{
			addtext(data){
				if(this.text.length+data.length>50){
					Toast({
					  message: '超出文本长度',
					  position: 'middle',
					  duration: 2000
					});
					return ;
				}
				if(this.clickcount ==0){
					this.text += data;
				}else {
					this.text = this.text+","+data;
				}
				this.clickcount++;
			},
			
			// publictop 点击完成触发的函数
			accomplish(){
				// 将文字打包存在vueX 中
				this.$store.commit('users/THEORDERNOTE',this.text);
				// 跳转路由
				this.$router.push('/clearing');
			}
		},
		
		watch:{
			text(newval,oldval){
				if(newval.length >50){
					this.text = oldval;
					Toast({
					  message: '超出文本长度',
					  position: 'middle',
					  duration: 2000
					});
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.remark {
		width: 100%;
		height: 100vh;
		background-color: white;
		overflow: hidden;
	}
	
	.entertext {
		width: 90%;
		height: 150px;
		margin: auto;
		margin-top: 15px;
	}
	
	textarea::-webkit-input-placeholder {
		color: #B6B6B6;
	}
	
	/* 提示文本的个数 */
	.textsum {
		position: relative;
		top: -30px;
		float: right;
		left: -10px;
		font-size: 14px;
		color: #ccc;
	}
	
	/* 快捷输入的标题 */
	.fasttitle {
		position: relative;
		top: 30px;
		margin-left: 5%;
		color: #ccc;
		margin-bottom: 50px;
	}
	
	/* 第一层ul */
	.oneul {
		width: 320px;
		height: 30px;
		position: relative;
		top: 0px;		
		border: 1px solid #ccc;
		border-radius: 8px;
		overflow: hidden;
		text-align: center;
		float: left;
		margin-bottom: 15px;
	}
	
	.oneul li {
		list-style: none;
		float: left;
		padding: 2px 7px;
		height: 20px;
		top: 4px;
		position: relative;
		overflow: hidden;
		border-right: 1px solid #ccc;
	}
	
	/* 第二层ul */
	.tweul {
		width: 170px;
		height: 30px;
		position: relative;
		top: 0px;		
		border: 1px solid #ccc;
		border-radius: 8px;
		overflow: hidden;
		text-align: center;
		float: left;
		margin-bottom: 15px;
	}
	
	.tweul li {
		list-style: none;
		float: left;
		padding: 2px 7px;
		height: 20px;
		top: 4px;
		position: relative;
		border-right: 1px solid #ccc;
		overflow: hidden;
	}
	
	.muchli {
		list-style: none;
		float: left;
		width: auto;
		line-height: 30px;
		margin-right: 7px;
		height: 30px;
		border: 1px solid #ccc;
		border-radius: 8px;
	}
	
	/* 第三层ul */
	.threeul {
		width: 320px;
		height: 30px;
		text-align: center;
		float: left;
	}
</style>
