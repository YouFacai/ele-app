<template>
	<div class="bigimg" @click="$emit('noshowbigimg')">
		<div style="color: white;text-align: center;margin-top: 10px;">{{currentimgindex+1}}/{{imglist.length}}</div>
		<div class="content">
			<mt-swipe :auto="0" :continuous='false' @change="handleChange" :defaultIndex='currentimgindex'>
					<mt-swipe-item v-for='(data,index) in imglist' :key='index' >
						<img :src="data.bigPicUrl" alt="" style="width: 100%;height: 100%;">
					</mt-swipe-item> 
			</mt-swipe>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { Swipe, SwipeItem } from 'mint-ui';
	Vue.component(Swipe.name, Swipe);
	Vue.component(SwipeItem.name, SwipeItem);
	export default {
		props:{
			imglist:Array,
			currentimgindex:Number,
			imglength:Number,
		},
		
		methods:{
			handleChange(index){
				this.$emit('update',index)
			}
		}
	}
</script>

<style scoped="scoped">
	.bigimg {
		width: 100%;
		position: fixed;
		top: 0px;
		height: 1000px;
		background-color: black;
		z-index: 900;
	}
	
	/* 中心内容 */
	.content {
		width: 100%;
		height: 400px;
		position: absolute;
		top: 50%;
		margin-top: -400px;
	}
</style>
