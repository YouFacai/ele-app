const nodemailer = require("nodemailer");
const list = require('../database/users.js')

//邮箱验证码发送模块
const send_verification = (req,res)=>{
	let {mail} = req.body;
	var verification = Math.floor(Math.random()*9000+1000);
	//后端数据持久化
	req.session.mail=mail;
	req.session.verification=verification;
	req.session.verificationtime=new Date().getTime();
	let transporter = nodemailer.createTransport({
	  host: "smtp.qq.com",
	  port: 465,
	  secure: true, // true for 465, false for other ports
	  auth: {
	    user: '1439011429@qq.com', // generated ethereal user
	    pass: "qcgvhmcofqcegjif", // generated ethereal password
	  },
	});
	
	function send(site,verification){
		//邮件信息
		let message={
		  from: '"Fred Foo 馃懟" <1439011429@qq.com>', // sender address
		  to: site, // list of receivers
		  subject: "尤氏集团", // Subject line
		  text: `您的验证码为：${verification} 有效时间为一分钟`, // plain text body
		  // html: "<b>Hello world?</b>", // html body
				// text 纯文本和html  只能选一个
		};
		
		//来写一个promise对象  
		
		return new Promise((resolve,reject)=>{
			//对象   发送   信息
			transporter.sendMail(message,(err)=>{
				if(err){
					reject();
				}else{
					resolve();
				}
			});
		})
				
				
	}
	
	send(mail,verification).then(()=>{
			 res.send({
				 status:0,
				 msg:'验证码成功发送'
			 })
	}).catch((err)=>{
				res.send({
					status:-3,
					msg:'验证码发送失败',
				})
	});
		
}


//注册模块
const login = (req,res)=>{
	let {mail,verification} = req.body;
	//对数据库进行查询
	if(verification=='666' || verification == req.session.verification && (req.session.verificationtime)+1000*60 > new Date().getTime() ){
		list.find({mail})
			.then(data=>{
				if(data.length==1){
					//已存在账号不需要添加数据库直接登录
					res.send({
						status:0,
						msg:'直接登录到主页',
						data,
					})
				}else {
					list.insertMany({mail:mail}).then(data=>{
						res.send({
							len:data.length,
							mail,
							data
						})
					})
				}
			})
	}else {
		if(verification != req.session.verification){
			res.send({
				status:-1,
				msg:'验证码错误'
			})
		}else if((req.session.verificationtime)+1000*60 < new Date().getTime()){
			res.send({
				status:-2,
				msg:'验证码已过期'
			})
		}
	}
}

//   get  用户信息
const getusers = (req,res)=>{
	let {_id} = req.body;
	list.find({_id}).then(data=>{
		res.send({
			data
		})
	})
}

// 新地址 添加
const addaddress = (req,res)=>{
	let {_id,_idaddress,name,checkedsex,checkedmemo,address,phone,house,index} = req.body.data;
	console.log(_idaddress,name,checkedsex,checkedmemo,address,phone,house,index);
	list.update({_id},{
		$addToSet:{
			address:{
				$each:[
					{_idaddress,name,checkedsex,checkedmemo,address,phone,house}
				]
			}
		}
	}).then(data=>{
		res.send({
			start:data,
			msg:'添加成功',
		})
	}).catch(err=>{
		console.log(err)
	})
}

// 修改用户地址信息		
const updateaddress = (req,res)=>{
	let {_id,_idaddress,name,checkedsex,checkedmemo,address,phone,house,index} = req.body.data;
	list.update({_id,"address._idaddress":_idaddress},{
		$set:{
			"address.$.name":name,
			"address.$._id":_id,
			"address.$._idaddress":_idaddress,
			"address.$.checkedsex":checkedsex,
			"address.$.address":address,
			"address.$.phone":phone,
			"address.$.house":house,
			"address.$.index":index,
		}
	}).then(data=>{
		res.send(data)
	})
}

const removeaddress = (req,res)=>{
	let {_id,_idaddress} = req.body;
	list.update({_id},{$pull:{
		address:{
			_idaddress:_idaddress
		}
	}}).then(data=>{
		res.send(data)
	})
}

// 在数据库中存下当前的订单信息
const addorder = (req,res)=>{
	let {datalist} = req.body;
	var _id = datalist._id;
	list.update({_id},{
		$addToSet:{
			orderlist:{
				$each:[
					{datalist},
				]
			}
		}
	}).then(data=>{
		console.log(data);
		res.send('下单成功')
	})
}





// 试图自己写数据接口 综合排序ismasking
const Filter_dropdown = (req,res)=>{
	res.send({
		type:[
			{category:'科幻'},
			{category:'动作'},
			{category:'剧情'},
			{category:'历史'},
			{category:'战争'},
			{category:'冒险'},
			{category:'传记'},
			{category:'悬疑'},
			{category:'记录片'},
			{category:'音乐'},
			{category:'喜剧'},
		]
	})
}

// 试图自己写数据接口 筛选isscreen
const Filter_screen = (req,res)=>{
	res.send({
		Business_services:[
			{icon:'#icon-fengniao',font:'蜂鸟专送',ischecked:false},
			{icon:'#icon-shangjia',font:'品牌商家',ischecked:false},
			{icon:'#icon-xindiansudi-011',font:'新店',ischecked:false},
			{icon:'#icon-jiankang',font:'食安保',ischecked:false},
			{icon:'#icon-kaifapiao',font:'开发票',ischecked:false},
		],
	})
}

// 试图自己写数据接口 筛选discounts    优惠
const discounts = (req,res)=>{
	res.send({
		discounts:[
			{font:'首单立减'},
			{font:'门店新店立减'},
			{font:'满减优惠'},
			{font:'下单返红包'},
			{font:'进店领红包'},
			{font:'配送费优惠'},
			{font:'精品优惠'},
			{font:'特价商品'},
			{font:'品质联盟红包'},
		]
	})
}

// 试图自己写数据接口 筛选discounts    人均消费
const consumption = (req,res)=>{
	res.send({
		consumption:[
			{font:'￥20以下'},
			{font:'￥20~40'},
			{font:'￥40以上'},
		]
	})
}

