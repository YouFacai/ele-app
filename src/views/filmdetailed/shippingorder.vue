<template>
	<div class="shippingorder">
		<!-- 单品菜单 -->
		<itemfood :isshowitemfood='isshowitemfood' :selectdata='selectdata' @cancel='isshowitemfood=false'></itemfood>
		<div class="recommend">
			<div style="margin-left: 8%;">商家推荐</div>
			<ul class="recommend_ul">
				<li v-for="(data,index) in datalist.recommend.spuList" :key='index'>
					<img :src="data.littleImageUrl" alt="" style="width: 140px;height: 140px;position: relative;left: 50%;margin-left: -70px;">
					<div style="font-size: 14px;font-weight: 600;white-space: nowrap;">{{data.spuName}}</div>
					<div style="font-size: 14px;color: #999;white-space: nowrap;width: 140px;text-overflow: ellipsis;overflow: hidden;">{{data.spuDesc}}</div>
					<div style="font-size: 14px;color: #999;">售价：<span style="color: red;font-weight: 600;">{{data.currentPrice}}</span>/杯</div>
					<div @click="update(data)" v-if="data.praiseNum!=0">
						<calculate :num='data.praiseNum' @updatenum='updatenum' style="
							position: relative;
							top: 0px;
							left: 0px;
						"></calculate>
					</div>
					<div v-else class="Choose_specifications" @click="Choosedosing(data)">选规格</div>
				</li>
			</ul>
		</div>
		<Choosespecifications @Cancelmask='Cancelmask()' :datalist='choosedatalist' :isshow='isshow'></Choosespecifications>
		<div class="commodityclassify">
			<!-- 左侧菜单栏 -->
			<div class="leftmenu" ref='SCleftmenu'>
				<ul class="leftmenu_ul">
					<li v-for="(data,index) in datalist.categoryList" :key='index' @click="skip(index)" :class="currentheight==index?'foucs':'nofoucs'">
						<img :src="data.iconUrl" alt="">{{data.categoryName}}
					</li>
				</ul>
			</div>
			<!-- 右侧菜单栏 -->
			<div class="rightmenu" ref='BSrightmenu'>
				<ul class="rightmenu_ul">
					<div v-for='(data,index) in datalist.categoryList' :key='index' class="rightmenu_ul_div">
						<li v-for='(item,i) in data.spuList' :key='i' @click="detailfood(item)">
							<img :src="item.littleImageUrl" alt="" style="width: 100px;height: 80px;float: left;">
							<div class="rightmenucontent">
								<div class="rightmenucontent_name">{{item.spuName}}</div>
								<div class="rightmenucontent_introduce">{{item.spuDesc}}</div>
								<div class="rightmenucontent_sale">月售{{rank}} 赞{{rank}}</div>
								<div class="rightmenucontent_currentPrice">¥{{item.currentPrice}}</div>
								<div @click.stop="update(item)" v-if="item.praiseNum!=0">
									<calculate :num='item.praiseNum' @updatenum='updatenum' style="
										position: relative;
										float: right;
										top: -38px;
										left: -20px
									"></calculate>
								</div>
								<div v-else class="Choose_specifications2" @click.stop="Choosedosing(item)" style="top: -30px;margin-left: 10px;">选规格</div>
							</div>
						</li>
					</div>
				</ul>
			</div>
		</div>
		<shoppingcart :iscartempty='iscartempty' :sumprice='sumprice' :sumcount='sumcount' :allcommodity='allcommodity'></shoppingcart>
	</div>
</template>

