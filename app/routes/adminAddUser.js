var express = require('express');
var router = express.Router();
const CheckLogin = require("./../datBaseModule/CheckLogin.js");
/* GET home page. */
router.post('/addSecretary', function(req, res, next) {
    if (!req.body.secretary_name) {
        res.status(500).json({
            result: "error",
            reason: "empty work_id"
        });
    }
    if (!req.body.gender) {
        res.status(500).json({
            result: "error",
            reason: "empty work_id"
        });
    }
    if (!req.body.age) {
        res.status(500).json({
            result: "error",
            reason: "empty work_id"
        });
    }
    if (!req.body.employee_time) {
        res.status(500).json({
            result: "error",
            reason: "empty work_id"
        });
    }
    if (!req.body.employee_responsibility) {
        res.status(500).json({
            result: "error",
            reason: "empty work_id"
        });
    }
    let add_promise = CheckLogin.adminAddSecretary('test', req.body.secretary_name, req.body.gender, req.body.age, req.body.employee_time, req.body.employee_responsibility);
    add_promise.then(function(message) {
        res.send(message);
    });
});
router.post('/addWorkPlace', function(req, res, next) {
    if (!req.body.area) {
        res.status(500).json({
            result: "error",
            reason: "empty area"
        });
    }
    if (!req.body.place_address) {
        res.status(500).json({
            result: "error",
            reason: "empty place_address"
        });
    }
    if (!req.body.graduate_institute_id) {
        res.status(500).json({
            result: "error",
            reason: "empty graduate_institute_id"
        });
    }
    let add_promise = CheckLogin.adminAddWorkPlace('test', req.body.area, req.body.place_address, req.body.graduate_institute_id);
    add_promise.then(function(message){
        res.send(message);
    })
    
});
router.post('/addCompany', function(req, res, next) {
    if (!req.body.company_name) {
        res.status(500).json({
            result: "error",
            reason: "empty company_name"
        });
    }
    if (!req.body.company_address) {
        res.status(500).json({
            result: "error",
            reason: "empty company_address)"
        });
    }
    let add_promise = CheckLogin.adminAddCompany('test', req.body.company_name, req.body.company_address);
    add_promise.then(function(message){
        res.send(message);
    });
});
router.post('/addInstitute', function(req, res, next) {
    if (!req.body.info) {
        res.status(500).json({
            result: "error",
            reason: "empty info"
        });
    }
    if (!req.body.secretary_id) {
        res.status(500).json({
            result: "error",
            reason: "empty secretary_id"
        });
    }
    let add_promise = CheckLogin.adminAddInstitute('test', req.body.info, req.body.secretary_id);
    add_promise.then(function(message){
        res.send(message);
    })
});
router.post('/addResearchPeople', function(req, res, next) {
    if (!req.body.research_people_name) {
        res.status(500).json({
            result: "error",
            reason: "empty research_people_name"
        });
    }
    if (!req.body.gender) {
        res.status(500).json({
            result: "error",
            reason: "empty gender"
        });
    }
    if (!req.body.age) {
        res.status(500).json({
            result: "error",
            reason: "empty age"
        });
    }
    if (!req.body.job_title) {
        res.status(500).json({
            result: "error",
            reason: "empty job_title"
        });
    }
    if (!req.body.research_direction) {
        res.status(500).json({
            result: "error",
            reason: "empty research_direction"
        });
    }
    if (!req.body.graduate_institute_id) {
        res.status(500).json({
            result: "error",
            reason: "empty graduate_institute_id"
        });
    }
    let add_promise = CheckLogin.adminAddResearchPeople('test',req.body.research_people_name, req.body.gender, req.body.age, req.body.job_title, req.body.research_direction, req.body.graduate_institute_id);
    add_promise.then(function(message){
        res.send(message);
    })
});
module.exports = router;