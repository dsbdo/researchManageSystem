var express = require('express');
var router = express.Router();
const path = require('path');
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
})
module.exports = router;