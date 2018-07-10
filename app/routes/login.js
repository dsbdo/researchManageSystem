var express = require('express');
var router = express.Router();
const CheckLogin = require("./../datBaseModule/CheckLogin.js");

/* GET home page. */
router.post('/admin', function (req, res, next) {
    //登录必定是带着work_id, 64位用户密码进来进行校验
    //scutAdmin123456
    //第一检查是否是admin登陆
    if (!req.body.work_id) {
        res.status(500).json({
            result: "error",
            reason: "empty work_id"
        });
    }
    // if (!req.body.admin_name) {
    //     res.status(500).json({
    //         result: "error",
    //         reason: "empty admin_name"
    //     });
    // }
    if (!req.body.passwd || req.body.passwd.length !== 64) {
        //如果密码为空，或者不是64位，证明这就已经是一个错误的密码了
        res.status(500).json({
            result: "error",
            reason: "invalid passwd"
        });
    }
    //调用数据库进行校验
    let admin_promise = CheckLogin.checkAdmin(req.body.work_id,  req.body.passwd);
    admin_promise.then(function(isAdmin){
        if (isAdmin) {
            //确认是admin用户
            res.send("it's a admin");
        } else {
            //不是admin用户
            //这里应该返回重新登陆的界面
            res.send("it's not a admin")
        }
    });
 
   
});

router.post("/generalUser", function(req, res, next){
    console.log("/generalUser/login")
    if (!req.body.work_id) {
        res.status(500).json({
            result: "error",
            reason: "empty work_id"
        });
    }
    if (!req.body.passwd || req.body.passwd.length !== 64) {
        //如果密码为空，或者不是64位，证明这就已经是一个错误的密码了
        res.status(500).json({
            result: "error",
            reason: "invalid passwd"
        });
    }
    console.log(req.body.work_id);
    console.log(req.body.passwd);
    let query_promise = CheckLogin.checkGeneralUser(req.body.work_id, req.body.passwd);
    //console.log(isVaildUser);
    //如何处理错误返回
    query_promise.then(function(is_valid_user){
        if(is_valid_user) {
            res.send("success");
        } else {
            res.send("error");
        }
    })

});

module.exports = router;