/**
 * 处理日记的
 */

const express = require('express');
const router = express.Router();
const DiaryDAO = require('../my_modules/DiaryDAO');
const diaryDao = new DiaryDAO();
/**
 * 添加日志
 */
router.get('/new', function(req, res){
	req.data['status'] = 'new';
	req.data['diary'] = {'title':'','content':'','diary':''};
	res.render('diary_save', req.data);
});

/**
 * 删除日志
 */

router.get('/delete',function(req,res){
	var diaryId = req.query.diaryId;
//	res.send(diaryId);
	diaryDao.deleteDiaryById(diaryId,function(err){
		if(err) throw err;
//		if(err){
//			res.send(err);
//		}
		res.redirect('/main/home');
	})
	
})

/**
 * 修改日志
 */
router.get('/edit',function(req,res){
	var diaryId = req.query.diaryId;
	diaryDao.findDiaryById(diaryId,function(err,rows){
		if(err) throw err;
//		console.log(rows);
		req.data['status'] = 'edit';
		req.data['diary']=rows[0];
		res.render('diary_save',req.data);
	})
})

/**
 * 更新日志
 */
router.post('/update',function(req,res){
	diaryDao.updateDiary(req.body,function(err){
		if(err) throw err;
		
		res.redirect('/main/home')
	})
})
/**
 * 新增日志
 */
router.post('/save',function(req,res){
	diaryDao.saveDiary(req.body,function(err){
		if(err) throw err;
		
		res.redirect('/main/home')
	})
})
module.exports = router;