const express = require('express');
const router = express.Router();
const posts = require('../services/posts');

/* GET quotes listing. */
router.get('/', function(req, res, next)
{
	var result = null;
	
	try
	{
		result = posts.getMultiple(req.query.arg);
		res.json(result);
	}
	catch(err)
	{
		console.error(`Error while getting posts `, err.message);
		next(err);
	}
});

router.post('/', function(req, res, next)
{
	try
	{
		console.log("trying post");
		res.json(posts.create(req.body));
	}
	catch(err)
	{
		console.error(`Error while adding posts `, err.message);
		next(err);
	}
});

module.exports = router;