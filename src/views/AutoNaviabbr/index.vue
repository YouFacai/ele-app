<template>
	<div class="AutoNaviabbr">
		<publictop title='确认收货地址' :isreturn='true'></publictop>
		<div class="navigation">
			<div class="address">
				<div @click="$router.push('/city')" style="margin-left: 15px; width: 60px;overflow: hidden;height: 40px;line-height: 40px;border-radius-: 15px;">{{this.$store.state.users.address.city}}</div>
				<i class="iconfont" style="position: relative;top: -30px;left: 65px;color: #ccc;">&#xe656;</i>
				<i class="iconfont" style="position: absolute;top: 10px;left: 90px;  color: #ccc;z-index: 900;font-size: 22px;">&#xe612;</i>
				<input @click="$router.push('/address')" type="text" placeholder="小区/写字楼/学校 等" class="address_input">
			</div>
		</div>
		<div id="container"></div>
		<div class="addresslist" ref='addresslist_ul'>
			<ul style="padding-left: 20px;"  class="addresslist_ul">
				<li v-for="(data,index) in datalist" :key='index' style="list-style: none;margin-bottom: 6px;" @click="updateaddress(data,index)">
					<i class="iconfont" style="float: left;margin-top: 10px;">&#xe604;</i>
					<div style="overflow: hidden;margin-left: 30px;">
						<div :class="index==0?'currentaddress':'waitingaddress'" >{{data.name}}</div>
						<div style="width: 90%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-size: 14px;color: #222;">{{data.address}}</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import BScroll from "better-scroll"
	import publictop from '@/components/publictop'
	export default {
		data(){
			return {
				datalist:[],
				address:'',
			}
		},
		
		components: {
			publictop,
		},

		mounted() {
			var self = this;
			var map = new AMap.Map('container', {
				resizeEnable: true
			});
			AMap.plugin('AMap.Geolocation', function() {
				var geolocation = new AMap.Geolocation({
					enableHighAccuracy: true, //是否使用高精度定位，默认:true
					timeout: 10000, //超过10秒后停止定位，默认：5s
					buttonPosition: 'RB', //定位按钮的停靠位置
					buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
					zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点

				});
				map.addControl(geolocation);
				geolocation.getCurrentPosition(function(status, result) {
					if (status == 'complete') {
						onComplete(result)
					} else {
						onError(result)
					}
				});
			});
			//解析定位结果
			function onComplete(data) {
				// console.log(data)
				self.address = data.formattedAddress;
				self.$nextTick(()=>{
					var keywords = self.address;
					      AMap.plugin('AMap.PlaceSearch', function(){
					        var autoOptions = {
					          city: '全国'
					        }
					        var placeSearch = new AMap.PlaceSearch(autoOptions);
					        placeSearch.search(keywords, function(status, result) {
					          // 搜索成功时，result即是对应的匹配数据
					          self.datalist = result.poiList.pois;
							  // 等数据上去了之后再开始更好的滚动
							  // self.$nextTick(()=>{
									new BScroll(self.$refs.addresslist_ul, {
									scrollbar: {
										fade: false, //是否需要滚动条
									},
									//注意better-scroll中  @click 是使用不了的  要用@tap
									tap: true,
									click: true,
								})
							  // })
							  // console.log(result.poiList.pois)
					        })
					      })
				})
				var str = [];
				str.push('定位结果：' + data.position);
				str.push('定位类别：' + data.location_type);
				if (data.accuracy) {
					str.push('精度：' + data.accuracy + ' 米');
				} //如为IP精确定位结果则没有精度信息
				str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
			}
			//解析定位错误信息
			function onError(data) {
				console.log(data)
			}
		},
		
		methods:{
			updateaddress(data,index){
				// 存下删除的元素
				var removedata = this.datalist.splice(index,1);
				// 将删除的元素添加到数组的第一个
				this.datalist.unshift(removedata[0]);
				// 用VueX存储收货地址
				this.$store.commit('users/SHIPPINGADDRESS',data.name)
				// 路由跳转
				this.$router.push('/addaddress');
			}
		}
	}
</script>

<style scoped="scoped">
	.AutoNaviabbr {
		width: 100%;
		height: 100vh;
		background-color: white;
		overflow: hidden;
	}

	.address {
		position: relative;
		top: 20px;
		width: 90%;
		height: 40px;
		background-color: #F1F1F1;
		margin: auto;
		border-radius: 15px;
	}

	/* 确认收货下面的input */
	.address_input {
		outline: none;
		border: none;
		border-left: 1px solid #ccc;
		padding-left: 30px;
		position: relative;
		top: -32px;
		background-color: #F1F1F1;
		left: 65px;
	}

	#container {
		height: 300px;
		width: 100%;
		position: relative;
		top: 30px;
	}
	
	.addresslist{
		margin-top: 40px;
		height: 170px;
		overflow: hidden;
	}
	
	.addresslist_ul li{
		list-style: none;
		height: 60px;
	}
	
	/* 当前地址的样式 */
	.currentaddress {
		color:#15A3FA;
		margin-bottom: 2px;
		font-weight: 600;
	}
	
	/* 待选地址的样式 */
	.waitingaddress {
		margin-bottom: 2px;
		font-weight: 600;
	}
</style>
