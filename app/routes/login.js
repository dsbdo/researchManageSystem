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
    if (!req.body.admin_name) {
        res.status(500).json({
            result: "error",
            reason: "empty admin_name"
        });
    }
    if (!req.body.passwd || req.body.passwd.length !== 64) {
        //如果密码为空，或者不是64位，证明这就已经是一个错误的密码了
        res.status(500).json({
            result: "error",
            reason: "invalid passwd"
        });
    }
    //调用数据库进行校验
    let isAdmin = CheckLogin.checkAdmin(req.body.work_id, req.body.admin_name, req.body.passwd);
    if ( isAdmin ) {
        //确认是admin用户
        res.render('index', { title: 'Express' });
    } else {
        //不是admin用户
    }
   
});

router.post("/generalUser", function(req, res, next){
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

    let isVaildUser = CheckLogin.checkGeneralUser(req.body.work_id, req.body.passwd);
    if(isVaildUser) {
        //有效用户
    } else {
        //用户校验失败
    }
});

module.exports = router;