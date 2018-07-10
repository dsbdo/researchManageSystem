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

router.post('/addAchievement', function(req,res, next){
    if(!req.body.achievement_name || !req.body.get_time || !req.body.rank || !req.body.project_id || !req.body.type || !req.body.info || !req.body.patent_type) {
        res.status('500').send("error in paras");
    }
    let sql_statement = "CALL adminAddAchievement('"+req.body.achievement_name+"','" +req.body.get_time+"',"+ req.body.rank + ",'" + req.body.project_id+ "','" + req.body.type+ "','"+req.body.info+ "','"+ req.body.patent_type +"');";
    let add_promise = CheckLogin.adminAddSql(sql_statement);
    add_promise.then(function(message){
        res.send(message);
    })
});
module.exports = router;
