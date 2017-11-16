/**
 * 设置的路由
 */

const express = require('express');
const formidable = require('formidable');
const fs = require('fs');

const router = express.Router();
const UserDAO = require('../my_modules/UserDAO');
const userDao = new UserDAO();
/**
 * 显示首页主界面
 */
router.get('/home', function(req, res){
	res.render('setting', req.data);
});


router.post('/save',function(req,res){
	var form = new formidable.IncomingForm();
	form.uploadDir = './public/faces';
	form.keepExtensions = true;
	
	form.parse(req,function(err,fields,files){
		var data = {nickName:fields.nickName,mood:fields.mood};

		var path = files.imagePath.path.substring(13);
		if(path.endsWith('.jpg')||path.endsWith('png')){
			data['imageName'] = path;
		}else{
			//如果文件不是以jpg或png结尾则删除文件
			fs.unlink(files.imagePath.path);
		}
		var user=req.session.user;
		userDao.updateUser(data,{userId:req.session.user.userId},function(err){
			user['nickName'] = data.nickName;
			user['mood'] = data.mood;
			if(data.imageName !=undefined){
				user['imageName'] = data.imageName;
			}
			req.session.user= user;
			res.redirect('/setting/home');
		})
		
	})
})
module.exports = router;