require('../db');
var mongoose = require('mongoose'),
    config = require('../config').config,
    fs = require('fs'), //引用处理文件功能
    crypto = require('crypto'), //引用md5加密
    Util = require('../libs/util'),
    Scenic = mongoose.model('Scenic'),
    markdown = require('markdown').markdown;

//创建md5方法
function md5(str) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(str);
  str = md5sum.digest('hex');
  return str;
}

function arrRemoveTail(arr){
  var new_arr = [];
  for (var i = 0; i<arr.length - 1; i++){
    new_arr.push(arr[i]);
  };
  return new_arr;
}

exports.index = function(req, res){
  Scenic.count()
    .exec(function(err, count){
      Scenic.find()
        .skip(8*parseInt(req.query.p?req.query.p:0))
        .limit(8)
        .sort({ date: 'desc' })
        .exec(function(err, Scenics){
          res.render('index', {
            title: '景点列表',
            Scenics: Scenics,
            req: req,
            count: count
          });
        });
    });
};
exports.detail = function(req, res){
  Scenic.count()
    .exec(function(err, count){
      Scenic.find()
        .skip(8*parseInt(req.query.p?req.query.p:0))
        .limit(8)
        .sort({ date: 'desc' })
        .exec(function(err, Scenics){
          res.render('detail', {
            Scenics: Scenics
          });
        });
    });
};