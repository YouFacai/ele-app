<template>
  <div class="Rating-gray">
		<ul class="Rating-gray_ul">
			<li v-for="(data,index) in length" :key='index'>
				<svg class="icon" aria-hidden="true" style="width: 10px;height: 20px;">
				    <use xlink:href="#icon-one-star"></use>
				</svg>
			</li>
			<svg v-if="needquasar" class="icon" aria-hidden="true" style="width: 10px;height: 20px;">
			    <use xlink:href="#icon-banxing"></use>
			</svg>
		</ul>
  </div>
</template>

<script>
export default {
  name: "Rating",
  props: {
    rating: Number,
  },
  data(){
	return {
		needquasar:Boolean, 
		length:Number,
	}
  },
  watch:{
	  rating(newval,oldval){
		  this.length = Math.floor(newval);
		  if(newval-Math.floor(newval)!=0){
			  this.needquasar = true;
		  }else {
			   this.needquasar = false;
		  } 
	  }
  }
};
</script>

<style scoped="scoped">
	.Rating-gray_ul li{
		list-style: none;
		width: 15px;
		float: left;
	}
</style>


<!-- 
 <svg class="icon" aria-hidden="true">
     <use xlink:href="#icon-one-star"></use>
 </svg>
 <svg class="icon" aria-hidden="true">
     <use xlink:href="#icon-banxing"></use>
 </svg>
 -->