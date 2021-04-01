const state = {
	address:{},
	// 综合排序
	ismasking:false,
	Filtertype:"全部",
	// 筛选
	isscreen:false,
	isrank:false,
	ischeckselect:false,
	// 暂存收货地址
	shippingaddress:'',
	// 传给  编辑地址 的消息 填充
	edittheaddress:null,
	title:'新增地址',
	shoppingdata:null,
	// 暂存结算中选中  需要渲染的收货地址
	Billingaddress:null,
	// 当前餐具份数
	currenttableware:0,
	// 当前订单的备注
	Theordernote:null,
	// 红包金额
	redpacket:null,
	// 当前要花费的钱
	currentconsumption:null,
	
}
 
const mutations = {
	//储存谷歌定位的地址
 	SAVEADDRESS(state,data){
		state.address = data
	},
	// 综合排序  遮罩层
	ISMASKING(state,data){
		state.ismasking = data
	},
	// 当前选中的类型
	CURRENTFILTERTYPE(state,data){
		state.Filtertype = data
	},
	// 筛选的  遮罩层
	ISSCREEN(state,data){
		state.isscreen = data
	},
	// 是否开启好评排序
	ISRANK(state,data){
		state.isrank = data
	},
	// 如果点击了selectfilmlist 中的搜索  就把   ischeckselect  变成 真
	ISCHECKSELECT(state,data){
		state.ischeckselect = data;
	},
	// 暂存收货地址
	SHIPPINGADDRESS(state,data){
		state.shippingaddress = data;
	},
	// 传给  编辑地址 的消息 填充
	EDITTHEADDRESS(state,data){
		state.edittheaddress = data;
	},
	// 公共topbar 的title
	TITLE(state,data){
		state.title = data;
	},
	// 购物车商品
	SHOPPINGDATA(state,data){
		state.shoppingdata = data;
	},
	// 暂存结算中选中  需要渲染的收货地址
	BILLINGADDRESS(state,data){
		state.Billingaddress = data;
	},
	// 当前餐具数量
	CURRENTTABLEWARE(state,data){
		state.currenttableware = data;
	},
	// 当前订单的备注
	THEORDERNOTE(state,data){
		state.Theordernote = data;
	},
	// 红包金额
	REDPACKET(state,data){
		state.redpacket = data;
	},
	// 当前消费
	CURRENTCONSUMPTION(state,data){
		state.currentconsumption = data;
	},
 }
  
  
module.exports = {
	namespaced:true,
	state,
	mutations
}
 
 
 
 
 
 
 
