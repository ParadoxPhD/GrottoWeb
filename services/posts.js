const db = require('../services/db');
//const config = require('../config');

//replace hardcoded sql statement w/variable??
//or just have multiple functions with hardcoded sql statements
function getMultiple(arg) {
	//arg = requested oldest timestamp
	const data = db.query("select * from posts where timestamp >= @arg order by timestamp desc;", {arg});
	
	return data;
}

function create(postObj) {
	const {content, username} = postObj;
	const result = db.run('INSERT INTO posts (username, content) VALUES (@username, @content)', {username, content});
	
	let message = 'Error in creating post';
	if (result.changes)
	{ message = 'Post created successfully'; }

	return {message};
}

function dateComponentPad(value) {
  var format = String(value);

  return format.length < 2 ? '0' + format : format;
}

function formatDate(date) {
  var datePart = [ date.getFullYear(), date.getMonth() + 1, date.getDate() ].map(dateComponentPad);
  var timePart = [ date.getHours(), date.getMinutes(), date.getSeconds() ].map(dateComponentPad);

  return datePart.join('-') + ' ' + timePart.join(':');
}

module.exports = {
  getMultiple: getMultiple,
  create: create
};