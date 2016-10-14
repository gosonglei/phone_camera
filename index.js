var express = require('express');
var router = express.Router();

var fs = require('fs');

router.get('/phone_camera', function(req, res, next) {
  res.render('phone_camera', { title: 'phone_camera' });
});

router.post('/upimage',function(req,res){
  var bobo = req.body.obj;//获取前端页面传来的obj数据；
  var str = JSON.parse(bobo);
  console.log(str);
  dataToImage(str); //图片完整base64过长，所以省略...
  res.send("Y");
});

function dataToImage(dataUrl){
  var base64Data = dataUrl.replace(/^data:image\/\w+;base64,/,'');
  var dataBuffer = new Buffer(base64Data,'base64');
  fs.writeFile('out.jpg',dataBuffer,function(err){
    if(err){
      console.log(err);
    }else{
      console.log('Success...');
    }
  });
}


module.exports = router;
