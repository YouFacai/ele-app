<template>
	<div class="bottombar">
		<ul>
			<router-link tag='li' to='/home' active-class='Selectrouting'>首页<br /> <i class="iconfont">&#xe60c;</i></router-link>
			<router-link tag='li' to='/order' active-class='Selectrouting'>订单<br /> <i class="iconfont">&#xe608;</i></router-link>
			<router-link tag='li' to='/me' active-class='Selectrouting'>我的<br /> <i class="iconfont">&#xe639;</i></router-link>
		</ul>
	</div>
</template>

<script>
</script>

<style scoped="scoped">
	.bottombar {
		padding-top: 5px;
		width: 100%;
		background-color: white;
		position: fixed;
		bottom: 0px;
	}
	
	.bottombar ul {
		padding-left: 0px;
		overflow: hidden;
		display: flex;
		justify-content: space-around;
		height: 50px;
	}
	.bottombar li {
		text-align: center;
		width: 60px;
		float: left;
		list-style: none;
	}
	
	.bottombar li i {
		font-size: 24px;
		position: relative;
		top: 5px;
	}
	
	/* 当前路由的高光特效 */
	.Selectrouting {
		color: #1678FF;
	}
</style>