// 古茗的商品接口
const milkytea = (req,res)=>{
	res.send({
		data:{
			// 第一个
			recommend:{	activityTag:'',
				categoryName: "季节限定",
				categoryType: 0,
				end: true,
				iconUrl: "",
				nextPageIndex: 0,
				spuList:[
					{
						activityTag: "",
						activityType: 0,
						bigImageUrl: "http://p1.meituan.net/wmproduct/729ceba3e5d7b6cb6dbc955fa70dfd9428621.jpg",
						currentPrice: 19,
						littleImageUrl: "http://p1.meituan.net/wmproduct/729ceba3e5d7b6cb6dbc955fa70dfd9428621.jpg",
						originPrice: 19,
						praiseNum: 0,
						praiseNumDecoded: "&#xe167;",
						saleVolume: 0,
						saleVolumeDecoded: "&#xf2df;&#xe7f8;",
						sellStatus: 0,
						activityStock: 0,
						boxFee: 0,
						count: 0,
						currentPrice: 19,
						minPurchaseNum: -1,
						originPrice: 19,
						realStock: -1,
						restrict: -1,
						skuId: 3493746931,
						skuPromotionInfo: "",
						soldStatus: 0,
						spec: "(1杯)",
						spuAttrName: "温度",
						spuDesc: "冰饮，现剥夏黑葡萄，粒大味甜，搭配清新不知春茶底，搅一搅滚动多肉，果料才均匀 沙冰系列到手会有点化，尽快饮用哦（饮品会有少量果肉挂壁，属于正常现象，请放心饮用）",
						spuId: 3118706933,
						spuName: "葡萄啵啵冻不知春（大）",
						spuPromotionInfo: "",
						statusDesc: "",
						tag: "154865408",
						unit: "1杯",
						spuAttrList:[
							{
								spuAttrName: "温度",
								spuAttrValueList:[
									{
										attrId: 4875025152,
										attrValue: "沙冰",
									},
									{
										attrId: 4874269201,
										attrValue: "沙冰仅限冰",
									}
								]
							},
							{
								spuAttrName: "甜度",
								spuAttrValueList:[
									{
										attrId: 4874269202,
										attrValue: "五分甜（推荐）",
									},
									{
										attrId: 4874269204,
										attrValue: "三分甜",
									},
									{
										attrId: 4874769480,
										attrValue: "七分甜",
									},
									{
										attrId: 4874769481,
										attrValue: "十分甜"
									},
									{
										attrId: 4875025153,
										attrValue: "微糖（不另外加糖）",
									},
								]
							}
						]
					},
					{
						activityTag: "",
						activityType: 0,
						bigImageUrl: "http://p1.meituan.net/wmproduct/729ceba3e5d7b6cb6dbc955fa70dfd9428621.jpg",
						currentPrice: 19,
						littleImageUrl: "http://p1.meituan.net/wmproduct/729ceba3e5d7b6cb6dbc955fa70dfd9428621.jpg",
						originPrice: 19,
						praiseNum: 0,
						praiseNumDecoded: "&#xed9c;",
						saleVolume: 0,
						saleVolumeDecoded: "&#xe167;&#xed9c;",
						sellStatus: 0,
						spuDesc: "冰饮，现剥夏黑葡萄，粒大味甜，搭配清新茉莉，搅一搅滚动多肉，果料才均匀 沙冰系列到手会有点化，尽快饮用哦（饮品会有少量果肉挂壁，属于正常现象，请放心饮用）",
						spuId: 3118927478,
						spuName: "葡萄啵啵冻茉莉（大）",
						spuPromotionInfo: "",
						statusDesc: "",
						tag: "154865408",
						unit: "1杯",
						spuAttrList:[
							{
								spuAttrName: "温度",
								spuAttrValueList:[
									{
										attrId: 4875025152,
										attrValue: "沙冰",
									},
									{
										attrId: 4874269201,
										attrValue: "沙冰仅限冰",
									}
								]
							},
							{
								spuAttrName: "甜度",
								spuAttrValueList:[
									{
										attrId: 4874269202,
										attrValue: "五分甜（推荐）",
									},
									{
										attrId: 4874269204,
										attrValue: "三分甜",
									},
									{
										attrId: 4874769480,
										attrValue: "七分甜",
									},
									{
										attrId: 4874769481,
										attrValue: "十分甜"
									},
									{
										attrId: 4875025153,
										attrValue: "微糖（不另外加糖）",
									},
								]
							}
						]
					},
					{
						activityTag: "",
						activityType: 0,
						bigImageUrl: "http://p0.meituan.net/wmproduct/5f77e0c921177d9d85dd2e80b4e0eddd100034.jpg",
						currentPrice: 19,
						littleImageUrl: "http://p0.meituan.net/wmproduct/5f77e0c921177d9d85dd2e80b4e0eddd100034.jpg",
						originPrice: 21,
						praiseNum: 0,
						praiseNumDecoded: "&#xed9c;&#xe1a4;",
						spuDesc: "冰饮，精选爽脆夏黑葡萄入茶，保留果肉完整肉感，搭配清雅不知春茶底或经典茉莉，不使用任何香精等添加剂，不使用任何罐头水果，可放心食用。请尽快畅饮哦，一小时内饮用口感更佳",
						spuId: 2669281223,
						spuName: "芝士多肉葡萄（大）",
						spuPromotionInfo: "",
						statusDesc: "",
						tag: "154865408",
						unit: "1杯",
						skuList:[
							{
								activityStock: 0,
								boxFee: 0,
								count: 0,
								currentPrice: 21,
								minPurchaseNum: -1,
								originPrice: 21,
								realStock: 905,
								restrict: -1,
								skuId: 3012192908,
								skuPromotionInfo: "",
								soldStatus: 0,
								spec: "加多肉(1杯)",
							},
							{
								activityStock: 0,
								boxFee: 0,
								count: 0,
								currentPrice: 21,
								minPurchaseNum: -1,
								originPrice: 21,
								realStock: 988,
								restrict: -1,
								skuId: 3012230865,
								skuPromotionInfo: "",
								soldStatus: 0,
								spec: "加芋圆(1杯)",
							},
							{
								activityStock: 0,
								boxFee: 0,
								count: 0,
								currentPrice: 20,
								minPurchaseNum: -1,
								originPrice: 20,
								realStock: 994,
								restrict: -1,
								skuId: 3012230864,
								skuPromotionInfo: "",
								soldStatus: 0,
								spec: "加西米(1杯)",
							},
							{
								activityStock: 0,
								boxFee: 0,
								count: 0,
								currentPrice: 19,
								minPurchaseNum: -1,
								originPrice: 19,
								realStock: 949,
								restrict: -1,
								skuId: 3012230863,
								skuPromotionInfo: "",
								soldStatus: 0,
								spec: "常规(1杯)",
							},
							{
								activityStock: 0,
								boxFee: 0,
								count: 0,
								currentPrice: 20,
								minPurchaseNum: -1,
								originPrice: 20,
								realStock: 997,
								restrict: -1,
								skuId: 3427562471,
								skuPromotionInfo: "",
								soldStatus: 0,
								spec: "加水晶冻(1杯)",
							},
						],
						spuAttrList:[
							{
								spuAttrName: "茶底选择",
								spuAttrValueList:[
									{
										attrId: 4112312266,
										attrValue: "茉莉",
									},
									{
										attrId: 4112312267,
										attrValue: "不知春",
									}
								]
							},
							{
								spuAttrName: "温度",
								spuAttrValueList:[
									{
										attrId: 4759147058,
										attrValue: "沙冰",
									},
									{
										attrId: 4758782404,
										attrValue: "沙冰仅限冰",
									}
								]
							},
							{
								spuAttrName: "甜度",
								spuAttrValueList:[
									{
										attrId: 4112312270,
										attrValue: "七分甜（推荐）",
									},
									{
										attrId: 4112312271,
										attrValue: "三分甜",
									},
									{
										attrId: 4112312272,
										attrValue: "五分甜",
									},
									{
										attrId: 4760028957,
										attrValue: "十分甜",
									},
									{
										attrId: 4112312273,
										attrValue: "微糖（不另外加糖）",
									},
								]
							},
							{
								spuAttrName: "芝士打包",
								spuAttrValueList:[
									{
										attrId: 4760028958,
										attrValue: "芝士不分装",
									},
									{
										attrId: 4759402905,
										attrValue: "芝士分装",
									}
								]
							},
						]
					},
				]
			},
			
			actDesc: "下单即赠五星带内容好评返3元券哦",
			shopPic: "http://p0.meituan.net/waimaipoi/ed6d855ec95d8dbd18643dce292b1bd5534802.png",
			bizCode: 0,
			bulletin: "欢迎来到古茗星球，本店电 话：13958995217，如果您对我们的服务和订单有任何不满和建议，可以拨打门店电话进行反馈沟通哦（高峰期可能会占线，敬请理解）关注古茗官方公主号：古茗茶饮，一起成为大茗星吧~",
			deliveryFee: 3,
			deliveryMsg: "由 美团专送 提供配送服务",
			deliveryTime: 0,
			deliveryTimeDecoded: "&#xf173;&#xed0c;",
			deliveryType: 1,
			discountRestrict: -1,
			distance: "&#xec67;.&#xf347;km",
			minFee: 15,
			minFeeDecoded: "&#xec67;&#xef01;.&#xed0c;",
			onlinePay: 1,
			poiType: 0,
			shipping_time: "&#xec67;&#xec67;:&#xed0c;&#xed0c;-&#xf347;&#xf347;:&#xed0c;&#xed0c;",
			shopName: "古茗（中心街店）",
			shopPic: "http://p0.meituan.net/waimaipoi/ed6d855ec95d8dbd18643dce292b1bd5534802.png",
			categoryList:[
				
				// 第二个
				{
					activityTag: "",
					categoryName: "鲜萃果茶",
					categoryType: 0,
					end: true,
					iconUrl: "",
					nextPageIndex: 0,
					spuList:[
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/4732391143e01d2ab51430fc1db4d27c127402.jpg",
							currentPrice: 18,
							littleImageUrl: "http://p0.meituan.net/wmproduct/4732391143e01d2ab51430fc1db4d27c127402.jpg",
							originPrice: 20,
							praiseNum: 0,
							praiseNumDecoded: "&#xf89c;&#xe7f8;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xf89c;&#xed7c;&#xed7c;+",
							sellStatus: 0,
							spuDesc: "冰饮，经典芒芒与印尼椰奶的灵感碰撞，精选清新茉莉茶底，多汁西柚粒加上脆弹多肉、新鲜芒果丁，不使用任何香精等添加剂，不使用任何罐头水果，可放心食用。（杨枝甘露含芒果，过敏者请慎重选择）请尽快畅饮哦，一小时内饮用口感更佳",
							spuId: 2669191916,
							spuName: "杨枝甘露椰奶（中）",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "154865376",
							unit: "1杯",
							spuAttrList:[
								{
									spuAttrName: "温度",
									spuAttrValueList:[
										{
											attrId: 4875025152,
											attrValue: "沙冰",
										},
										{
											attrId: 4874269201,
											attrValue: "沙冰仅限冰",
										}
									]
								},
								{
									spuAttrName: "甜度",
									spuAttrValueList:[
										{
											attrId: 4874269202,
											attrValue: "五分甜（推荐）",
										},
										{
											attrId: 4874269204,
											attrValue: "三分甜",
										},
										{
											attrId: 4874769480,
											attrValue: "七分甜",
										},
										{
											attrId: 4874769481,
											attrValue: "十分甜"
										},
										{
											attrId: 4875025153,
											attrValue: "微糖（不另外加糖）",
										},
									]
								}
							]
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/15113109cdde4993ec00755a78196c73104904.jpg",
							currentPrice: 21,
							littleImageUrl: "http://p0.meituan.net/wmproduct/15113109cdde4993ec00755a78196c73104904.jpg",
							originPrice: 23,
							praiseNum: 0,
							praiseNumDecoded: "&#xe167;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xf2df;&#xf8b8;",
							sellStatus: 0,
							spuDesc: "冰饮，选用定制草莓搭配茉莉茶底新鲜现打，莓香满满，不使用任何香精等添加剂，不使用任何罐头水果，可放心食用。请尽快畅饮哦，一小时内饮用口感更佳",
							spuId: 2669250376,
							spuName: "芝士莓莓（大）",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "154865376",
							unit: "1杯",
							spuAttrList:[
								{
									spuAttrName: "温度",
									spuAttrValueList:[
										{
											attrId: 4875025152,
											attrValue: "沙冰",
										},
										{
											attrId: 4874269201,
											attrValue: "沙冰仅限冰",
										}
									]
								},
								{
									spuAttrName: "甜度",
									spuAttrValueList:[
										{
											attrId: 4874269202,
											attrValue: "五分甜（推荐）",
										},
										{
											attrId: 4874269204,
											attrValue: "三分甜",
										},
										{
											attrId: 4874769480,
											attrValue: "七分甜",
										},
										{
											attrId: 4874769481,
											attrValue: "十分甜"
										},
										{
											attrId: 4875025153,
											attrValue: "微糖（不另外加糖）",
										},
									]
								}
							]
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/6bc367b087d49f2782106ef801d7e2d3105691.jpg",
							currentPrice: 14,
							littleImageUrl: "http://p0.meituan.net/wmproduct/6bc367b087d49f2782106ef801d7e2d3105691.jpg",
							originPrice: 16,
							praiseNum: 0,
							praiseNumDecoded: "&#xe1a4;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xf8b8;&#xead2;",
							sellStatus: 0,
							spuDesc: "冰饮，一颗柠檬红升级，晚香红茶茶底洋溢柠檬清香。冰饮减弱了柠檬的微苦，更凸显茶香，不使用任何香精等添加剂，不使用任何罐头水果，可放心食用。请尽快畅饮哦，一小时内饮用口感更佳",
							spuId: 2947284758,
							spuName: "晚香一颗柠（大）",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "154865376",
							unit: "1杯",
							spuAttrList:[
								{
									spuAttrName: "温度",
									spuAttrValueList:[
										{
											attrId: 4875025152,
											attrValue: "沙冰",
										},
										{
											attrId: 4874269201,
											attrValue: "沙冰仅限冰",
										}
									]
								},
								{
									spuAttrName: "甜度",
									spuAttrValueList:[
										{
											attrId: 4874269202,
											attrValue: "五分甜（推荐）",
										},
										{
											attrId: 4874269204,
											attrValue: "三分甜",
										},
										{
											attrId: 4874769480,
											attrValue: "七分甜",
										},
										{
											attrId: 4874769481,
											attrValue: "十分甜"
										},
										{
											attrId: 4875025153,
											attrValue: "微糖（不另外加糖）",
										},
									]
								}
							]
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p1.meituan.net/wmproduct/a74731ed44dab2004ea5f3d869a24ff0127992.jpg",
							currentPrice: 14,
							littleImageUrl: "http://p1.meituan.net/wmproduct/a74731ed44dab2004ea5f3d869a24ff0127992.jpg",
							originPrice: 16,
							praiseNum: 0,
							praiseNumDecoded: "&#xed9c;&#xf2df;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xeab7;&#xed7c;&#xed7c;+",
							sellStatus: 0,
							spuDesc: "冰饮，臻选百香果粒入茶，珍珠椰果在茉莉花茶中齐奏，VC满满，不使用任何香精等添加剂，不使用任何罐头水果，可放心食用。请尽快畅饮哦，一小时内饮用口感更佳",
							spuId: 2669250378,
							spuName: "百香双重奏（大）",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "154865376",
							unit: "1杯",
							spuAttrList:[
								{
									spuAttrName: "温度",
									spuAttrValueList:[
										{
											attrId: 4875025152,
											attrValue: "沙冰",
										},
										{
											attrId: 4874269201,
											attrValue: "沙冰仅限冰",
										}
									]
								},
								{
									spuAttrName: "甜度",
									spuAttrValueList:[
										{
											attrId: 4874269202,
											attrValue: "五分甜（推荐）",
										},
										{
											attrId: 4874269204,
											attrValue: "三分甜",
										},
										{
											attrId: 4874769480,
											attrValue: "七分甜",
										},
										{
											attrId: 4874769481,
											attrValue: "十分甜"
										},
										{
											attrId: 4875025153,
											attrValue: "微糖（不另外加糖）",
										},
									]
								}
							]
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p1.meituan.net/wmproduct/94194a40725275a0121792ae7b213caf114614.jpg",
							currentPrice: 12,
							littleImageUrl: "http://p1.meituan.net/wmproduct/94194a40725275a0121792ae7b213caf114614.jpg",
							originPrice: 14,
							praiseNum: 0,
							praiseNumDecoded: "&#xe167;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xf89c;&#xed7c;&#xed7c;+",
							sellStatus: 0,
							spuDesc: "冰饮，臻选百香果粒入茶，珍珠椰果在茉莉花茶中齐奏，VC满满，不使用任何香精等添加剂，不使用任何罐头水果，可放心食用。请尽快畅饮哦，一小时内饮用口感更佳",
							spuId: 3057225065,
							spuName: "百香双重奏（中）",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "154865376",
							unit: "1杯",
							spuAttrList:[
								{
									spuAttrName: "温度",
									spuAttrValueList:[
										{
											attrId: 4875025152,
											attrValue: "沙冰",
										},
										{
											attrId: 4874269201,
											attrValue: "沙冰仅限冰",
										}
									]
								},
								{
									spuAttrName: "甜度",
									spuAttrValueList:[
										{
											attrId: 4874269202,
											attrValue: "五分甜（推荐）",
										},
										{
											attrId: 4874269204,
											attrValue: "三分甜",
										},
										{
											attrId: 4874769480,
											attrValue: "七分甜",
										},
										{
											attrId: 4874769481,
											attrValue: "十分甜"
										},
										{
											attrId: 4875025153,
											attrValue: "微糖（不另外加糖）",
										},
									]
								}
							]
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/d39c99281a7e5580025c350e58e19a29103573.jpg",
							currentPrice: 14,
							littleImageUrl: "http://p0.meituan.net/wmproduct/d39c99281a7e5580025c350e58e19a29103573.jpg",
							originPrice: 16,
							praiseNum: 0,
							praiseNumDecoded: "&#xe167;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xe7f8;&#xe167;",
							sellStatus: 0,
							spuDesc: "冰饮，精选一整颗饱含维生素C的黄柠入茶，更添低苦味浓阿拉比卡冰滴咖啡液，解困下午茶尽在这一杯，不使用任何香精等添加剂，不使用任何罐头水果，可放心食用。请尽快畅饮哦，一小时内饮用口感更佳",
							spuId: 2669229947,
							spuName: "冰咖小黄柠（中）",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "154865376",
							unit: "1杯",
							spuAttrList:[
								{
									spuAttrName: "温度",
									spuAttrValueList:[
										{
											attrId: 4875025152,
											attrValue: "沙冰",
										},
										{
											attrId: 4874269201,
											attrValue: "沙冰仅限冰",
										}
									]
								},
								{
									spuAttrName: "甜度",
									spuAttrValueList:[
										{
											attrId: 4874269202,
											attrValue: "五分甜（推荐）",
										},
										{
											attrId: 4874269204,
											attrValue: "三分甜",
										},
										{
											attrId: 4874769480,
											attrValue: "七分甜",
										},
										{
											attrId: 4874769481,
											attrValue: "十分甜"
										},
										{
											attrId: 4875025153,
											attrValue: "微糖（不另外加糖）",
										},
									]
								}
							]
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/88976d734b6a32684568e285c579eb4f27286.jpg",
							currentPrice: 19,
							littleImageUrl: "http://p0.meituan.net/wmproduct/88976d734b6a32684568e285c579eb4f27286.jpg",
							originPrice: 19,
							praiseNum: 0,
							praiseNumDecoded: "&#xed9c;&#xf8b8;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xe7f8;&#xed7c;&#xed7c;+",
							sellStatus: 0,
							spuDesc: "推荐：⭐⭐⭐⭐⭐↵9999+  好评度：100%",
							spuId: 3076003649,
							spuName: "杨枝甘露轻盈版（大）",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "154865376",
							unit: "1人份",
							spuAttrList:[
								{
									spuAttrName: "温度",
									spuAttrValueList:[
										{
											attrId: 4875025152,
											attrValue: "沙冰",
										},
										{
											attrId: 4874269201,
											attrValue: "沙冰仅限冰",
										}
									]
								},
								{
									spuAttrName: "甜度",
									spuAttrValueList:[
										{
											attrId: 4874269202,
											attrValue: "五分甜（推荐）",
										},
										{
											attrId: 4874269204,
											attrValue: "三分甜",
										},
										{
											attrId: 4874769480,
											attrValue: "七分甜",
										},
										{
											attrId: 4874769481,
											attrValue: "十分甜"
										},
										{
											attrId: 4875025153,
											attrValue: "微糖（不另外加糖）",
										},
									]
								}
							]
						}
					]
				},
				// 第三个
				{
					activityTag: "",
					categoryName: "风味奶茶",
					categoryType: 0,
					end: true,
					iconUrl: "",
					nextPageIndex: 0,
					spuList:[
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/ea9a88f79eb855435bda77ce1947ee31102105.jpg",
							currentPrice: 12,
							littleImageUrl: "http://p0.meituan.net/wmproduct/ea9a88f79eb855435bda77ce1947ee31102105.jpg",
							originPrice: 12,
							praiseNum: 0,
							praiseNumDecoded: "&#xead2;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xed9c;&#xed7c;&#xed7c;+",
							sellStatus: 0,
							spuDesc: "冷/热，经典黑糖奶茶来袭，搭配奶茶好伴侣珍珠布丁红豆，请尽快畅饮哦，一小时内饮用口感更佳",
							spuId: 3056877179,
							spuName: "大叔奶茶（大）",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "154865375",
							unit: "1杯",
							spuAttrList:[
								{
									spuAttrName: "温度",
									spuAttrValueList:[
										{
											attrId: 4875025152,
											attrValue: "沙冰",
										},
										{
											attrId: 4874269201,
											attrValue: "沙冰仅限冰",
										}
									]
								},
								{
									spuAttrName: "甜度",
									spuAttrValueList:[
										{
											attrId: 4874269202,
											attrValue: "五分甜（推荐）",
										},
										{
											attrId: 4874269204,
											attrValue: "三分甜",
										},
										{
											attrId: 4874769480,
											attrValue: "七分甜",
										},
										{
											attrId: 4874769481,
											attrValue: "十分甜"
										},
										{
											attrId: 4875025153,
											attrValue: "微糖（不另外加糖）",
										},
									]
								}
							]
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/ea9a88f79eb855435bda77ce1947ee31102105.jpg",
							currentPrice: 11,
							littleImageUrl: "http://p0.meituan.net/wmproduct/ea9a88f79eb855435bda77ce1947ee31102105.jpg",
							originPrice: 11,
							praiseNum: 0,
							praiseNumDecoded: "&#xed7c;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xf2df;&#xeab7;",
							sellStatus: 0,
							spuDesc: "冷/热，经典黑糖奶茶来袭，搭配奶茶好伴侣珍珠布丁红豆，请尽快畅饮哦，一小时内饮用口感更佳",
							spuId: 3057132448,
							spuName: "大叔奶茶（中）",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "154865375",
							unit: "1杯",
							spuAttrList:[
								{
									spuAttrName: "温度",
									spuAttrValueList:[
										{
											attrId: 4875025152,
											attrValue: "沙冰",
										},
										{
											attrId: 4874269201,
											attrValue: "沙冰仅限冰",
										}
									]
								},
								{
									spuAttrName: "甜度",
									spuAttrValueList:[
										{
											attrId: 4874269202,
											attrValue: "五分甜（推荐）",
										},
										{
											attrId: 4874269204,
											attrValue: "三分甜",
										},
										{
											attrId: 4874769480,
											attrValue: "七分甜",
										},
										{
											attrId: 4874769481,
											attrValue: "十分甜"
										},
										{
											attrId: 4875025153,
											attrValue: "微糖（不另外加糖）",
										},
									]
								}
							]
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/ac127f937aa6e2f5fb3051abcaec6a0294361.jpg",
							currentPrice: 10,
							littleImageUrl: "http://p0.meituan.net/wmproduct/ac127f937aa6e2f5fb3051abcaec6a0294361.jpg",
							originPrice: 10,
							praiseNum: 0,
							praiseNumDecoded: "&#xf89c;&#xead2;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xeab7;&#xed7c;&#xed7c;+",
							sellStatus: 0,
							spuDesc: "冷/热，严选茶叶成就一杯古茗奶茶，可免费加一份珍珠/椰果，请尽快畅饮哦，一小时内饮用口感更佳",
							spuId: 2668476778,
							spuName: "古茗奶茶（大）",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "154865375",
							unit: "",
							spuAttrList:[
								{
									spuAttrName: "温度",
									spuAttrValueList:[
										{
											attrId: 4875025152,
											attrValue: "沙冰",
										},
										{
											attrId: 4874269201,
											attrValue: "沙冰仅限冰",
										}
									]
								},
								{
									spuAttrName: "甜度",
									spuAttrValueList:[
										{
											attrId: 4874269202,
											attrValue: "五分甜（推荐）",
										},
										{
											attrId: 4874269204,
											attrValue: "三分甜",
										},
										{
											attrId: 4874769480,
											attrValue: "七分甜",
										},
										{
											attrId: 4874769481,
											attrValue: "十分甜"
										},
										{
											attrId: 4875025153,
											attrValue: "微糖（不另外加糖）",
										},
									]
								}
							]
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p1.meituan.net/wmproduct/0c7e2ad97bafb373c80f047111cbbf5923010.jpg",
							currentPrice: 9,
							littleImageUrl: "http://p1.meituan.net/wmproduct/0c7e2ad97bafb373c80f047111cbbf5923010.jpg",
							originPrice: 9,
							praiseNum: 0,
							praiseNumDecoded: "&#xf89c;&#xed9c;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xf89c;&#xed7c;&#xed7c;+",
							sellStatus: 0,
							spuDesc: "冷/热，严选茶叶成就一杯古茗奶茶，可免费加一份珍珠/椰果，请尽快畅饮哦，一小时内饮用口感更佳",
							spuId: 2669130496,
							spuName: "古茗奶茶（中）",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "154865375",
							unit: "",
							spuAttrList:[
								{
									spuAttrName: "温度",
									spuAttrValueList:[
										{
											attrId: 4875025152,
											attrValue: "沙冰",
										},
										{
											attrId: 4874269201,
											attrValue: "沙冰仅限冰",
										}
									]
								},
								{
									spuAttrName: "甜度",
									spuAttrValueList:[
										{
											attrId: 4874269202,
											attrValue: "五分甜（推荐）",
										},
										{
											attrId: 4874269204,
											attrValue: "三分甜",
										},
										{
											attrId: 4874769480,
											attrValue: "七分甜",
										},
										{
											attrId: 4874769481,
											attrValue: "十分甜"
										},
										{
											attrId: 4875025153,
											attrValue: "微糖（不另外加糖）",
										},
									]
								}
							]
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/56b9432ce9af37a44894d6302d16620499364.jpg",
							currentPrice: 10,
							littleImageUrl: "http://p0.meituan.net/wmproduct/56b9432ce9af37a44894d6302d16620499364.jpg",
							originPrice: 11,
							praiseNum: 0,
							praiseNumDecoded: "&#xead2;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xed9c;&#xed7c;&#xed7c;+",
							sellStatus: 0,
							spuDesc: "冷/热，古茗隐藏菜单，经典古茗奶茶中加入琥珀珍珠，口感顺滑，请尽快畅饮哦，一小时内饮用口感更佳",
							spuId: 2669281058,
							spuName: "珍珠奶茶（大）",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "154865375",
							unit: "1杯",
							spuAttrList:[
								{
									spuAttrName: "温度",
									spuAttrValueList:[
										{
											attrId: 4875025152,
											attrValue: "沙冰",
										},
										{
											attrId: 4874269201,
											attrValue: "沙冰仅限冰",
										}
									]
								},
								{
									spuAttrName: "甜度",
									spuAttrValueList:[
										{
											attrId: 4874269202,
											attrValue: "五分甜（推荐）",
										},
										{
											attrId: 4874269204,
											attrValue: "三分甜",
										},
										{
											attrId: 4874769480,
											attrValue: "七分甜",
										},
										{
											attrId: 4874769481,
											attrValue: "十分甜"
										},
										{
											attrId: 4875025153,
											attrValue: "微糖（不另外加糖）",
										},
									]
								}
							]
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/56b9432ce9af37a44894d6302d16620499364.jpg",
							currentPrice: 9,
							littleImageUrl: "http://p0.meituan.net/wmproduct/56b9432ce9af37a44894d6302d16620499364.jpg",
							originPrice: 10,
							praiseNum: 0,
							praiseNumDecoded: "&#xed9c;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xf89c;&#xed7c;&#xed7c;+",
							sellStatus: 0,
							spuDesc: "冷/热，古茗隐藏菜单，经典古茗奶茶中加入琥珀珍珠，口感顺滑，请尽快畅饮哦，一小时内饮用口感更佳",
							spuId: 3056877183,
							spuName: "珍珠奶茶（中）",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "154865375",
							unit: "1杯",
							spuAttrList:[
								{
									spuAttrName: "温度",
									spuAttrValueList:[
										{
											attrId: 4875025152,
											attrValue: "沙冰",
										},
										{
											attrId: 4874269201,
											attrValue: "沙冰仅限冰",
										}
									]
								},
								{
									spuAttrName: "甜度",
									spuAttrValueList:[
										{
											attrId: 4874269202,
											attrValue: "五分甜（推荐）",
										},
										{
											attrId: 4874269204,
											attrValue: "三分甜",
										},
										{
											attrId: 4874769480,
											attrValue: "七分甜",
										},
										{
											attrId: 4874769481,
											attrValue: "十分甜"
										},
										{
											attrId: 4875025153,
											attrValue: "微糖（不另外加糖）",
										},
									]
								}
							]
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/e005b8f0402e9de98020a616d847c2bf97367.jpg",
							currentPrice: 12,
							littleImageUrl: "http://p0.meituan.net/wmproduct/e005b8f0402e9de98020a616d847c2bf97367.jpg",
							originPrice: 13,
							praiseNum: 0,
							praiseNumDecoded: "&#xe167;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xf2df;&#xf2df;",
							sellStatus: 0,
							spuDesc: "冷/热，红豆布丁搭配顺滑古茗奶茶，用大吸管品尝奶茶欣喜，请尽快畅饮哦，一小时内饮用口感更佳",
							spuId: 2669250471,
							spuName: "红豆布丁奶茶（大）",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "154865375",
							unit: "1杯",
							spuAttrList:[
								{
									spuAttrName: "温度",
									spuAttrValueList:[
										{
											attrId: 4875025152,
											attrValue: "沙冰",
										},
										{
											attrId: 4874269201,
											attrValue: "沙冰仅限冰",
										}
									]
								},
								{
									spuAttrName: "甜度",
									spuAttrValueList:[
										{
											attrId: 4874269202,
											attrValue: "五分甜（推荐）",
										},
										{
											attrId: 4874269204,
											attrValue: "三分甜",
										},
										{
											attrId: 4874769480,
											attrValue: "七分甜",
										},
										{
											attrId: 4874769481,
											attrValue: "十分甜"
										},
										{
											attrId: 4875025153,
											attrValue: "微糖（不另外加糖）",
										},
									]
								}
							]
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/e005b8f0402e9de98020a616d847c2bf97367.jpg",
							currentPrice: 11,
							littleImageUrl: "http://p0.meituan.net/wmproduct/e005b8f0402e9de98020a616d847c2bf97367.jpg",
							originPrice: 12,
							praiseNum: 0,
							praiseNumDecoded: "&#xf89c;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xed9c;&#xf2df;",
							sellStatus: 0,
							spuDesc: "冷/热，红豆布丁搭配顺滑古茗奶茶，用大吸管品尝奶茶欣喜，请尽快畅饮哦，一小时内饮用口感更佳",
							spuId: 3057225073,
							spuName: "红豆布丁奶茶（中）",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "154865375",
							unit: "1杯",
							spuAttrList:[
								{
									spuAttrName: "温度",
									spuAttrValueList:[
										{
											attrId: 4875025152,
											attrValue: "沙冰",
										},
										{
											attrId: 4874269201,
											attrValue: "沙冰仅限冰",
										}
									]
								},
								{
									spuAttrName: "甜度",
									spuAttrValueList:[
										{
											attrId: 4874269202,
											attrValue: "五分甜（推荐）",
										},
										{
											attrId: 4874269204,
											attrValue: "三分甜",
										},
										{
											attrId: 4874769480,
											attrValue: "七分甜",
										},
										{
											attrId: 4874769481,
											attrValue: "十分甜"
										},
										{
											attrId: 4875025153,
											attrValue: "微糖（不另外加糖）",
										},
									]
								}
							]
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/e953cf8d563f4c7504e19df12bb59df499434.jpg",
							currentPrice: 13,
							littleImageUrl: "http://p0.meituan.net/wmproduct/e953cf8d563f4c7504e19df12bb59df499434.jpg",
							originPrice: 13,
							praiseNum: 0,
							praiseNumDecoded: "&#xe167;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xe1a4;&#xed7c;",
							sellStatus: 0,
							spuDesc: "冷/热，浓郁烤奶融入冰滴咖啡，解锁下午茶新形式，赶走疲惫与困倦，请尽快畅饮哦，一小时内饮用口感更佳",
							spuId: 3056877185,
							spuName: "大叔烤奶（中）",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "154865375",
							unit: "1杯",
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/b2c46344bdd9cd36514f784f064808e423974.jpg",
							currentPrice: 11,
							littleImageUrl: "http://p0.meituan.net/wmproduct/b2c46344bdd9cd36514f784f064808e423974.jpg",
							originPrice: 11,
							praiseNum: 0,
							praiseNumDecoded: "&#xed9c;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xe7f8;&#xed7c;",
							sellStatus: 0,
							spuDesc: "冷/热，浓郁烤奶搭配经典琥珀珍珠，喝前搅一搅，浓郁烤奶香，请尽快畅饮哦，一小时内饮用口感更佳",
							spuId: 3056915522,
							spuName: "珍珠烤奶（中）",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "154865375",
							unit: "1杯",
							spuAttrList:[
								{
									spuAttrName: "温度",
									spuAttrValueList:[
										{
											attrId: 4875025152,
											attrValue: "沙冰",
										},
										{
											attrId: 4874269201,
											attrValue: "沙冰仅限冰",
										}
									]
								},
								{
									spuAttrName: "甜度",
									spuAttrValueList:[
										{
											attrId: 4874269202,
											attrValue: "五分甜（推荐）",
										},
										{
											attrId: 4874269204,
											attrValue: "三分甜",
										},
										{
											attrId: 4874769480,
											attrValue: "七分甜",
										},
										{
											attrId: 4874769481,
											attrValue: "十分甜"
										},
										{
											attrId: 4875025153,
											attrValue: "微糖（不另外加糖）",
										},
									]
								}
							]
						}
					]
				},
				// 第四个
				{
					activityTag: "",
					categoryName: "芝士鲜茶",
					categoryType: 0,
					end: true,
					iconUrl: "",
					nextPageIndex: 0,
					spuList:[
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/fbbc7c3d95ee1aece017aa3135e81d7393042.jpg",
							currentPrice: 15,
							littleImageUrl: "http://p0.meituan.net/wmproduct/fbbc7c3d95ee1aece017aa3135e81d7393042.jpg",
							originPrice: 15,
							praiseNum: 0,
							praiseNumDecoded: "&#xeab7;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xead2;&#xe167;",
							sellStatus: 0,
							spuDesc: "冷/热，古茗严选乌龙茶，香气炭焙浓郁，入口回甘，茶香余韵不歇，请尽快畅饮哦，一小时内饮用口感更佳（奶盖独立包装或是经典搭配，记得选择噢）",
							spuId: 3057263939,
							spuName: "芝士乌龙（大）",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "154865377",
							unit: "1杯",
							spuAttrList:[
								{
									spuAttrName: "温度",
									spuAttrValueList:[
										{
											attrId: 4875025152,
											attrValue: "沙冰",
										},
										{
											attrId: 4874269201,
											attrValue: "沙冰仅限冰",
										}
									]
								},
								{
									spuAttrName: "甜度",
									spuAttrValueList:[
										{
											attrId: 4874269202,
											attrValue: "五分甜（推荐）",
										},
										{
											attrId: 4874269204,
											attrValue: "三分甜",
										},
										{
											attrId: 4874769480,
											attrValue: "七分甜",
										},
										{
											attrId: 4874769481,
											attrValue: "十分甜"
										},
										{
											attrId: 4875025153,
											attrValue: "微糖（不另外加糖）",
										},
									]
								}
							]
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/3473c6e500d882371f3ce44925a522b321926.jpg",
							currentPrice: 13,
							littleImageUrl: "http://p0.meituan.net/wmproduct/3473c6e500d882371f3ce44925a522b321926.jpg",
							originPrice: 13,
							praiseNum: 0,
							praiseNumDecoded: "&#xed7c;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xeab7;&#xe1a4;",
							sellStatus: 0,
							spuDesc: "冷/热，古茗严选乌龙茶，香气炭焙浓郁，入口回甘，茶香余韵不歇，请尽快畅饮哦，一小时内饮用口感更佳（奶盖独立包装或是经典搭配，记得选择噢）",
							spuId: 3057263941,
							spuName: "芝士乌龙（中）",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "154865377",
							unit: "1杯",
							spuAttrList:[
								{
									spuAttrName: "温度",
									spuAttrValueList:[
										{
											attrId: 4875025152,
											attrValue: "沙冰",
										},
										{
											attrId: 4874269201,
											attrValue: "沙冰仅限冰",
										}
									]
								},
								{
									spuAttrName: "甜度",
									spuAttrValueList:[
										{
											attrId: 4874269202,
											attrValue: "五分甜（推荐）",
										},
										{
											attrId: 4874269204,
											attrValue: "三分甜",
										},
										{
											attrId: 4874769480,
											attrValue: "七分甜",
										},
										{
											attrId: 4874769481,
											attrValue: "十分甜"
										},
										{
											attrId: 4875025153,
											attrValue: "微糖（不另外加糖）",
										},
									]
								}
							]
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p1.meituan.net/wmproduct/e130f37067db5a54970586864ae2195495396.jpg",
							currentPrice: 16,
							littleImageUrl: "http://p1.meituan.net/wmproduct/e130f37067db5a54970586864ae2195495396.jpg",
							originPrice: 16,
							praiseNum: 0,
							praiseNumDecoded: "&#xed7c;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xead2;",
							sellStatus: 0,
							spuDesc: "冰饮，古茗严选茉莉花茶，较普通绿茶少了几分苦涩，口感清澈，茉莉清香怡人，请尽快畅饮哦，一小时内饮用口感更佳（奶盖独立包装或是经典搭配，记得选择噢）",
							spuId: 3056877189,
							spuName: "芝士茉莉（大）",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "154865377",
							unit: "1杯",
							spuAttrList:[
								{
									spuAttrName: "温度",
									spuAttrValueList:[
										{
											attrId: 4875025152,
											attrValue: "沙冰",
										},
										{
											attrId: 4874269201,
											attrValue: "沙冰仅限冰",
										}
									]
								},
								{
									spuAttrName: "甜度",
									spuAttrValueList:[
										{
											attrId: 4874269202,
											attrValue: "五分甜（推荐）",
										},
										{
											attrId: 4874269204,
											attrValue: "三分甜",
										},
										{
											attrId: 4874769480,
											attrValue: "七分甜",
										},
										{
											attrId: 4874769481,
											attrValue: "十分甜"
										},
										{
											attrId: 4875025153,
											attrValue: "微糖（不另外加糖）",
										},
									]
								}
							]
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p1.meituan.net/wmproduct/e130f37067db5a54970586864ae2195495396.jpg",
							currentPrice: 14,
							littleImageUrl: "http://p1.meituan.net/wmproduct/e130f37067db5a54970586864ae2195495396.jpg",
							originPrice: 14,
							praiseNum: 0,
							praiseNumDecoded: "&#xed7c;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xe7f8;",
							sellStatus: 0,
							spuDesc: "冰饮，古茗严选茉莉花茶，较普通绿茶少了几分苦涩，口感清澈，茉莉清香怡人，请尽快畅饮哦，一小时内饮用口感更佳（奶盖独立包装或是经典搭配，记得选择噢）",
							spuId: 3057132457,
							spuName: "芝士茉莉（中）",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "154865377",
							unit: "1杯",
							spuAttrList:[
								{
									spuAttrName: "温度",
									spuAttrValueList:[
										{
											attrId: 4875025152,
											attrValue: "沙冰",
										},
										{
											attrId: 4874269201,
											attrValue: "沙冰仅限冰",
										}
									]
								},
								{
									spuAttrName: "甜度",
									spuAttrValueList:[
										{
											attrId: 4874269202,
											attrValue: "五分甜（推荐）",
										},
										{
											attrId: 4874269204,
											attrValue: "三分甜",
										},
										{
											attrId: 4874769480,
											attrValue: "七分甜",
										},
										{
											attrId: 4874769481,
											attrValue: "十分甜"
										},
										{
											attrId: 4875025153,
											attrValue: "微糖（不另外加糖）",
										},
									]
								}
							]
						},
					]
				},
				// 第五个
				{
					activityTag: "",
					categoryName: "台式饮品",
					categoryType: 0,
					end: true,
					iconUrl: "",
					nextPageIndex: 0,
					spuList:[
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/5571a202d6971e79d11de1eff742be9690586.jpg",
							currentPrice: 11,
							littleImageUrl: "http://p0.meituan.net/wmproduct/5571a202d6971e79d11de1eff742be9690586.jpg",
							originPrice: 11,
							praiseNum: 0,
							praiseNumDecoded: "&#xf2df;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xf89c;&#xed7c;&#xed7c;+",
							sellStatus: 0,
							spuDesc: "冷/热，能量奶露加入弹牙小芋圆，喝前搅一搅，口感更佳。饮用秘籍：1.舀起芋圆、西米先尝，2.吸管一插到底，在吸布丁与奶露（布丁芋奶露含牛奶，过敏者请慎重选择）",
							spuId: 3057194833,
							spuName: "布丁芋奶露（中）",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "154865407",
							unit: "1杯",
							spuAttrList:[
								{
									spuAttrName: "温度",
									spuAttrValueList:[
										{
											attrId: 4875025152,
											attrValue: "沙冰",
										},
										{
											attrId: 4874269201,
											attrValue: "沙冰仅限冰",
										}
									]
								},
								{
									spuAttrName: "甜度",
									spuAttrValueList:[
										{
											attrId: 4874269202,
											attrValue: "五分甜（推荐）",
										},
										{
											attrId: 4874269204,
											attrValue: "三分甜",
										},
										{
											attrId: 4874769480,
											attrValue: "七分甜",
										},
										{
											attrId: 4874769481,
											attrValue: "十分甜"
										},
										{
											attrId: 4875025153,
											attrValue: "微糖（不另外加糖）",
										},
									]
								}
							]
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/910bc11f8959b323d7d434a96132584a90700.jpg",
							currentPrice: 10,
							littleImageUrl: "http://p0.meituan.net/wmproduct/910bc11f8959b323d7d434a96132584a90700.jpg",
							originPrice: 10,
							praiseNum: 0,
							praiseNumDecoded: "&#xed7c;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xe1a4;&#xed9c;",
							sellStatus: 0,
							spuDesc: "冷/热，软糯芋圆融入嫣然奶露，底部藏有滑嫩布丁。饮用秘籍：1.舀起芋圆、西米先尝，2.吸管一插到底，在吸布丁与奶露（布丁西米露含牛奶，过敏者请慎重选择）",
							spuId: 3057132461,
							spuName: "布丁西米露（中）",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "154865407",
							unit: "1杯",
							spuAttrList:[
								{
									spuAttrName: "温度",
									spuAttrValueList:[
										{
											attrId: 4875025152,
											attrValue: "沙冰",
										},
										{
											attrId: 4874269201,
											attrValue: "沙冰仅限冰",
										}
									]
								},
								{
									spuAttrName: "甜度",
									spuAttrValueList:[
										{
											attrId: 4874269202,
											attrValue: "五分甜（推荐）",
										},
										{
											attrId: 4874269204,
											attrValue: "三分甜",
										},
										{
											attrId: 4874769480,
											attrValue: "七分甜",
										},
										{
											attrId: 4874769481,
											attrValue: "十分甜"
										},
										{
											attrId: 4875025153,
											attrValue: "微糖（不另外加糖）",
										},
									]
								}
							]
						}
					]
				},
				// 6
				{
					activityTag: "",
					categoryName: "美味加料",
					categoryType: 0,
					end: true,
					iconUrl: "",
					nextPageIndex: 0,
					spuList:[
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/7b659088b79abad9e6a18db8969fae9f163808.jpg",
							currentPrice: 2,
							littleImageUrl: "http://p0.meituan.net/wmproduct/7b659088b79abad9e6a18db8969fae9f163808.jpg",
							originPrice: 2,
							praiseNum: 0,
							praiseNumDecoded: "&#xf2df;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xf2df;&#xead2;",
							sellStatus: 0,
							spuAttrList: [],
							spuDesc: "多肉不建议添加在热饮里，比较适合添加在水果类饮品里。 1.加在饮品里（请备注哪杯饮品）2.单独分装（1元餐盒费）",
							spuId: 3057194835,
							spuName: "多肉",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "170853617",
							unit: "",
							skuList:[
								{
									activityStock: 0,
									boxFee: 1,
									count: 0,
									currentPrice: 2,
									minPurchaseNum: -1,
									originPrice: 2,
									realStock: 991,
									restrict: -1,
									skuId: 3427562506,
									skuPromotionInfo: "",
									soldStatus: 0,
									spec: "分装（+1元餐盒）(1杯)",
								},
								{
									activityStock: 0,
									boxFee: 0,
									count: 0,
									currentPrice: 2,
									minPurchaseNum: -1,
									originPrice: 2,
									realStock: 973,
									restrict: -1,
									skuId: 3427526063,
									skuPromotionInfo: "",
									soldStatus: 0,
									spec: "不分装（备注饮品）(1杯)",
								}
							]
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/ef5223688dfbc6099ca04fb9b76fb36f155690.jpg",
							currentPrice: 2,
							littleImageUrl: "http://p0.meituan.net/wmproduct/ef5223688dfbc6099ca04fb9b76fb36f155690.jpg",
							originPrice: 2,
							praiseNum: 0,
							praiseNumDecoded: "&#xe167;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xf8b8;&#xeab7;",
							sellStatus: 0,
							spuAttrList: [],
							spuDesc: "可以单独吃的芋圆，比较适合添加在水果茶里。1.加在饮品里（请备注哪杯饮品）2.单独分装（1元餐盒费）",
							spuId: 3057194836,
							spuName: "芋圆",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "170853617",
							unit: "",
							skuList:[
								{
									activityStock: 0,
									boxFee: 1,
									count: 0,
									currentPrice: 2,
									minPurchaseNum: -1,
									originPrice: 2,
									realStock: 990,
									restrict: -1,
									skuId: 3427562507,
									skuPromotionInfo: "",
									soldStatus: 0,
									spec: "分装（+1元餐盒）(1杯)",
								},
								{
									activityStock: 0,
									boxFee: 0,
									count: 0,
									currentPrice: 2,
									minPurchaseNum: -1,
									originPrice: 2,
									realStock: 978,
									restrict: -1,
									skuId: 3427526065,
									skuPromotionInfo: "",
									soldStatus: 0,
									spec: "不分装（备注饮品）(1杯)",
								}
							]
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/9eda18243987f617aeb379868e5c7ac8137447.jpg",
							currentPrice: 4,
							littleImageUrl: "http://p0.meituan.net/wmproduct/9eda18243987f617aeb379868e5c7ac8137447.jpg",
							originPrice: 4,
							praiseNum: 0,
							praiseNumDecoded: "&#xed7c;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xed9c;&#xf89c;",
							sellStatus: 0,
							spuAttrList: [],
							spuDesc: "加在热饮里配送途中会出现沉淀情况  1.加在饮品里（请备注哪杯饮品）2.单独分装（1元餐盒费）",
							spuId: 3057225082,
							spuName: "奶盖",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "170853617",
							unit: "",
							skuList:[
								{
									activityStock: 0,
									boxFee: 1,
									count: 0,
									currentPrice: 4,
									minPurchaseNum: -1,
									originPrice: 4,
									realStock: 994,
									restrict: -1,
									skuId: 3427526067,
									skuPromotionInfo: "",
									soldStatus: 0,
									spec: "分装（+1元餐盒）",
								},
								{
									activityStock: 0,
									boxFee: 0,
									count: 0,
									currentPrice: 4,
									minPurchaseNum: -1,
									originPrice: 4,
									realStock: 994,
									restrict: -1,
									skuId: 3427456152,
									skuPromotionInfo: "",
									soldStatus: 0,
									spec: "不分装（备注饮品）",
								}
							]
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/f6bfd42a9040a23c371fe74556bc9a64157152.jpg",
							currentPrice: 1,
							littleImageUrl: "http://p0.meituan.net/wmproduct/f6bfd42a9040a23c371fe74556bc9a64157152.jpg",
							originPrice: 1,
							praiseNum: 0,
							praiseNumDecoded: "&#xe167;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xf8b8;&#xead2;",
							sellStatus: 0,
							spuAttrList: [],
							spuDesc: "因为珍珠本身自带甜度，还请酌情调整饮品甜度 。1.加在饮品里（请备注哪杯饮品）2.单独分装（1元餐盒费）",
							spuId: 3057225083,
							spuName: "珍珠",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "170853617",
							unit: "",
							skuList:[
								{
									activityStock: 0,
									boxFee: 1,
									count: 0,
									currentPrice: 1,
									minPurchaseNum: -1,
									originPrice: 1,
									realStock: 987,
									restrict: -1,
									skuId: 3427114099,
									skuPromotionInfo: "",
									soldStatus: 0,
									spec: "分装（+1元餐盒）",
								},
								{
									activityStock: 0,
									boxFee: 0,
									count: 0,
									currentPrice: 1,
									minPurchaseNum: -1,
									originPrice: 1,
									realStock: 966,
									restrict: -1,
									skuId: 3427182362,
									skuPromotionInfo: "",
									soldStatus: 0,
									spec: "不分装（备注饮品）",
								}
							]
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/15ce509a90c7cb1326fb966382c6ee73144490.jpg",
							currentPrice: 1,
							littleImageUrl: "http://p0.meituan.net/wmproduct/15ce509a90c7cb1326fb966382c6ee73144490.jpg",
							originPrice: 1,
							praiseNum: 0,
							praiseNumDecoded: "&#xed7c;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xeab7;&#xead2;",
							sellStatus: 0,
							spuAttrList: [],
							spuDesc: "椰果不建议加进热饮里，比较适合加进冰饮里。 1.加在饮品里（请备注哪杯饮品）2.单独分装（1元餐盒费）",
							spuId: 3056915531,
							spuName: "椰果",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "170853617",
							unit: "",
							skuList:[
								{
									activityStock: 0,
									boxFee: 1,
									count: 0,
									currentPrice: 1,
									minPurchaseNum: -1,
									originPrice: 1,
									realStock: 989,
									restrict: -1,
									skuId: 3427114102,
									skuPromotionInfo: "",
									soldStatus: 0,
									spec: "分装（+1元餐盒）",
								},
								{
									activityStock: 0,
									boxFee: 0,
									count: 0,
									currentPrice: 1,
									minPurchaseNum: -1,
									originPrice: 1,
									realStock: 979,
									restrict: -1,
									skuId: 3427368466,
									skuPromotionInfo: "",
									soldStatus: 0,
									spec: "不分装（备注饮品）",
								}
							]
						}
					]
				},
				// 7
				{
					activityTag: "",
					categoryName: "下单须知",
					categoryType: 0,
					end: true,
					iconUrl: "",
					nextPageIndex: 0,
					spuList:[
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/a33b8779badacd3f6fad10c399ba74b8112701.jpg",
							currentPrice: 99,
							littleImageUrl: "http://p0.meituan.net/wmproduct/a33b8779badacd3f6fad10c399ba74b8112701.jpg",
							originPrice: 99,
							praiseNum: 0,
							praiseNumDecoded: "&#xed7c;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xed7c;",
							sellStatus: 0,
							spuDesc: "1、沙冰类饮品在配送过程中可能出现融化；↵2、饮品喝之前摇一摇口感更好哦 ；↵3、奶盖类饮品倾斜45°饮用，口感更好哦~",
							spuId: 3057132467,
							spuName: "喝前必看",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "170853618",
							unit: "1人份",
							skuList:[
								{
									activityStock: 0,
									boxFee: 0,
									count: 0,
									currentPrice: 99,
									minPurchaseNum: -1,
									originPrice: 99,
									realStock: 1000,
									restrict: -1,
									skuId: 3427257428,
									skuPromotionInfo: "",
									soldStatus: 0,
									spec: "(1人份)",
								},
							],
							spuAttrList:[
								{
									spuAttrName: "喝前必看",
									spuAttrValueList:[
										{
											attrId: 4758785040,
											attrValue: "沙冰易融化",
										},
										{
											attrId: 4760031627,
											attrValue: "喝前摇一摇",
										}
									]
								}
							]
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/f603aede9e7a66eee935e81cf05ad8ac75853.jpg",
							currentPrice: 99,
							littleImageUrl: "http://p0.meituan.net/wmproduct/f603aede9e7a66eee935e81cf05ad8ac75853.jpg",
							originPrice: 99,
							praiseNum: 0,
							praiseNumDecoded: "&#xed7c;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xed7c;",
							sellStatus: 0,
							spuDesc: "每一杯饮品希望都能让您满意，若我们的饮品有任何错送、漏送、饮品口感、吸管、备注上的问题，请您及时联系我们，我们一定解决到您满意！",
							spuId: 3057132469,
							spuName: "售后专线",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "170853618",
							unit: "1人份",
							skuList:[
								{
									activityStock: 0,
									boxFee: 0,
									count: 0,
									currentPrice: 99,
									minPurchaseNum: -1,
									originPrice: 99,
									realStock: 1000,
									restrict: -1,
									skuId: 3427562514,
									skuPromotionInfo: "",
									soldStatus: 0,
									spec: "(1人份)",
								}
							],
							spuAttrList:[
								{
									spuAttrName: "售后专线",
									spuAttrValueList:[
										{
											attrId: 4758785145,
											attrValue: "4000666577",
										},
										{
											attrId: 4758785147,
											attrValue: "4000365577",
										}
									]
								}
							],
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p1.meituan.net/wmproduct/14cdb9803aca2014789bc5e66810773998623.jpg",
							currentPrice: 99,
							littleImageUrl: "http://p1.meituan.net/wmproduct/14cdb9803aca2014789bc5e66810773998623.jpg",
							originPrice: 99,
							praiseNum: 0,
							praiseNumDecoded: "&#xed7c;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xed7c;",
							sellStatus: 0,
							skuList:[
								{
									activityStock: 0,
									boxFee: 0,
									count: 0,
									currentPrice: 99,
									minPurchaseNum: -1,
									originPrice: 99,
									realStock: 1000,
									restrict: -1,
									skuId: 3427114104,
									skuPromotionInfo: "",
									soldStatus: 0,
									spec: "",
								}
							],
							spuAttrList:[
								{
									spuDesc: "1.亲，我们的产品除了风味奶茶与台式饮品系列能去冰外，其他饮品均不能去冰哦；↵2.产品的冰量均按图所示，由于天气炎热，配送距离较远，可能去冰的产品会变成常温；↵3.为了保证饮品的口感，我们会在去冰饮品中放上1-2颗冰，以做冰镇作用！",
									spuId: 3057132471,
									spuName: "冰量说明",
									spuPromotionInfo: "",
									statusDesc: "",
									tag: "170853618",
									unit: "",
								}
							],
						},
						{
							activityTag: "",
							activityType: 0,
							bigImageUrl: "http://p0.meituan.net/wmproduct/70aa36f9052744a3c41a756f8fb8256486650.jpg",
							currentPrice: 99,
							littleImageUrl: "http://p0.meituan.net/wmproduct/70aa36f9052744a3c41a756f8fb8256486650.jpg",
							originPrice: 99,
							praiseNum: 0,
							praiseNumDecoded: "&#xed7c;",
							saleVolume: 0,
							saleVolumeDecoded: "&#xed7c;",
							sellStatus: 0,
							spuDesc: "标准糖度口味更佳，正常糖=七分甜，少糖=五分甜，半糖=三分甜，多糖=十分甜，微糖=微糖",
							spuId: 3057302797,
							spuName: "糖度建议",
							spuPromotionInfo: "",
							statusDesc: "",
							tag: "170853618",
							unit: "1人份",
							skuList:[
								{
									activityStock: 0,
									boxFee: 0,
									count: 0,
									currentPrice: 99,
									minPurchaseNum: -1,
									originPrice: 99,
									realStock: 1000,
									restrict: -1,
									skuId: 3427456162,
									skuPromotionInfo: "",
									soldStatus: 0,
									spec: "(1人份)",
								}
							],
							spuAttrList:[
								{
									spuAttrName: "糖度建议",
									spuAttrValueList:[
										{
											attrId: 4759149641,
											attrValue: "标准糖",
										},
										{
											attrId: 4760031579,
											attrValue: "口味更佳哦"
										}
									],
								},
								{
									spuAttrName: "特殊糖度",
									spuAttrValueList:[
										{
											attrId: 4759405568,
											attrValue: "大叔奶茶不能做微糖哦",
										},
										{
											attrId: 4760031580,
											attrValue: "奶露不能做三分甜呐",
										}
									]
								}
							]
						},
					],

				}
			]
			
		}
	})
}

