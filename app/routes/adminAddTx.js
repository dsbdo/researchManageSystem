var express = require('express');
var router = express.Router();
const CheckLogin = require('./../datBaseModule/CheckLogin.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// router.post('/addProject', function(req, res, next){
//     if(!req.body.principal_people_id || !req.body.project_name || !req.body.research_content || !req.body.funding || !req.body.start_time || !req.body.finish_time) {
//         res.status('500').send("error in paras");
//     }
//    let add_promise =  CheckLogin.adminAddProject(req.body.principal_people_id, req.body.project_name, req.body.research_content, req.body.funding, req.body.start_time, req.body.finish_time);
//    add_promise.then(function(message){
//        res.send(message);
//    })
// });


//这里可以添加一个项目，项目参与人应该是后面慢慢添加进来的
router.post('/addProject', function(req, res, next){
    if(!req.body.principal_funding || !req.body.project_workload || !req.body.principal_people_id || !req.body.project_name || !req.body.research_content || !req.body.total_funding || !req.body.start_time || !req.body.finish_time) {
        res.status('500').send("error in paras");
    }
    else {
        //还需要把负责人添加到科研参与表中去
      //  "CALL adminAddResearchProject('"+principal_id+"','"+project_name+"','"+research_content+"'," + funding + ",'"+start_time+"','"+finish_time+"');"
        let sql_statement = "CALL adminAddResearchProject('"+req.body.principal_people_id+"','" +req.body.project_name+"','"+ req.body.research_content + "'," + req.body.total_funding + ",'" + req.body.start_time+ "','"+req.body.finish_time+"',@out);";
        let add_promise = CheckLogin.adminAddProject(sql_statement);
        add_promise.then(function(project_id){

            sql_statement = "CALL adminAddProjectPeopleList('"+req.body.principal_people_id +"','" +project_id+"','"+ req.body.start_time + "'," + req.body.principal_funding + "," + req.body.project_workload +");";
            add_promise = CheckLogin.adminAddSql(sql_statement);
            add_promise.then(function(message){
                res.send(message);
            });
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
        console.log("principal people list");
        console.log(req.body.contract_id_array);
        console.log(req.body.contract_id_array[0]);
        console.log(req.body.contract_id_array[1]);
        for(let i = 0; i < req.body.contract_id_array.length; i++) {
            console.log("req.body.contract_id_array[i]", req.body.contract_id_array[i]);
            let sql_statement = "CALL adminAddPrincipalList("+req.body.project_id + ",'" + req.body.company_id + "'," + req.body.contract_id_array[i] + "," +req.body.principal_id + ");";
            let add_promise = CheckLogin.adminAddSql(sql_statement);
            add_promise_array.push(add_promise);
        }
        Promise.all(add_promise_array).then(function(message){
            res.send("success");
        });
    }
    else if(req.body.type == "supervision") {
        let add_promise_array = [];
        for(let i = 0; i < req.body.contract_id_array.length; i++) {
            let sql_statement = "CALL adminAddSupervisionList("+req.body.project_id + ",'" + req.body.company_id + "'," + req.body.contract_id_array[i] + "," +req.body.principal_id + ");";
            let add_promise = CheckLogin.adminAddSql(sql_statement);
            add_promise_array.push(add_promise);
        }
        Promise.all(add_promise_array).then(function(message){
            res.send("success");
        });
    }

});

router.post('/addParterList', function(req, res, next){
    //传进来应该是一个数组的JSON对象
    if(!req.body.parter_array) {
        res.status('500').send("error in paras");
    }
    else {
        for(let i = 0; i < req.body.parter_array.length; i++) {
            if(!req.body.parter_array[i].project_id || !req.body.parter_array[i].company_id || !req.body.parter_array[i].contract_id_array || !req.body.parter_array[i].principal_id) {
                res.status('500').send("error in paras");
            }
        }
        let add_promise_array = [];
        for(let j = 0; j < req.body.parter_array.length; j++) {
            for(let k = 0; k < req.body.parter_array[j].contract_id_array.length; k++) {
                let sql_statement = "CALL adminAddParterList("+req.body.parter_array[j].project_id + ",'" + req.body.parter_array[j].company_id + "'," + req.body.parter_array[j].contract_id_array[k] + "," +req.body.parter_array[j].principal_id + ");";
                let add_promise = CheckLogin.adminAddSql(sql_statement);
                add_promise_array.push(add_promise);
            }
        }
        Promise.all(add_promise_array).then(function(message){
            res.send("success");
        });
    }
})


//添加一个科研成果，贡献者应该是一起加起来的,科研成果ID， 项目ID， 研究人员ID
router.post('/addAchievement', function(req,res, next){
    //贡献者仅能是参与该项目的科研人员
    if(!req.body.contributor_array || !req.body.achievement_name || !req.body.get_time || !req.body.rank || !req.body.project_id || !req.body.type || !req.body.info || !req.body.patent_type) {
        res.status('500').send("error in paras");
    }
    let sql_statement = "CALL adminAddAchievement('"+req.body.achievement_name+"','" +req.body.get_time+"',"+ req.body.rank + ",'" + req.body.project_id+ "','" + req.body.type+ "','"+req.body.info+ "','"+ req.body.patent_type +"',@out);";
    let add_promise = CheckLogin.adminAddAchievement(sql_statement);
    add_promise.then(function(achievement_id){
        let add_promise_array = [];
        for(let i = 0; i < req.body.contributor_array.length; i++) {
            let sql_contributor_statement = "CALL adminAddAhievementContributor("+achievement_id+","+req.body.project_id+",'"+req.body.contributor_array[i]+"');";
            let add_contributor_promise = CheckLogin.adminAddSql(sql_contributor_statement);
            add_promise_array.push(add_contributor_promise);
        }
        Promise.all(add_promise_array).then(function(message){
            res.send(" add success!");
        })
    });
});
module.exports = router;