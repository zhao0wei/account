var express = require('express');
var router = express.Router();

//导入lowdb数据库模块
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync(__dirname+'/../data/db.json')
const db = low(adapter)

//导入shortid 模块
const shortid=require("shortid")


//记账本列表
router.get('/account', function(req, res, next) {
  let accounts=db.get("accounts").value();
  console.log(accounts.id)
  res.render("account",{accounts:accounts});
});
 
//添加记录
router.get('/account/create', function(req, res, next) {
  res.render("add");
});

router.post("/add",(req,res,next)=>{
  //console.log(req.body);
  let id=shortid.generate();
  console.log(id);

  //向db数据库写入 req.body响应的数据
    db.get("accounts").unshift({"id":id,...req.body}).write();
  
  
  //db.get("accounts").push(req.body).write();
  res.render("success",{msg:"提交成功",url:"/account"})
})

//按id删除记录
router.get('/account/:id',(req,res)=>{
  //获取params的id参数
  let id=req.params.id ;
  //删除
  db.get("accounts").remove({id:id}).write();
  //提醒
  res.render("success",{msg:"删除成功", url: "/account"})


})

module.exports = router;
