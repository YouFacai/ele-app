<template>
	<div class="calculate" >
		<img src="@/assets/img/subtract.png" alt="" @click="subtract()">
		<span style="position: relative;top: -15px;margin-left: 9px;">{{num}}</span>
		<img @click="add()" style="width: 26px;height: 26px;position: relative;top: -7px;margin-left: 20px;" src="http://s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9096d347/318c525df8eba9c557594305c44b2ddf.png" alt="">
	</div>
</template>

<script>
	export default {
		props:{
			num:Number
		},
		
		methods:{
			// 减少
			subtract(){
				if(this.num!=0){
					this.num--
				}
				// 返回父元素修改  num 
				this.$emit('updatenum',this.num);
			},
			
			// 增加
			add(){
				this.num++
				this.$emit('updatenum',this.num);
			}
		}
	}
</script>

<style scoped="scoped">
	.calculate {
		position: relative;
		top: -50px;
		left: 150px;
	}
</style>
