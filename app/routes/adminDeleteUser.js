var express = require('express');
var router = express.Router();
const CheckLogin = require("./../datBaseModule/CheckLogin.js")
/* GET users listing. */
router.post('/deleteUser', function(req, res, next) {
    if(!req.body.work_id) {
        res.status(500).json({
            result: "error",
            reason: "empty work_id"
        });
    }
    let delete_promise = CheckLogin.adminDeleteUser(req.body.work_id);
    delete_promise.then(function(message){
        res.send(message);
    });
});

module.exports = router;