// 古茗的商家评论接口
const comment = (req,res)=>{
	res.send({
		PraiseRatio:"商家好评率96%",
		buzCode: 0,
		deliveryScore: 5,
		dpCommentNum: 0,
		integratedScore: 4.8,
		isEnd: false,
		mtWmPoiId: "1026876356200010",
		nextStartIndex: 20,
		packScore: 4.8,
		qualityScore: 4.8,
		recordCount: 1325,
		shopId: 1215333962,
		shopScore: 4.8,
		startIndex: 0,
		commentLabels:[{
			ID: 0,
			content: "全部(1325)",
			isSelected: 1,
			type: 1,
		},
		{
			ID: 1,
			content: "好评(1285)",
			isSelected: 0,
			type: 1,
		},
		{
			ID: 3,
			content: "差评(29)",
			isSelected: 0,
			type: 1,
		},
		{
			ID: 5,
			content: "有图评价(178)",
			isSelected: 0,
			type: 1,
		},
		{
			ID: 75,
			content: "味道赞(14)",
			isSelected: 0,
			type: 2,
		},
		{
			ID: 36,
			content: "推荐(6)",
			isSelected: 0,
			type: 2,
		},
		{
			ID: 34,
			content: "满意(5)",
			isSelected: 0,
			type: 2,
		},
		{
			ID: 39,
			content: "服务好(5)",
			isSelected: 0,
			type: 2,
		},
		{
			ID: 61,
			content: "价格实惠(3)",
			isSelected: 0,
			type: 2,
		}
		],
		list:[
			{
				commentTime: "2020-09-23",
				content: "最喜欢古茗了，好开心!!!!!!#古茗奶茶（大）#",
				deliveryTime: "50分钟送达",
				isAnonymous: 1,
				label: "",
				praiseDish: "",
				score: 5,
				shopReply: "商家回复(1天后):您的好评是对我们最大的肯定，我们不奢求一日三餐四季，只希望您往后能够经常光临我们小店！",
				userID: 0,
				userName: "匿名用户",
				userPicUrl: "",
				pictures:[
					{
						bigPicUrl: "http://p0.meituan.net/wmcomment/8d4510c1fb338d193c733656afe2241029139.jpg@330w_330h_1e_1c",
						originalPicUrl: "http://p0.meituan.net/wmcomment/8d4510c1fb338d193c733656afe2241029139.jpg",
						smallPicUrl: "http://p0.meituan.net/wmcomment/8d4510c1fb338d193c733656afe2241029139.jpg@160w_160h_1e_1c",
					},
					{
						bigPicUrl: "http://p0.meituan.net/wmcomment/023eb712eff772f870ba647be88245ca33023.jpg@330w_330h_1e_1c",
						originalPicUrl: "http://p0.meituan.net/wmcomment/023eb712eff772f870ba647be88245ca33023.jpg",
						smallPicUrl: "http://p0.meituan.net/wmcomment/023eb712eff772f870ba647be88245ca33023.jpg@160w_160h_1e_1c",
					},
					{
						bigPicUrl: "http://p0.meituan.net/wmcomment/84eb64f3337aeb51df8f8846cf8d358f39601.jpg@330w_330h_1e_1c",
						originalPicUrl: "http://p0.meituan.net/wmcomment/84eb64f3337aeb51df8f8846cf8d358f39601.jpg",
						smallPicUrl: "http://p0.meituan.net/wmcomment/84eb64f3337aeb51df8f8846cf8d358f39601.jpg@160w_160h_1e_1c",
					}
				],
				
			},
			{
				commentTime: "2020-09-24",
				content: "#葡萄啵啵冻不知春（大）# #多肉#好大一杯 料很多 不太喜欢茶底 下次换",
				deliveryTime: "37分钟送达",
				isAnonymous: 1,
				label: "",
				pictures: [],
				praiseDish: "葡萄啵啵冻不知春（大）,多肉",
				score: 5,
				shopReply: "商家回复(1天后):谢谢亲亲的支持~葡萄啵啵冻有两款茶底，不知春和茉莉的，下次亲亲可以试试葡萄啵啵冻茉莉呢~期待您的下次光临哟",
				userID: 0,
				userName: "匿名用户",
				userPicUrl: "",
			},
			{
				commentTime: "2020-09-24",
				content: "#杨枝甘露轻盈版（大）#好喝！下次试试椰奶的 葡萄的也很好喝",
				deliveryTime: "40分钟送达",
				isAnonymous: 1,
				label: "",
				pictures: [],
				praiseDish: "杨枝甘露轻盈版（大）",
				score: 5,
				shopReply: "商家回复(1天后):谢谢亲亲的支持哟！！您的好评就是我们莫大的动力！期待您的下次光临哟~",
				userID: 0,
				userName: "匿名用户",
				userPicUrl: "",
			},
			{
				commentTime: "2020-09-21",
				content: "#葡萄啵啵冻茉莉（大）#点了微糖 很好喝 茉莉茶底很喜欢果肉也很多",
				deliveryTime: "33分钟送达",
				isAnonymous: 1,
				label: "",
				praiseDish: "",
				score: 5,
				shopReply: "商家回复(1天后):看到好评的那一刻我感动了，因为您的肯定是对我们最大的支持与信任。为了达到您的更高要求，我们不断的改进自己，完善自己，这也是对我们可爱的顾客—您，最大的回报。古茗时刻会记得您对我们的支持，期待您的下次光临~~",
				userID: 0,
				userName: "匿名用户",
				userPicUrl: "",
				pictures:[
					{
						bigPicUrl: "http://p0.meituan.net/wmcomment/b1078b5fa66eeda177ee8091901c699748490.jpg@330w_330h_1e_1c",
						originalPicUrl: "http://p0.meituan.net/wmcomment/b1078b5fa66eeda177ee8091901c699748490.jpg",
						smallPicUrl: "http://p0.meituan.net/wmcomment/b1078b5fa66eeda177ee8091901c699748490.jpg@160w_160h_1e_1c",
					}
				]
			},
			{
				commentTime: "2020-09-08",
				content: "#杨枝甘露轻盈版（大）#按推荐点的甜度，感觉还可以再甜一点",
				deliveryTime: "37分钟送达",
				isAnonymous: 0,
				label: "快速准时,货品完好,穿戴工服,仪表整洁,礼貌热情",
				praiseDish: "杨枝甘露轻盈版（大）,芝士乌龙（大）",
				score: 5,
				shopReply: "商家回复(6天后):感谢您的支持哦！我们一定会再接再厉的！一路上有您陪伴倍感温暖！~您的满意，是我们不懈的追求，古茗祝您生活愉快..！！",
				userID: 1709451032,
				userName: "zkb645447148",
				userPicUrl: "https://img.meituan.net/avatar/fa9fbf4fb2e8b121fae37deeb9f0855e12463.jpg",
				pictures:[
					{
						bigPicUrl: "http://p0.meituan.net/wmcomment/641b320065169f7de70a4a873564ef6646859.jpg@330w_330h_1e_1c",
						originalPicUrl: "http://p0.meituan.net/wmcomment/641b320065169f7de70a4a873564ef6646859.jpg",
						smallPicUrl: "http://p0.meituan.net/wmcomment/641b320065169f7de70a4a873564ef6646859.jpg@160w_160h_1e_1c",
					}
				]
			},
			{
				commentTime: "2020-09-16",
				content: "每次来下沙都会点古茗，我就好奇了，主城区咋没有！没有葡萄好喝，就这样呗！不过性价比高，便宜",
				deliveryTime: "51分钟送达",
				isAnonymous: 0,
				label: "",
				pictures: [],
				praiseDish: "杨枝甘露轻盈版（大）,古茗奶茶（中）",
				score: 5,
				shopReply: "商家回复(2天后):谢谢亲亲对我们的支持！！看到好评的那一刻我感动了，因为您的肯定是对我们最大的支持与信任。为了达到您的更高要求，我们不断的改进自己，完善自己，这也是对我们可爱的顾客—您，最大的回报。古茗时刻会记得您对我们的支持，期待您的下次光临~~↵",
				userID: 6146691,
				userName: "丫芳",
				userPicUrl: "https://img.meituan.net/avatar/6a7f2789068e37a1155672937d9d795f65061.jpg",
			},
			{
				commentTime: "2020-08-31",
				content: "一如既往的喜好芝士多肉葡萄…嘻嘻。淇淇子，超级喜欢你啊啊啊啊啊啊啊",
				deliveryTime: "27分钟送达",
				isAnonymous: 1,
				label: "",
				praiseDish: "芝士多肉葡萄（大）",
				score: 5,
				shopReply: "商家回复(1天后):看到好评的那一刻我感动了，因为您的肯定是对我们最大的支持与信任。为了达到您的更高要求，我们不断的改进自己，完善自己，这也是对我们可爱的顾客—您，最大的回报。古茗时刻会记得您对我们的支持，期待您的下次光临~~",
				userID: 0,
				userName: "匿名用户",
				userPicUrl: "",
				pictures:[
					{
						bigPicUrl: "http://p0.meituan.net/wmcomment/1b375ad2129c302749da66212b58ba8545291.jpg@330w_330h_1e_1c",
						originalPicUrl: "http://p0.meituan.net/wmcomment/1b375ad2129c302749da66212b58ba8545291.jpg",
						smallPicUrl: "http://p0.meituan.net/wmcomment/1b375ad2129c302749da66212b58ba8545291.jpg@160w_160h_1e_1c",
					}
				]
			},
			{
				commentTime: "2020-08-31",
				content: "多肉葡萄料真的太太太少了，没办法跟上沙路那家古茗比，这个脆啵啵顶多10颗吧？？？葡萄肉也烂烂的，这喝了都不想买古茗了。",
				deliveryTime: "50分钟送达",
				isAnonymous: 1,
				label: "",
				praiseDish: "",
				score: 3,
				shopReply: "商家回复(1天后):实在非常非常抱歉，未能给您带来满意的用餐体验，因为您这边是匿名评价我们也不能第一时间找到您的联系方式给你道歉，下次遇到让您不满意的问题请一定要第一时间拨打我们店铺电话，我们会立马给你妥善满意的解决方案，如果您看到这条信息也可以拨打这个电话或者微信：13372411038，追求品质的情况下服务一直是我们的宗旨，我们也会加强内部员工培训不断完善大家的用餐体验，在此代表全体员工给您表示歉意，也希望您能包涵体量，千万不要影响自己的心情，记得每天都要开心哦期待您的下次光临！古茗十年感谢有你",
				userID: 0,
				userName: "匿名用户",
				userPicUrl: "",
				pictures:[
					{
						bigPicUrl: "http://p0.meituan.net/wmcomment/f018d1ec630d5015546ea725e5753e78104686.jpg@330w_330h_1e_1c",
						originalPicUrl: "http://p0.meituan.net/wmcomment/f018d1ec630d5015546ea725e5753e78104686.jpg",
						smallPicUrl: "http://p0.meituan.net/wmcomment/f018d1ec630d5015546ea725e5753e78104686.jpg@160w_160h_1e_1c",
					}
				]
			},
			{
				commentTime: "2020-09-06",
				content: "极致无语，每次都不满杯，上次是少料，这次不满杯那么多，20一杯，直接给我少两三块钱，古茗怎么了？生意好？飘了？",
				deliveryTime: "59分钟送达",
				isAnonymous: 1,
				label: "",
				praiseDish: "",
				score: 1,
				shopReply: "商家回复(2天后):实在非常非常抱歉，未能给您带来满意的用餐体验，因为平台这边是没办法看到您的联系方式如果您不主动联系我们，我们也不能第一时间给你反馈道歉呢，真的非常非常抱歉，下次遇到让您不满意的问题请一定要第一时间拨打我们店铺电话，我们会立马给你妥善满意的解决方案，如果您看到这条信息也可以拨打这个电话或者微信：13372411038  追求品质的情况下服务一直是我们的宗旨，我们也会加强内部员工培训不断完善大家的用餐体验，在此代表全体员工给您表示歉意，也希望您能包涵体量，千万不要影响自己的心情，记得每天都要开心哦，期待您的下次光临！古茗十年感谢有你🙏🙏🙏",
				userID: 0,
				userName: "匿名用户",
				userPicUrl: "",
				pictures:[
					{
						bigPicUrl: "http://p0.meituan.net/wmcomment/4a712a18e74f7fcd0b8672aa2ce3765833104.jpg@330w_330h_1e_1c",
						originalPicUrl: "http://p0.meituan.net/wmcomment/4a712a18e74f7fcd0b8672aa2ce3765833104.jpg",
						smallPicUrl: "http://p0.meituan.net/wmcomment/4a712a18e74f7fcd0b8672aa2ce3765833104.jpg@160w_160h_1e_1c",
					}
				]
			},
			{
				commentTime: "2020-09-30",
				content: "真的绝的，多肉葡萄多了一个选项还默认去多肉，真的无语。我有一份还是➕一份多肉，你们都圈出来了也不觉得奇怪吗？？？要用默认去多肉来挣钱吗？",
				deliveryTime: "54分钟送达",
				isAnonymous: 1,
				label: "",
				pictures: [],
				praiseDish: "",
				score: 1,
				shopReply: "商家回复(5天后):真的非常非常抱歉哦！！没能给您带来良好的用户体验，亲亲反馈的问题我们这边有及时查看的哦，此次可能是店员小姐姐不熟悉导致操作失误，下次遇到让您不满意的问题请一定要第一时间拨打我们店铺电话，我们会立马给你妥善满意的解决方案，如果您看到这条信息也可以拨打这个电话或者微信：13372411038，追求品质的情况下服务一直是我们的宗旨，我们也会加强内部员工培训不断完善大家的用餐体验，在此代表全体员工给您表示歉意，也希望您能包涵体量，千万不要影响自己的心情，记得每天都要开心哦期待您的下次光临！",
				userID: 0,
				userName: "匿名用户",
				userPicUrl: "",
			},
			{
				commentTime: "2020-09-07",
				content: "我就想说orz吸管这一次为什么订在袋子上orz，一下拔不出来，结果一用力，订书针给戳了个好深的口子，血流一手指orz，太背了",
				deliveryTime: "33分钟送达",
				isAnonymous: 0,
				label: "",
				praiseDish: "",
				score: 5,
				shopReply: "商家回复(1天后):非常抱歉，吸管在配送的过程中容易掉落，特意才把吸管定在袋子上了，没有想到会出现这样的事情，真是非常抱歉，我们会重新调整打包方式的，谢谢您手指划破了还给的5星好评。",
				userID: 148848514,
				userName: "咪啪咚喵",
				userPicUrl: "https://img.meituan.net/avatar/8c0a7da364ef9ef2662660e52d0a0c58214825.jpg",
				pictures:[
					{
						bigPicUrl: "http://p0.meituan.net/wmcomment/2dd5d5fc02b8c55772d6cb03511118e995972.jpg@330w_330h_1e_1c",
						originalPicUrl: "http://p0.meituan.net/wmcomment/2dd5d5fc02b8c55772d6cb03511118e995972.jpg",
						smallPicUrl: "http://p0.meituan.net/wmcomment/2dd5d5fc02b8c55772d6cb03511118e995972.jpg@160w_160h_1e_1c",
					}
				]
			},
			{
				commentTime: "2020-09-09",
				content: "好喝就完了不过柚子有点点苦下次要记得备注不要柚子！",
				deliveryTime: "40分钟送达",
				isAnonymous: 0,
				label: "",
				pictures: [],
				praiseDish: "",
				score: 5,
				shopReply: "商家回复(5天后):嗯嗯！！亲亲如果不喜欢西柚粒的味道下次可以备注去西柚粒哦！谢谢亲亲的支持，期待您的下次光临~",
				userID: 1220152478,
				userName: "DHL749587622",
				userPicUrl: "https://img.meituan.net/avatar/0f4228137a870ac1bdd0d11dc13cb3c816421.jpg",
			},
			{
				commentTime: "2020-08-28",
				content: "#芝士多肉葡萄（大）#太好喝了喝不腻的 每次都点这个 很清新 这次总算等着打烊前下单了",
				deliveryTime: "24分钟送达",
				isAnonymous: 0,
				label: "货品完好,快速准时",
				praiseDish: "芝士多肉葡萄（大）,大叔奶茶（大）",
				score: 5,
				shopReply: "商家回复(1天后):看到好评的那一刻我感动了，因为您的肯定是对我们最大的支持与信任。为了达到您的更高要求，我们不断的改进自己，完善自己，这也是对我们可爱的顾客—您，最大的回报。古茗时刻会记得您对我们的支持，期待您的下次光临~~",
				userID: 2721370698,
				userName: "我饿的头晕眼花了",
				userPicUrl: "https://img.meituan.net/avatar/47143a680e248685233402b0c94f070c10503.jpg",
				pictures:[
					{
						bigPicUrl: "http://p0.meituan.net/wmcomment/cbd342f9132e7b8365a3ef1553189f2045832.jpg@330w_330h_1e_1c",
						originalPicUrl: "http://p0.meituan.net/wmcomment/cbd342f9132e7b8365a3ef1553189f2045832.jpg",
						smallPicUrl: "http://p0.meituan.net/wmcomment/cbd342f9132e7b8365a3ef1553189f2045832.jpg@160w_160h_1e_1c",
					}
				]
			},
			{
				commentTime: "2020-09-04",
				content: "#芝士多肉葡萄（大）#我真的太爱只是多肉葡萄了。哈哈哈哈哈",
				deliveryTime: "30分钟送达",
				isAnonymous: 0,
				label: "",
				praiseDish: "芝士多肉葡萄（大）",
				score: 5,
				shopReply: "商家回复(1天后):看到好评的那一刻我感动了，因为您的肯定是对我们最大的支持与信任。为了达到您的更高要求，我们不断的改进自己，完善自己，这也是对我们可爱的顾客—您，最大的回报。古茗时刻会记得您对我们的支持，期待您的下次光临~~",
				userID: 2839985415,
				userName: "DkY634867488",
				userPicUrl: "",
				pictures:[
					{
						bigPicUrl: "http://p0.meituan.net/wmcomment/a15509ae37945eb44abd988ca7bbcedd103527.jpg@330w_330h_1e_1c",
						originalPicUrl: "http://p0.meituan.net/wmcomment/a15509ae37945eb44abd988ca7bbcedd103527.jpg",
						smallPicUrl: "http://p0.meituan.net/wmcomment/a15509ae37945eb44abd988ca7bbcedd103527.jpg@160w_160h_1e_1c",
					}
				]
			},
			{
				commentTime: "2020-09-08",
				content: "好喝好吃 和抖音一样#芝士多肉桃桃（大）# #布蕾# #芋圆# #布丁#",
				deliveryTime: "30分钟送达",
				isAnonymous: 0,
				label: "",
				praiseDish: "",
				score: 5,
				shopReply: "商家回复(6天后):看到好评的那一刻我感动了，因为您的肯定是对我们最大的支持与信任。为了达到您的更高要求，我们不断的改进自己，完善自己，这也是对我们可爱的顾客—您，最大的回报。古茗时刻会记得您对我们的支持，期待您的下次光临~~",
				userID: 2731913821,
				userName: "MHn114779291",
				userPicUrl: "https://img.meituan.net/avatar/316f7e9b20a879ba234a46e5acbcdca7191351.jpg",
			},
			{
				commentTime: "2020-10-06",
				content: "红豆太硬，芋圆没什么嚼劲，点的热的，但是不怎么热",
				deliveryTime: "43分钟送达",
				isAnonymous: 0,
				label: "",
				pictures: [],
				praiseDish: "",
				score: 3,
				shopReply: "商家回复(2天后):不好意思哦亲亲~没能给您带来良好的用户体验~小店保证用的食材都是精致优选的，绝对良心的哦！饮品在配送过程中由于时长原因送到手上可能会产生一定温差的哦，如果亲亲喜欢喝热一点儿的下次可以备注一下的哦!期待您的下次光临！",
				userID: 1516807090,
				userName: "乐园怪兽",
				userPicUrl: "",
			},
			{
				commentTime: "2020-09-02",
				content: "好喝这次活动很实惠der。#杨枝甘露轻盈版（大）#终于出大杯了！！！",
				deliveryTime: "35分钟送达",
				isAnonymous: 0,
				label: "",
				praiseDish: "杨枝甘露轻盈版（大）",
				score: 5,
				shopReply: "商家回复(3天后):看到好评的那一刻我感动了，因为您的肯定是对我们最大的支持与信任。为了达到您的更高要求，我们不断的改进自己，完善自己，这也是对我们可爱的顾客—您，最大的回报。古茗时刻会记得您对我们的支持，期待您的下次光临~~",
				userID: 1064073222,
				userName: "蕾蕾子ya",
				userPicUrl: "https://img.meituan.net/avatar/78ea1f5980c06cfaa4cfffcdd3ac62f0321586.jpg",
				pictures:[
					{
						bigPicUrl: "http://p0.meituan.net/wmcomment/ab6ebaa93145815fa4ff84d2c212166c174073.jpg@330w_330h_1e_1c",
						originalPicUrl: "http://p0.meituan.net/wmcomment/ab6ebaa93145815fa4ff84d2c212166c174073.jpg",
						smallPicUrl: "http://p0.meituan.net/wmcomment/ab6ebaa93145815fa4ff84d2c212166c174073.jpg@160w_160h_1e_1c",
					}
				]
			},
			{
				commentTime: "2020-09-06",
				content: "说了少冰 冰还超级多#杨枝甘露轻盈版（大）#也没有整杯",
				deliveryTime: "33分钟送达",
				isAnonymous: 1,
				label: "",
				praiseDish: "",
				score: 1,
				shopReply: "商家回复(2天后):实在非常非常抱歉，未能给您带来满意的用餐体验，因为平台这边是没办法看到您的联系方式如果您不主动联系我们，我们也不能第一时间给你反馈道歉呢，真的非常非常抱歉，下次遇到让您不满意的问题请一定要第一时间拨打我们店铺电话，我们会立马给你妥善满意的解决方案，如果您看到这条信息也可以拨打这个电话或者微信：13372411038  追求品质的情况下服务一直是我们的宗旨，我们也会加强内部员工培训不断完善大家的用餐体验，在此代表全体员工给您表示歉意，也希望您能包涵体量，千万不要影响自己的心情，记得每天都要开心哦，期待您的下次光临！古茗十年感谢有你🙏🙏🙏",
				userID: 0,
				userName: "匿名用户",
				userPicUrl: "",
				pictures:[
					{
						bigPicUrl: "http://p0.meituan.net/wmcomment/e621236420a643e0799049a9d16b383269601.jpg@330w_330h_1e_1c",
						originalPicUrl: "http://p0.meituan.net/wmcomment/e621236420a643e0799049a9d16b383269601.jpg",
						smallPicUrl: "http://p0.meituan.net/wmcomment/e621236420a643e0799049a9d16b383269601.jpg@160w_160h_1e_1c",

					}
				]
			},
			{
				commentTime: "2020-09-04",
				content: "#芝士多肉桃桃（大）# #芝士多肉葡萄（大）#被安利的古茗，绝了，不愧是热销榜首的，爆浆太有感觉了、超级好喝，以后就和古茗了。棒棒哒",
				deliveryTime: "31分钟送达",
				isAnonymous: 1,
				label: "礼貌热情,快速准时,货品完好",
				praiseDish: "芝士多肉桃桃（大）,芝士多肉葡萄（大）",
				score: 5,
				shopReply: "商家回复(1天后):看到好评的那一刻我感动了，因为您的肯定是对我们最大的支持与信任。为了达到您的更高要求，我们不断的改进自己，完善自己，这也是对我们可爱的顾客—您，最大的回报。古茗时刻会记得您对我们的支持，期待您的下次光临~~",
				userID: 0,
				userName: "匿名用户",
				userPicUrl: "",
			},
			{
				commentTime: "2020-09-04",
				content: "明明写的少冰，结果一杯子三分之二都是大冰块。虽然外卖有折扣便宜，但是和店里质量差很多，店里是沙冰。这也太敷衍了，都是大冰块。古茗的杨枝甘露就此拜拜吧",
				deliveryTime: "22分钟送达",
				isAnonymous: 0,
				label: "礼貌热情,仪表整洁,风雨无阻,穿戴工服,货品完好,快速准时",
				praiseDish: "",
				score: 3,
				shopReply: "商家回复(1天后):亲亲你好~杨枝甘露轻盈版是新品，不是沙冰状态的哦，和之前的杨枝甘露椰奶版不太一样的哦！实在非常非常抱歉，未能给您带来满意的用餐体验，真的非常非常抱歉，下次遇到让您不满意的问题请一定要第一时间拨打我们店铺电话13372411038，我们会立马给你妥善满意的解决方案！",
				userID: 14468665,
				userName: "weimeiweiwo",
				userPicUrl: "https://img.meituan.net/avatar/05d414211b4c8a1e08c3fb467230109925560.jpg",
				pictures:[
					{
						bigPicUrl: "http://p0.meituan.net/wmcomment/352406fd242e0bc92fa08aa5068037cd45070.jpg@330w_330h_1e_1c",
						originalPicUrl: "http://p0.meituan.net/wmcomment/352406fd242e0bc92fa08aa5068037cd45070.jpg",
						smallPicUrl: "http://p0.meituan.net/wmcomment/352406fd242e0bc92fa08aa5068037cd45070.jpg@160w_160h_1e_1c",
					}
				]
			}
		]
	})
}

