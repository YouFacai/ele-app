<template>
	<div :class="this.$store.state.users.ismasking||this.$store.state.users.isscreen?'maskingtopbar':'topbar'" >
		<div class="topbar_location" @click="$router.push('/address')">
			<i class="iconfont" style="color: white;">&#xe63e;</i>
			<span style="color: white;font-size: 14px;margin-left: 3px;">收获地址</span>
			<div class="detailed_address">
				{{this.$store.state.users.address.location}}
			</div>
			<i class="iconfont pull_down" >&#xe611;</i>
		</div>
			<div style="display: flex;justify-content: center;position: relative;top: 25px;width: 100%;">
				<input type="text" value="" class="topbar_search" @click="selectfilm()" placeholder="请输入电影名称">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'topbar',
		data(){
			return {
				
			}
		},
		methods:{
			selectfilm(){
				// 点击搜索就跳转到   搜索电影的路由
				this.$router.push('/selectfilm');
			}
		}
	}
</script>

<style scoped="scoped">
	/* 默认的topbar样式 */
	.topbar {
		width: 100%;
		height: 85px;
		background-color: #65A6FF;
		position: sticky;
		top: -32px;
		z-index: 1000;
	}
	
	/* 遮罩层出来后的topbar样式 */
	.maskingtopbar {
		width: 100%;
		height: 85px;
		background-color: #65A6FF;
		position: absolute;
		top: -35px;
		z-index: 900;
	}
	/* 搜索框样式 */
	.topbar_search {
		width: 90%;
		height: 25px;
		border-radius: 5px;
		outline: none;
		border: none;
		text-align: center;
	}
	
	/* 定位信息 */
	.topbar_location {
		width: 100%;
		position: relative;
		top: 10px;
		padding-left:15px ;
		z-index: 1000;
	}
	
	/* 详细地址 */
	.detailed_address {
		position: relative;
		display: inline-block;
		width: 60%;
		height: 19px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-left: 20px;
	}
	
	/* 详细下拉 */
	.pull_down {
		position: absolute;
		right: 40px;
		color: white;
	}
	

</style>
