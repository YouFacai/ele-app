<template>
	<div class="navbar" id="boxFixed">
		<ul class="navbar_ul">
			<router-link tag='li' :to="shippingorder"  active-class='fouce'>点餐</router-link>
			<router-link tag='li' :to="evaluate"  active-class='fouce'>评价</router-link>
			<router-link tag='li' :to="merchant"  active-class='fouce'>商家</router-link>
		</ul>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				shippingorder:`/filmdetailed/${localStorage.getItem('filmID')}/shippingorder`,
				evaluate: `/filmdetailed/${localStorage.getItem('filmID')}/evaluate`,
				merchant:`/filmdetailed/${localStorage.getItem('filmID')}/merchant`,
			}
		},
		
		mounted() {
		
		},
		
		methods:{
			
		
		},
		
		beforeRouteEnter(to,from,next) {
			next(vm=>{
				vm.shippingorder = `/filmdetailed/${localStorage.getItem('filmID')}/shippingorder`;
				vm.evaluate = `/filmdetailed/${localStorage.getItem('filmID')}/evaluate`;
				vm.merchant = `/filmdetailed/${localStorage.getItem('filmID')}/merchant`;
				
			})
		}
	}
</script>

<style scoped="scoped">
	.navbar {
		width: 100%;
		position: sticky;
		top: 0px;
		background-color: white;
		z-index: 1;
	}
	
	.navbar_ul {
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
	
	.navbar_ul li {
		list-style: none;
		padding: 5px 0px;
	}
	
	.fouce {
		border-bottom: 3px solid #65A6FF;
	}
</style>
