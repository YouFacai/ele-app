<template>
	<div class="publictop">
		<div @click="back()" v-if="isreturn" style="position: absolute;font-size: 17px;top: 15px;left: 5px;"><i class="iconfont">&#xe641;</i>返回</div>
		<div style="text-align: center;float: left;width: 100%;margin-top: 13px;font-size: 18px;">{{title}}</div>
		<div class="accomplish" v-if="isaccomplish" @click="accomplish">完成</div>
	</div>
</template>

<script>
	export default {
		props:{
			//标题
			title:{
				type:String,
			},
			//是否需要返回按钮
			isreturn:{
				type:Boolean,
				default:false,
			},
			returnaddress:{
				type:String,
				default:null,
			},
			// 是否需要完成按钮
			isaccomplish:{
				type:Boolean,
				default:false,
			}
		},
		
		methods:{
			back(){
				if(this.returnaddress){
					this.$router.push(`${this.returnaddress}`);
				}else {
					this.$router.back(-1);
				}
			},
			
			// 在订单备注中点击完成
			accomplish(){
				// 触发父元素的   函数
				this.$emit('accomplish');
				
			}
		}
	}
</script>

<style scoped="scoped">
	.publictop {
		width: 100%;
		height: 50px;
		background-color: #65A6FF;
		color: white;
	}
	
	/* 完成按钮 */
	.accomplish {
		float: right;
		position: relative;
		top: -22px;
		left: -20px;
	}
</style>
