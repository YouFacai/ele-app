<template>
	<div class="index" > 
		<topbar ></topbar>
		<router-view ></router-view>
		<bottombar></bottombar>
	</div>
</template>

<script>
	import bottombar from '@/components/bottombar'
	import topbar from '@/components/topbar'
	export default {
		name:'index',
		components:{
			bottombar,
			topbar,
		},
	}
</script>

<style scoped="scoped">
	.index {
		width: 100%;
		height: 100%;
	}
	
</style>
