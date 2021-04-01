const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost/eleDB",{useUnifiedTopology: true ,useNewUrlParser: true });
const db=mongoose.connection;

db.on("err",(err)=>{
	console.log("连接数据库失败");
});
db.once("open",()=>{
	console.log("连接数据库成功");
});


const userSchema=new mongoose.Schema({
	mail:{type:"string" , require:true , index:{unique:true} ,},
	address:{type:'Array'},
	orderlist:{type:'Array'},
})

//将一个集合相关的schema对象转为数据模型
const user=mongoose.model("users",userSchema);

module.exports=user;