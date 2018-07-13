var express = require('express');
var router = express.Router();
const path = require('path');
const CheckLogin = require('./../datBaseModule/CheckLogin.js');
/* GET users listing. */
router.get('/addInstitute', function(req, res, next) {
console.log(__dirname);
 let file_position = path.resolve('./public/html/addInstitute.html')
  res.sendFile(file_position);
});
router.get('/addSecretary', function(req,res,next){
    let file_position = path.resolve('./public/html/addSecretary.html');
    res.sendFile(file_position);
});
router.get("/addWorkPlace", function(req,res, next){
    let file_position = path.resolve('./public/html/addWorkPlace.html');
    res.sendFile(file_position);
});
router.get('/addResearchPeople', function(req, res, next){
    let file_position = path.resolve('./public/html/addResearchPeople.html');
    res.sendFile(file_position);
});

router.get('/addProject', function(req, res, next){
    let file_position = path.resolve('./public/html/addProject.html');
    res.sendFile(file_position);
});

router.get("/addAchievement", function(req, res, next){
    let file_position = path.resolve('./public/html/addAchievement.html');
    res.sendFile(file_position);
});

router.get("/addInstituteDirector", function(req, res, next){
    let file_position = path.resolve('./public/html/addInstituteDirector.html');
    res.sendFile(file_position);
});

//获取研究机构相关信息
router.get("/getInstitute", function(req, res, next){
    let sql_statement = "CALL adminGetInstituteListInfo()";
    let get_promise = CheckLogin.adminGetSql(sql_statement);
    get_promise.then(function(message){
        res.send(message);
    });
});

//获取办公场地表
router.get("/getWorkPlace", function(req, res, next){

    let sql_statement = "CALL adminGetWorkPlaceTable()";
    let get_promise = CheckLogin.adminGetSql(sql_statement);
    get_promise.then(function(message){
        res.send(message);
    });
});
//获取秘书相关信息
router.get("/getSecretay", function(req, res, next){
    let sql_statement = "CALL adminGetSectasryTable ()";
    let get_promise = CheckLogin.adminGetSql(sql_statement);
    get_promise.then(function(message){
        res.send(message);
    });
});

//获取研究室主任表
router.get("/getInstituteDirector", function(req, res, next){
    let sql_statement = "CALL adminGetInstituteDirectorTable ()";
    let get_promise = CheckLogin.adminGetSql(sql_statement);
    get_promise.then(function(message){
        res.send(message);
    });
});

//获取科研人员概况
router.get("/getResearchPeople", function(req, res, next){
    let sql_statement = "CALL adminGetResearchPeopleTable()";
    let get_promise = CheckLogin.adminGetSql(sql_statement);
    get_promise.then(function(message){
        res.send(message);
    });
});

//获取科研项目表
router.get("/getProject", function(req, res, next){
    let sql_statement = "CALL adminGetResearchProjectTable()";
    let get_promise = CheckLogin.adminGetSql(sql_statement);
    get_promise.then(function(message){
        res.send(message);
    });
});

//获取科研成果表
router.get("/getAchievement", function(req, res, next){
    let sql_statement = "CALL adminGetAchievementTable()";
    let get_promise = CheckLogin.adminGetSql(sql_statement);
    get_promise.then(function(message){
        res.send(message);
    });
})
module.exports = router;