<script>
	import calculate from '@/components/calculate'
	import BScroll from "better-scroll"
	import Choosespecifications from '@/components/Choosespecifications'
	import shoppingcart from '@/components/shoppingcart'
	import itemfood from '@/components/itemfood'
	export default {
		components: {
			Choosespecifications,
			shoppingcart,
			calculate,
			itemfood,
		},
		data() {
			return {
				datalist: [],
				choosedatalist: [],
				isshow: false,
				Scrollleft: {},
				Scrollright: {},
				// 右侧渲染的滚动  高度y
				scrollY: 0,
				// 存 左侧大标题下   每个内容的高度
				contenthigh: [],
				currentnum: Number,
				// 全部商品的总价
				sumprice: 0,
				// 全部商品的个数
				sumcount: 0,
				// 全部商品
				allcommodity: [],
				// 是否需要单品菜单
				isshowitemfood:false,
				// 选中的 数据
				selectdata:[],
			}
		},
		mounted() {
			this.$axios.post('/users/milkytea').then(resp => {
				window.localStorage.setItem('shopName',resp.data.data.shopName);
				this.datalist = resp.data.data;
				this.$nextTick(() => {
					this.Scrollleft = new BScroll(this.$refs.SCleftmenu, {
						scrollbar: {
							fade: false, //是否需要滚动条
						},
						//注意better-scroll中  @click 是使用不了的  要用@tap
						tap: true,
						click: true,
					})

					this.Scrollright = new BScroll(this.$refs.BSrightmenu, {
						scrollbar: {
							fade: false, //是否需要滚动条
							interactive: false
						},
						//注意better-scroll中  @click 是使用不了的  要用@tap
						tap: true,
						click: true,
						probeType: 3,
					})

					// 对右侧的滚动进行监听
					this.Scrollright.on('scroll', (pos) => {
						this.scrollY = Math.abs(Math.floor(pos.y))
					})

					// 存左侧大标题下  每个内容的高度
					var Alldiv = this.$refs.BSrightmenu.getElementsByClassName('rightmenu_ul_div');
					// 首位先补个0   0-1 是个第一个高度的区间
					this.contenthigh = [0];
					var sumheight = 0;
					Alldiv.forEach((item, index) => {
						sumheight += item.clientHeight;
						this.contenthigh.push(sumheight)
					})
				})
			})
		},

		computed: {
			rank() {
				return Math.floor(Math.random() * 100);
			},

			// 根据右边高度返回   index  来确定  左边是哪一个
			currentheight() {
				for (var i = 0; i < this.contenthigh.length - 1; i++) {
					if (this.contenthigh[i] < this.scrollY && this.contenthigh[i + 1] > this.scrollY) {
						return i;
					}
				}
				return 0;
			},

			// 判断购物车有没有东西
			iscartempty() {
				// 价格  个数  商品列表全部清零
				this.sumprice = 0;
				this.sumcount = 0;
				this.allcommodity = [];

				// 是否为空的返回标志
				var tempreturn = true;
				// 商家推荐
				this.datalist.recommend.spuList.forEach((item, index) => {
					if (item.praiseNum != 0) {
						tempreturn = false;
						this.sumprice += item.currentPrice * item.praiseNum;;
						this.sumcount += item.praiseNum;
						this.allcommodity.push(item);
					}
				})

				// 索引列表
				this.datalist.categoryList.forEach((data, index) => {
					data.spuList.forEach((list, i) => {
						if (list.praiseNum != 0) {
							// 购物车不为空
							tempreturn = false;
							this.sumprice += list.currentPrice * list.praiseNum;
							this.sumcount += list.praiseNum;
							this.allcommodity.push(list);
						}
					})
				})

				return tempreturn;
			}
		},

		methods: {
			// 选择规格
			Choosedosing(data) {
				this.choosedatalist = data;
				this.isshow = true;
			},

			// 子传父的方法
			Cancelmask() {
				this.isshow = false
			},

			// 点击左侧 菜单进行跳转
			skip(index) {
				var alldiv = this.$refs.BSrightmenu.getElementsByClassName('rightmenu_ul_div')
				this.Scrollright.scrollToElement(alldiv[index], 250);
			},

			// 返回的num 
			updatenum(data) {
				this.currentnum = data;
			},

			update(data) {
				data.praiseNum = this.currentnum;
			},

			detailfood(item) {
				this.selectdata = item;
				this.isshowitemfood = true
			}

		}
	}
</script>

<style scoped="scoped">
	.shippingorder {
		height: 676px;

	}

	.recommend_ul {
		width: 100%;
		height: auto;
		display: flex;
		overflow-x: auto;
		justify-content: space-between;
	}

	/* 去除ul 的滚动条 */
	.recommend_ul::-webkit-scrollbar {
		display: none
	}

	.recommend_ul li {
		list-style: none;
	}

	.recommend_ul li div {
		margin-bottom: 5px;
	}

	.Choose_specifications {
		border-radius: 20px;
		background-color: #ffbd27;
		/* background-image: linear-gradient(-135deg, #FFBD27 0%, #FFD161 100%); */
		line-height: 25px;
		font-size: 12px;
		padding: 0 10px;
		width: 36px;
		position: relative;
		top: -25px;
		left: 80px;
	}

	.Choose_specifications2 {
		border-radius: 20px;
		background-color: #ffbd27;
		/* background-image: linear-gradient(-135deg, #FFBD27 0%, #FFD161 100%); */
		line-height: 25px;
		font-size: 12px;
		padding: 0 10px;
		width: 36px;
		position: relative;
		float: right;
		margin-top: 20px;
		margin-right: 20px;
	}

	/* 商品分类 */
	.commodityclassify {
		width: 100%;
		height: 350px;
	}

	.leftmenu {
		width: 20%;
		height: 350px;
		float: left;
		overflow: hidden;
	}

	.leftmenu_ul li {
		width: 100%;
		height: 60px;
		line-height: 60px;
		background-color: #F1F1F1;
	}

	.rightmenu {
		float: left;
		height: 350px;
		overflow: hidden;
		width: 80%
	}

	.rightmenu::-webkit-scrollbar {
		display: none
	}


	.rightmenu li {
		list-style: none;
		height: 80px;
		margin-bottom: 15px;
	}

	/* 图片右侧的内容 */
	.rightmenucontent {
		height: 80px;
		/* overflow: hidden; */
	}

	/* 名字 */
	.rightmenucontent_name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 16px;
		color: #333333;
		font-weight: bold;
		font-family: "PingFangSC-Medium", "Hiragino Sans GB", Arial, Helvetica, "\5B8B\4F53", sans-serif;
		line-height: 22.5px;
		margin-bottom: 2px;
	}

	.rightmenucontent_introduce {
		margin-bottom: 3px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		line-height: 15px;
		font-size: 11px;
		color: #666666;
		word-break: break-all;
	}

	.rightmenucontent_sale {
		margin-bottom: 3px;
		height: 15px;
		line-height: 15px;
		position: relative;
		width: 100%;
		font-size: 11px;
		color: #666;
	}

	/* 当前售价 */
	.rightmenucontent_currentPrice {
		height: 21.5px;
		line-height: 21.5px;
		display: inline-block;
		color: #fb4e44;
		font-size: 18px;
		font-family: "PingFangSC-Medium", "Hiragino Sans GB", Arial, Helvetica, "\5B8B\4F53", sans-serif;
		vertical-align: middle;
	}

	/* 左侧焦点 */
	.foucs {
		font-weight: 600;
		text-align: center;
		font-size: 16px;
		background-color: white !important;
	}

	.nofoucs {
		font-size: 16px;
		text-align: center;
	}
</style>
