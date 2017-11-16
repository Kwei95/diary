const BaseDAO = require('./BaseDAO');

function DiaryDAO(){
	var dao = new BaseDAO();
	
	/**
	 * 按日志类别
	 * @param {Function} callback	回调函数
	 */
	this.listByCategory = function(callback){
		var sql = 'SELECT dt.diaryTypeId AS diaryTypeId, dt.typeName AS name, COUNT(d.diaryId) AS num FROM t_diarytype dt LEFT JOIN t_diary d ON dt.diaryTypeId=d.typeId GROUP BY dt.typeName, d.typeId';
		dao.query(sql, callback);
	};
	
	/**
	 * 按日志日期
	 * @param {Function} callback	回调函数
	 */
	this.listByMonth = function(callback){
		var sql = "SELECT DATE_FORMAT(releaseDate, '%Y年%m月') AS rd, COUNT(diaryId) AS num FROM t_diary GROUP BY rd ORDER BY releaseDate DESC";
		dao.query(sql, callback);
	};
	
	/**
	 * 获取日志列表
	 * @param {int} start			开始位置
	 * @param {l=int} limit			每页最大记录数
	 * @param {callback} callback	回调函数
	 */
	this.listDiary = function(start, limit, callback){
		//dao.findAll('t_diary', start, limit, callback);
		var sql = 'SELECT * FROM t_diary ORDER BY releaseDate DESC LIMIT ' + start + ', ' + limit;
		dao.query(sql, callback);
	}
	
	/**
	 * 最大页码
	 * @param {l=int} limit			每页最大记录数
	 * @param {callback} callback	回调函数
	 */
	this.maxPages = function(limit, callback){
		var sql = 'SELECT CEIL(COUNT(diaryId)/'+limit+') AS pages FROM t_diary';
		dao.query(sql, callback);
	}
	
	
	/**
	 * 根据ID查日志
	 * @param {int} id			需要查找的ID 
	 * @param {callback} callback	回调函数
	 */
	this.findDiaryById = function(id,callback){
//		dao.findBy('t_diary', {"diaryId":id}, callback);
		var sql="select d.diaryId diaryId,d.title title,d.content content,d.releaseDate releaseDate,dt.typeName typeName from t_diary d left join t_diarytype dt on d.typeId=dt.diaryTypeId where d.diaryId="+id;
		dao.query(sql,callback);
	}
	
	this.deleteDiaryById = function(id,callback){
		dao.delete('t_diary',{"diaryId":id},callback);
	}
	
	this.updateDiary = function(obj,callback){
		dao.update('t_diary',{"title":obj['title'],"content":obj['content'],"typeId":obj['typeId'],"releaseDate":new Date()},{"diaryId":obj['diaryId']},callback)
	}
	
	this.saveDiary = function(obj,callback){
		dao.save('t_diary',{"title":obj['title'],"content":obj['content'],"typeId":obj['typeId'],"releaseDate":new Date()},callback)
	}
}

module.exports = DiaryDAO;