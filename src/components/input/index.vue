<template>
	<div style="margin-bottom: 20px;">
		<input :type="title" :placeholder="placeholder" :class="!become?'control1':'control3'" v-model="data"  />
		<input type="button" :disabled="isdisabled" :value="btnvalue" v-if="isbtn" class="control2" @click="$emit('send',data)"/>
		<div v-if="err" style="font-size: 14px; color: red;margin-top: 5px;">{{err}}</div>
	</div>
</template>

<script>
	export default {
		props:{
			title:{									//input的类型
				type:String,						
				default:'text'
			},
			err:'',									//报的红字错误 
			placeholder:'',							//input中的提示语
			isbtn:{									//是否需要按钮控件
				type:Boolean,
				default:false
			},
			btnvalue:'',							//按钮控件的Value
			become:'',								//是否让错误的input 显示红色边框
			isdisabled:''							//当点击的时候让 按钮控件不可用
		},
		data(){
			return {
				data:''
			}
		},
		methods:{
			
		},
		watch:{
			data(newval,oldval){
				this.$emit('sendverification',newval)
			}
		}
	}
</script>

<style scoped="scoped">
	/* 控件一输入框 */
	.control1{
		width: 60%;
		height: 30px;
		border-radius: 5px;
		outline: none;
		border: 2px solid #ccc;
	}
	
	/* 电话错误时的控件 */
	.control3{
		width: 60%;
		height: 30px;
		border-radius: 5px;
		outline: none;
		border: 2px solid red;
	}
	
	/* 按钮框 */
	.control2 {
		width: 80px;
		height: 36px;
		outline: none;
		border: none;
		font-weight: 600;
		background-color: transparent;
		position: relative;
		right: 88px;
		top: 2px;
	}
</style>


<!-- Login  下的 组件表单控件 -->
	<!-- 思路 -->
<!-- 		1.这只是个表单模板，具体数据需要view 视图用属性来传  这里的props 来接 然后设置 input属性
		2.具体是数据绑定是在模板中获取的（v-model） 再用	this.$emit('send',data)
			2.1  在子组件中 就用  @send='handler()' 来接 		！注意 默认的形参就是data -->



