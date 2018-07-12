
const mysql = require("mysql");

const config = {
    host: 'localhost',
    port: 3306,
    user: 'researchWalker',
    password: '123456',
    database: 'researchDatabase',
    charset: 'UTF8_GENERAL_CI',
    debug: false
}
function connectStart() {
    var connection = mysql.createConnection(config);
    connection.connect();
    return connection;
}
function connectClose(connection) {
    connection.end();
}


let CheckLogin = {
    //这是一个JSON对象，用以检查登陆是否合法
    checkAdmin: function (work_id, passwd) {
        let admin_promise = new Promise(function (resolve, reject) {
            let connection = connectStart();
            connection.query('CALL checkAdmin(\'' + work_id + '\',\'' + passwd + '\',' + '@out);', function (err, rows, fields) {
                if (err) {
                    reject(err);
                    throw err;
                }
                var results = rows[0];
                var row = results[0];
                console.log(row.isAdmin ? 'true is admin' : 'false, it\'s not a admin');
                resolve(row.isAdmin);
                connectClose(connection);
            });
        })
        return admin_promise;
    },

    checkGeneralUser: function (work_id, passwd) {
        let query_promise = new Promise(function (resolve, reject) {
            let connection = connectStart();
            connection.query('CALL checkGeneralUser(\'' + work_id + '\',\'' + passwd + '\',' + '@out);', function (err, rows, fields) {
                if (err) {
                    reject(err);
                    throw err;
                }
                var results = rows[0];
                var row = results[0];
                console.log(row.isValidUser ? 'true is a user' : 'false, it\'s not a user');
                //这里返回数据，进行resolv
                resolve(row.isValidUser);
                connectClose(connection);
            });
        });
        return query_promise;
    },
    //总共有四种类型的用户--研究院， 秘书， 研究人员，公司, 工作场所
    //一，admin用户请求添加一个研究院
    //流程：先向user中添加一个研究院的ID，然后再将这个ID与研究院的其他信息添加进研究院表，其中userID作为研究院的主码
    adminAddWorkPlace: function(user_type, area, place_address, graduate_institute_id){
        let add_promise = new Promise(function(resolve, reject){
            let connection = connectStart();
            connection.query("CALL adminAddWorkPlace('"+user_type+"',"+area+",'"+place_address+"','"+graduate_institute_id+"');",function(err, rows, fields){
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    resolve("success store");
                    connectClose(connection);
                }
            });
        });
        return add_promise;
    },
    adminAddInstitute: function(user_type, institute_name ,info, secretary_id) {
        let add_promise = new Promise(function(resolve, reject){
            let connection = connectStart();
            connection.query("CALL adminAddInstitute('"+user_type+"','"+institute_name+"','"+info+"','"+secretary_id+"');",function(err, rows, fields){
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    resolve("success store");
                    connectClose(connection);
                }
            });
        });
        return add_promise;
    },
    adminAddSecretary: function(user_type, secretary_name, gender, age, employee_time, employee_responsibility){
        let add_promise = new Promise(function(resolve, reject){
            let connection = connectStart();
            connection.query("CALL adminAddSecretary('"+user_type+"','"+secretary_name+"',"+gender+","+age+",'"+employee_time+"','"+employee_responsibility+"');",function(err, rows, fields){
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    resolve("success store");
                    connectClose(connection);
                }
            });
        });
        return add_promise;
    },
    adminAddResearchPeople: function(user_type, research_people_name, gender, age, job_title, research_direction, graduate_institute_id){
        let add_promise = new Promise(function(resolve, reject){
            let connection = connectStart();
            connection.query("CALL adminAddResearchPeople('"+user_type+"','"+research_people_name+"',"+gender+","+age+",'"+job_title+"','"+research_direction+"','"+graduate_institute_id+"');",function(err, rows, fields){
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    resolve("success add research people");
                    connectClose(connection);
                }
            });
        });
        return add_promise;
    },
    adminAddCompany: function(user_type, company_name, company_address) {
        let add_promise = new Promise(function(resolve, reject){
            let connection = connectStart();
            connection.query("CALL  adminAddCompany('"+user_type+"','"+company_name+"','"+company_address+"');",function(err, rows, fields){
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    resolve("success add company");
                    connectClose(connection);
                }
            });
        });
        return add_promise;
    },
    adminDeleteUser: function(work_id) {
        let delete_promise = new Promise(function(resolve, reject){
            let connection = connectStart();
            connection.query("CALL deleteUser('"+work_id+"');",function(err, rows, fields){
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    resolve("success delete user");
                    connectClose(connection);
                }
            })
        });
        return delete_promise;
    },
    //下面应该是组合几个请求的流程， 例如添加一个项目是会涉及到几张表的插入与更改的
    //1、添加一个项目-->添加合作方与委托方与监管方-->添加联系人与负责人-->子课题-->科研人员参加科研的联系表
    //2、添加一个科研成果-->添加贡献者表，这里面还有一些业务规则
    adminAddProject: function(sql_statement){
        let add_promise = new Promise(function(resolve, reject){
            let connection =  connectStart();
            connection.query(sql_statement, function(err, rows, fields){
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    var results = rows[0];
                    var row = results[0];
                    resolve(row.out_project_id);
                    connectClose(connection);
                }
            });
        });
        return add_promise;
    },
    adminAddAchievement: function(sql_statement){
        let add_promise = new Promise(function(resolve, reject){
            let connection =  connectStart();
            connection.query(sql_statement, function(err, rows, fields){
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    var results = rows[0];
                    var row = results[0];
                    resolve(row.out_achievement_id);
                   // resolve("success delete user");
                    connectClose(connection);
                }
            });
        });
        return add_promise;
    },
    adminAddSql: function(sql_statement) {
        let add_promise = new Promise(function(resolve, reject){
            let connection =  connectStart();
            connection.query(sql_statement, function(err, rows, fields){
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    resolve("success !!!");
                    connectClose(connection);
                }
            });
        });
        return add_promise;
    }
}



module.exports = CheckLogin;