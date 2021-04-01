<template>
	<div class="picker">
		<div class="picker_header" style="overflow: hidden;">
			<div style="width: 100px;margin: auto;text-align: center;font-size: 20px;font-weight: 600;margin-top: 20px; height: 100%;">餐具份数</div>
			<i class="iconfont" style="float: right;margin-right: 20px;margin-top: -20px;color: #ccc;" @click="$emit('cancelshade')">&#xe60b;</i>
		</div>
		<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {
		Picker
	} from 'mint-ui';
	export default {
		data() {
			return {
				slots: [{
					flex: 1,
					values: [0,1,2,3,4,5,6,7,8,9,10],
					className: 'slot1',
					textAlign: 'center',
					defaultIndex:this.$store.state.users.currenttableware,
					sign:0,
				}]
			}
		},

		methods: {
			onValuesChange(picker, values) {
				// 把选中的餐具数量返回给父元素
				if(values == 0){
					if(this.sign ==1){
						this.$store.commit('users/CURRENTTABLEWARE',values);
						this.sign = 0;
					}
					this.sign = 1;
				}else {
					this.$store.commit('users/CURRENTTABLEWARE',values);
					this.$emit('Numberoftableware',values);
				}
			}
		},

	}
</script>

<style>
</style>
