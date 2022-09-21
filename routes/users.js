const express = require('express');
const router = express.Router();
const users = require('../services/users');

router.post('/', function(req,res,next)
{
	try
	{
		console.log("router posting email");
		res.json(users.add(req.body));
	}
	catch (err)
	{
		console.error(`Error while adding user `, err.message);
		next(err);
	}
});

module.exports = router;