const DiaryDAO = require('../my_modules/DiaryDAO');
const Pagination = require('../my_modules/Pagination');

var diaryDao = new DiaryDAO();
var pagination = new Pagination();
var limit = 8;
/**
 * 主界面的路由
 */
const express = require('express');
const router = express.Router();

/**
 * 显示首页主界面
 */
router.get('/home', function(req, res){
	var page = req.query.page;
	// 保证当前不会小于或没有页码
	if (page == undefined || page < 1){
		page = 1;
	}
	
	diaryDao.maxPages(limit, function(err, rows){
		if (err) throw err;
		var pages = rows[0]['pages'];
		// 保证当前页不会大于最大页码
		if (page > pages){
			page = pages;
		}
		
		var start = (page - 1) * limit;
		
			diaryDao.listDiary(start, limit, function(err, rows){
			if (err) throw err;
			req.data['diaries'] = rows;
		
			pagination.show('/main/home?page=', page, pages, function(row){
				req.data['pagination'] = row;
				res.render('main', req.data);				
			});
		});
	});
});

//查看具体日志内容
router.get('/show',function(req,res){
	var diaryId	= req.query.diaryId;
	 
	diaryDao.findDiaryById(diaryId,function(err,rows){
		if (err) throw err;
		console.log(rows)
		req.data['diary'] = rows[0];
		res.render('diary_show',req.data);
	})
})


module.exports = router;