<template>
	<div style="width: 100%;height: 90%;overflow-y: hidden;">
		<div class="topbar">
			<div class="input_box">
				<i class="iconfont search_icon">&#xe612;</i>
				<input type="text" placeholder="输入城市名" v-model="cityval" class="searchcity" />
			</div>
			<span class="return" @click="$router.push('/address')">取消</span></br>
		</div>
		
		<div v-if="this.screencity.length">
			<ul>
				<li v-for="data in screencity" :key='data.cityId' class="screenCity" @click="selectcityindex(data)">{{data.name}}</li>
			</ul>
		</div>
		
		<div  v-else>
			<div style="position: absolute;top: 70px;left: 7%;">当前定位</div>
			<i class="iconfont GPSicon">&#xe61f;</i>
			<div style="
		position: absolute;
		top: 98px;
		left: 12%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 80%;
		font-weight: 600;
		">{{this.$store.state.users.address.location}}</div>
			<span style="margin-left: 20px;position: relative;top: 10px;">热门城市</span>
			<div class="hotcity">
				<ul class="hotcity_ul">
					<li style="list-style: none;" v-for="data in datahotcity" :key='data.cityId' @click="selecthotcity(data)">{{data.name}}</li>
				</ul>
			</div>
			<div id="indexlist" ref='alladdress'>
				<mt-index-list>
					<mt-index-section :index="data.index" v-for='data in datalist' :key='data.cityId'>
						<div @click="selectcity(city)" v-for='(city,index) in data.data' :key='city.cityId'>
							<mt-cell :title="city.name"></mt-cell>
						</div>
					</mt-index-section>
				</mt-index-list>
			</div>
		</div>

		
		<!-- <bottombar></bottombar> -->
	</div>
</template>

<script>
	// import bottombar from '@/components/bottombar'
	import BScroll from "better-scroll"
	import {
		IndexList,
		IndexSection
	} from 'mint-ui';
	import Vue from 'vue'
	Vue.component(IndexList.name, IndexList);
	Vue.component(IndexSection.name, IndexSection);
	export default {
		components: {
			// bottombar
		},

		mounted() {
			this.$axios({
				url: 'https://m.maizuo.com/gateway?k=9841927',
				headers: {
					'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1595938362186418760515585"}',
					'X-Host': 'mall.film-ticket.city.list'
				}
			}).then(resp => {
				this.datahotcity = this.normchotcity(resp.data.data.cities);
				this.datalist = this.normcity(resp.data.data.cities);
			}).catch(err => {
				console.log(err)
			})
		},

		data() {
			return {
				datalist: [],
				datahotcity: [],
				//输入框输入后筛选出来的城市
				screencity:[],
				cityval:''
			}
		},
		watch:{
			cityval(newval,oldval){
				this.findcity(newval);
			}
		},
		methods: {
			//规范城市顺序
			normcity(data) {
				var arr = [];
				var arrcity = [];
				for (var i = 65; i < 91; i++) {
					arr.push(String.fromCharCode(i));
				}

				//遍历城市中的每个数据(按开头字母排序)
				for (var j = 0; j < arr.length; j++) {
					var arrtemp = [];
					for (var k = 0; k < data.length; k++) {
						arrtemp = data.filter((itme, i) => {
							return itme.pinyin.substring(0, 1) == arr[j].toLowerCase()
						})
					}

					//单次
					// console.log(arrtemp)
					if (arrtemp.length > 0) {
						arrcity.push({
							index: arr[j],
							data: arrtemp,
						})
					}
				}
				//完成的列表
				return arrcity;
			},

			//选出热门城市
			normchotcity(data) {
				//遍历城市中的每个数据(筛选除热门城市)
				var hottemp = [];
				hottemp = data.filter(itme => {
					return itme.isHot
				})
				return hottemp;
			},

			//选出城市
			selectcity(data) {
				this.$store.commit('users/SAVEADDRESS', {
					city: data.name + '市',
					location:this.$store.state.users.address.location
				})
				this.$router.push('/address')
			},
			selecthotcity(data) {
				this.$store.commit('users/SAVEADDRESS', {
					city: data.name + '市',
					location:this.$store.state.users.address.location
				})
				this.$router.push('/address')
			},
			selectcityindex(data) {
				this.$store.commit('users/SAVEADDRESS', {
					city: data.name + '市',
					location:this.$store.state.users.address.location
				})
				this.$router.push('/address')
			},
			
			//通过输入框查找城市
			findcity(data){
				//如果输出为空就直接出去
				if(data == ''){
					this.screencity=[];
					return
				}
				//每次进来通过输入选择的城市要清空数组  	因为下面要进行数组拼接
				this.screencity=[];
				//先循环每个
				for(var i = 0;i<this.datalist.length;i++){
					//再进行第二层的赛选
					var temp=this.datalist[i].data.filter((item,index)=>{
						//返回找到的
						return item.name.indexOf(data)!=-1
					})
					if(temp.length != 0){
						//数组拼接
						this.screencity = [...this.screencity,...temp]
					}
				}
			}
		}
	}
</script>

<style scoped="scoped">
	html,body {
		width: 100%;
		overflow-y: hidden;
		height: 100% !important;
	}
	
	.topbar {
		width: 100%;
		height: 130px;
		background-color: white;
	}

	/* 输入框外面的灰色盒子 */
	.input_box {
		width: 75%;
		background-color: #F1F1F1;
		height: 40px;
		border-radius: 8px;
		float: left;
		margin-left: 7%;
		margin-top: 20px;
	}

	.return {
		color: #7AB2FF;
		float: left;
		margin-top: 30px;
		margin-left: 10px;
	}

	/* icon 图标 */
	.search_icon {
		font-size: 22px;
		line-height: 40px;
		margin-left: 10px;
		opacity: 0.5;
	}

	/* input 输入框 */
	.searchcity {
		position: relative;
		top: -5px;
		margin-left: 3px;
		outline: none;
		border: none;
		background-color: #F1F1F1;
	}

	/* 当前地址 */
	.currentaddress {
		position: absolute;
		top: 90px;
		left: 25px;
	}

	/* 当前定位的icon图标 */
	.GPSicon {
		position: absolute;
		top: 98px;
		left: 0px;
		left: 7%;
		color: #7AB2FF;
	}

	/* 热门城市列表渲染 */
	.hotcity {
		margin-top: 20px;
	}

	.hotcity_ul {
		width: 100%;
		height: 50px;
		margin-top: 10px;
		font-size: 20px;
		background-color: #F1F1F1;
		display: flex;
		justify-content: space-around;
		margin-bottom: 20px;
	}

	.hotcity_ul li {
		background-color: white;
		width: 100px;
		line-height: 50px;
		text-align: center;
	}

	/* 开始搞索引列表  */
	/* 右侧的索引 */
	#indexlist {
		height: 100%;

	}

	.mint-indexsection-index {
	
	}
	
	/* 筛选出来的city样式 */
	.screenCity {
		width: 90%;
		background-color: white;
		border-bottom: 1px solid #F1F1F1;
		height: 50px;
		line-height: 50px;
		padding-left: 10%;
	}
</style>
