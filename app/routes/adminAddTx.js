var express = require('express');
var router = express.Router();
const CheckLogin = require('./../datBaseModule/CheckLogin.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/addProject', function(req, res, next){
    if(!req.body.principal_people_id || !req.body.project_name || !req.body.research_content || !req.body.funding || !req.body.start_time || !req.body.finish_time) {
        res.status('500').send("error in paras");
    }
   let add_promise =  CheckLogin.adminAddProject(req.body.principal_people_id, req.body.project_name, req.body.research_content, req.body.funding, req.body.start_time, req.body.finish_time);
   add_promise.then(function(message){
       res.send(message);
   })
});


//这里可以添加一个项目，项目参与人应该是后面慢慢添加进来的
router.post('/addProject', function(req, res, next){
    if(!req.body.principal_people_id || !req.body.project_name || !req.body.research_content || !req.body.total_funding || !req.body.start_time || !req.body.finish_time) {
        res.status('500').send("error in paras");
    }
    else {
        let sql_statement = "CALL adminAddResearchProject('"+req.body.principal_people_id+"','" +req.body.project_name+"','"+ req.body.research_content + "'," + req.body.total_funding + ",'" + req.body.start_time+ "','"+req.body.finish_time+"');";
        let add_promise = CheckLogin.adminAddSql(sql_statement);
        add_promise.then(function(message){
            res.send(message);
        })
    }
});
//完善添加项目的科研人员
router.post('/addProjectResearchPeople', function(req, res, necxt){
    if(!req.body.research_people_id || !req.body.project_id || !req.body.join_time || !req.body.funding || !req.body.project_workload) {
        res.status('500').send("error in paras");
    }
    let sql_statement = "CALL adminAddProjectPeopleList('"+req.body.research_people_id +"','" +req.body.project_id+"','"+ req.body.join_time + "'," + req.body.funding+ "," + req.body.project_workload +");";
    let add_promise = CheckLogin.adminAddSql(sql_statement);
    add_promise.then(function(message){
        res.send(message);
    });
});
//添加合作方与委托方与监督方，这里面还会涉及到添加联系人与负责人，应该添加一个方就一张表单
//添加委托方与监督方{“type“："principal | supervision"，”project_id“, "company_id", "" }
//local_project_id, local_company_id, local_contract_id, local_principal_id
router.post('/addProjectPrinSuperCompany', function(req, res, next){
    if(!req.body.type) {
        res.status('500').send("error in paras");
    }
    if(!req.body.project_id || !req.body.company_id || !req.body.contract_id_array || !req.body.principal_id) {
        res.status('500').send("error in paras");
    }
    if(req.body.type == "principal"){
        let add_promise_array = [];
        for(let i = 0; i < req.body.contract_id_array.length; i++) {
            let sql_statement = "CALL adminAddPrincipalList('";
        }
    }
    else if(req.body.type == "supervision") {
        let add_promise_array = [];
        for(let i = 0; i < req.body.contract_id_array.length; i++) {
            let sql_statement = ""
        }
    }
 
});


//添加一个科研成果，贡献者应该是一起加起来的
router.post('/addAchievement', function(req,res, next){
    if(!req.body.achievement_name || !req.body.get_time || !req.body.rank || !req.body.project_id || !req.body.type || !req.body.info || !req.body.patent_type) {
        res.status('500').send("error in paras");
    }
    let sql_statement = "CALL adminAddAchievement('"+req.body.achievement_name+"','" +req.body.get_time+"',"+ req.body.rank + ",'" + req.body.project_id+ "','" + req.body.type+ "','"+req.body.info+ "','"+ req.body.patent_type +"');";
    let add_promise = CheckLogin.adminAddSql(sql_statement);
    add_promise.then(function(message){
        res.send(message);
    });
});
module.exports = router;
