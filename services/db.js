const sqlite = require('better-sqlite3');
const path = require('path');
const db = new sqlite(path.resolve('posts.db'), {fileMustExist: true});
const usersdb = new sqlite(path.resolve('users.db'), {fileMustExist: true});

function query(sql, params) {
	var posts = db.prepare(sql).all(params);
	return posts;
}

function run(sql, params) {
	return db.prepare(sql).run(params);
}

function usersRun(sql, params) {
	return usersdb.prepare(sql).run(params);
}

module.exports = {
  query: query,
  run: run,
  usersRun: usersRun
};