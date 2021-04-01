<template>
  <div id="app">
	<div class="masking">
		<keep-alive>
			<router-view/>
		</keep-alive>
	</div>
  </div>
</template>
<script>
	export default {
		created() {
			//高德地图 浏览器定位    
			var map = new AMap.Map('container', {
			  resizeEnable: true
			})
			//里面的哪个this指向 和 外面那个this的指向不一样 
			var self = this;
			AMap.plugin('AMap.Geolocation', function() {
			  var geolocation = new AMap.Geolocation({
			    // 是否使用高精度定位，默认：true
			    enableHiCghAccuracy: true,
			    // 设置定位超时时间，默认：无穷大
			    timeout: 10000,
			  })
			
			  geolocation.getCurrentPosition()
			  AMap.event.addListener(geolocation, 'complete', onComplete)
			  AMap.event.addListener(geolocation, 'error', onError)
					
			  function onComplete (data) {
			    // data是具体的定位信息
				self.$store.commit('users/SAVEADDRESS',{
					location:data.formattedAddress,
					city:data.addressComponent.city
				});
			  }

			  function onError (data) {
			    // 定位出错
				//如果出错了 就走ip 定位   (IP定位获取当前城市信息)
				AMap.plugin('AMap.CitySearch', function () {
				  var citySearch = new AMap.CitySearch()
				  citySearch.getLocalCity(function (status, result) {
				    if (status === 'complete' && result.info === 'OK') {
				      // 查询成功，result即为当前所在城市信息
					  //地理编码与逆地理编码       (逆向地理编码方法)
					  AMap.plugin('AMap.Geocoder', function() {
					    var geocoder = new AMap.Geocoder({
					      // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
					      city: result.adcode
					    })
					   
					    var lnglat = result.rectangle.split(';')[0].split(',');
					  
					    geocoder.getAddress(lnglat, function(status, data) {
					      if (status === 'complete' && data.info === 'OK') {
					          // result为对应的地理位置详细信息
							  self.$store.commit('users/SAVEADDRESS',{
								  location:data.regeocode.formattedAddress,
								  city:data.regeocode.addressComponent.city
							  });
					      }
					    })
					  })
				    }
				  })
				})
			  }
			})
		},
		
		
	}
</script>

<style lang="scss">
</style>
