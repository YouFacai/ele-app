<template>
	<div class="evaluate">
		<bigimg v-if="isshowbigimg" :imglist='imglist' :currentimgindex='currentimgindex' @update='update' @noshowbigimg='isshowbigimg=false'></bigimg>
		<div class="evaluate_head">
			<div class="Merchants_score">
				<span style="font-size: 22px;color: #FFB000;">{{datalist.integratedScore}}</span>
				<p style="text-align: center;font-size: 12px;color: #999;">商家评分</p>
			</div>
			<div class="center">
				<div style="position: relative;top: 20px;">
					<div>口味</div>
					<div style="position: relative;top: -20px;left: 40px;">
						<Rating :rating='Number(datalist.packScore)'></Rating>
					</div>
					<div style="color: #FFB000;position: relative;top: -45px;left: 120px;">{{datalist.packScore}}</div>
				</div>
				<div style="position: relative;top: -15px;">
					<div>包装</div>
					<div style="position: relative;top: -20px;left: 40px;">
						<Rating :rating='Number(datalist.qualityScore)'></Rating>
					</div>
					<div style="color: #FFB000;position: relative;top: -45px;left: 120px;">{{datalist.packScore}}</div>
				</div>
			</div>
			<div style="width: 80px;height: 80px;text-align: center;font-size: 26px;color: #999;position: relative;top: -130px;float: right;border-left: 1px solid #e4e4e4;padding-left: 20px;">
				<div style="position: relative;top: 15px;">
					{{datalist.deliveryScore}}
					<div style="text-align: center;
								font-size: 12px;
								color: #999;">
						配送评分
					</div>
				</div>
			</div>
			<!-- 好评  差评选项栏 -->
			<div class="content">
				<ul class="content_ul">
					<li v-for="(data,index) in datalist.commentLabels" :key='index'>
						{{data.content}}
					</li>
				</ul>
			</div>
			<!-- 主要的列表渲染 -->
			<div class="contentlist" ref='datalist'>
				<ul class="contentlist_ul">
					<li v-for="(data,index) in datalist.list" :key='index'>
						<div class="contentlist_ul_content">
							<img :src="data.userPicUrl ||'http://s3plus.sankuai.com/v1/mss_00c90c47614241978d32cca9bc6e44a4/h5i/userpic_defalut.c741e924.png' " alt="" class="">
							<div class="contentlist_ul_content_msg">
								<div style="color: #2f2f2f;font-size: 16px;">{{data.userName}}</div>
								<div style="font-size: 12px;color: #898989;float: right;margin-top: -15px;">{{data.commentTime}}</div>
								<div style="color: #666;font-size: 12px;line-height: 12px;margin-top: 5px;">{{data.deliveryTime}}</div>
								<div style="font-size: 14px;line-height: 20px;color: #2f2f2f;padding-top: 14px;padding-bottom: 8px;">{{data.content}}</div>
								<div class="contentlist_ul_content_msg_img">
									<ul class="contentlist_ul_content_msg_img_ul" v-if="data.hasOwnProperty('pictures') && data.pictures.length!=0">
										<li v-for="(img,index) in data.pictures" :key='index'>
											<img :src="img.smallPicUrl" alt="" @click="bigimg(data.pictures,index)" style=" 
												width: 120px;
											">
										</li>
									</ul>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import bigimg from '@/components/bigimg'
	import Rating from '@/components/Rating'
	export default {
		components:{
			Rating,
			bigimg,
		},
		mounted() {
			this.$axios.post('/users/comment').then(resp=>{
				console.log(resp.data);
				this.datalist = resp.data;
			})
		},
		data(){
			return {
				datalist:[],
				isshowbigimg:false,
				imglist:[],
				currentimgindex:Number,
			}
		},
		
		methods:{
			bigimg(img,index){
				console.log(img)
				this.isshowbigimg=true
				this.imglist = img
				this.currentimgindex = index
			},
			
			// 修改传入图的当前索引
			update(data){
				console.log(data)
				this.currentimgindex = data;
			}
		}
	}
</script>

<style scoped="scoped">
	.evaluate_head {
		width: 100%;
		height: 100px;
	}
	
	/* 商家评分 */
	.Merchants_score {
		text-align: center;
		width: 80px;
		height: 100px;
		position: absolute;
		left: 0px;
		top: 43%;
	}
	
	.center {
		margin-left: 25%;
	}
	
	.content {
		width: 100%;
		height: auto;
		overflow: hidden;
		position: relative;
		top: -100px;
		background-color: white;
		padding: 10px 0px;
		border-bottom: 1px solid rgb(228, 228, 228);
	}
	
	.content_ul li{
		border-radius: 26px;
		border: 1px solid #bbb;
		padding: 5px 10px 5px 10px;
		float: left;
		font-size: 13px;
		list-style: none;
		margin-left: 25px;
		margin-bottom: 5px;
	}
	
	/* 买家评论渲染 */
	.contentlist {
		width: 100%;
		height: 500px;
		overflow: auto;
		margin-top: -100px;
		background-color: white;
	}
	
	
	.contentlist li {
		list-style: none;
		margin-bottom: 20px;
	}
	
	.contentlist_ul_content {
		overflow: hidden;
		padding-right: 40px;
	}
	/* 头像 */
	.contentlist_ul_content > img {
		float: left;
		 width: 50px;
		 height: 50px;
		 border-radius: 50%;
		 padding-left: 10px;
		 padding-top: 10px;
		 
	} 
	
	.contentlist_ul_content_msg {
		width: calc(100% - 80px);
		float: right;
		margin-top: 10px;
		
	}
	
	.contentlist_ul_content_msg_img_ul {
		width: 100%;
		overflow-x: auto ;
		overflow-y: hidden;
		height: 120px;
		display: flex;
		justify-content: space-between;
	}
	
	.contentlist_ul_content_msg_img_ul li {
		width: 120px;
		margin-left: 10px;
	}
	
	.contentlist_ul_content_msg_img_ul::-webkit-scrollbar{
		display:none
	}
</style>
