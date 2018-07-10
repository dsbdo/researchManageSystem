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
    adminAddWorkPlace: function(area, place_address, graduate_institute_id){
        let add_promise = new Promise(function(resolve, reject){
            let connection = connectStart();
            connection.query(/*sql statement*/,function(err, rows, fields){

            });
        });
        return add_promise;
    },
    adminAddInstitute: function(info, secretary_id) {
        let add_promise = new Promise(function(resolve, reject){
            let connection = connectStart();
            connection.query(/*sql statement*/,function(err, rows, fields){

            });
        });
        return add_promise;
    },
    adminAddSecretary: function(secretary_name, gender, age, employee_time, employee_responsibility){
        let add_promise = new Promise(function(resolve, reject){
            let connection = connectStart();
            connection.query(/*sql statement*/,function(err, rows, fields){

            });
        });
        return add_promise;
    },
    adminAddResearchPeople: function(research_people_name, gender, age, job_title, research_direction, graduate_institute_id){
        let add_promise = new Promise(function(resolve, reject){
            let connection = connectStart();
            connection.query(/*sql statement*/,function(err, rows, fields){

            });
        });
        return add_promise;
    },
    adminAddCompany: function(company_name, company_address) {
        let add_promise = new Promise(function(resolve, reject){
            let connection = connectStart();
            connection.query(/*sql statement*/,function(err, rows, fields){

            });
        });
        return add_promise;
    },

}



module.exports = CheckLogin;