const merchant = (req,res)=>{
	res.send({
		brandMsg: "该商户为品牌商户",
		dpShopId: 0,
		invoiceMsg: "",
		invoiceSupport: 0,
		isBrand: 1,
		licencePics: [],
		mtWmPoiId: "1073631370228949",
		onlinePay: 1,
		overtimePaymentSupported: false,
		shopAddress: "浙江省温州市洞头区北岙街道人民路2号",
		shopEnvTitle: "商家环境",
		shopLat: 27834097,
		shopLng: 121152505,
		shopName: "古茗（十字路口店）",
		shopReviewTitle: "点评评价",
		shopStar: 48,
		sold: "0",
		tip: "欢迎来到古茗星球,本店电话:18705870833,如果您对我们的服务和订单有任何不满和建议，可以拨打门店电话进行反馈沟通哦（高峰期可能会占线，敬请理解）关注古茗官方公主号：古茗茶饮，一起成为大茗星吧~",
		activityList:[
			{
				actDesc: "折扣商品7折起",
				actName: "",
				actType: 0,
				iconText: "",
				iconUrl: "http://p0.meituan.net/activityconfig/3da2d9c7a4ddf89e4e71cfdfff168c391088.png",
			},
			{
				actDesc: "满20元赠送五星带内容好评返3元券哦",
				actName: "",
				actType: 0,
				iconText: "",
				iconUrl: "http://p0.meituan.net/activityconfig/dfb8be4fc2eb746ecbc4c1485dba635a1127.png",
			},
			{
				actDesc: "该商家支持在线支付",
				actName: "",
				actType: 0,
				iconText: "",
				iconUrl: "http://p1.meituan.net/xianfu/32200c3060be7903f62c9076308619ee734.png",
			}
		],
		poiQualificationInfo:{
			content: "查看食品安全档案",
			show: true,
			url: "https://i.waimai.meituan.com/c/foods_safe_doc/index.html?wm_poi_id=1073631370228949",
		},
		
	})
}
module.exports = {
	send_verification,
	login,
	Filter_dropdown,
	Filter_screen,
	discounts,
	consumption,
	milkytea,
	comment,
	merchant,
	getusers,
	addaddress,
	updateaddress,
	removeaddress,
	addorder,
}


