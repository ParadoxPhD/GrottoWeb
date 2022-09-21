const db = require('./db');
const emailer = ('./email');
const bcrypt = require('bcryptjs');

function add(args)
{
	var displayName = "";
	var userName = args.userName;
	var password = args.password;
	var email = args.email;
	var verify = 0;
	
	//need to hash+salt password here
	//const cookedpswd = hash(password);
	const cookedpswd = "test37";
	//console.log(cookedpswd); //fucked
	//also nonce because it's convenient to do it here
	var verifyNonce = nonce();
	//send sql request to add user
	const result = db.usersRun("insert into users (displayName, userName, password, email, nonce, verify) VALUES (@displayName, @userName, @cookedpswd, @email, @verifyNonce, @verify)", {displayName, userName, cookedpswd, email, verifyNonce, verify});
	//send user email for verification, include nonce
	var subject = 'Your Grotto account creation';
	var text = `Go here and enter ${verifyNonce} to verify your account.`; //TODO: add link
	console.log("service sending email");
	emailer.send(email, subject, text);
}

function nonce()
{
    var S4 = function()
	{
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
	var nonce = S4()+S4()+S4()+S4();
    return (parseInt(nonce));
}

function hash(password)
{
	var hashedPassword;
	
	// Encryption of the string password
	bcrypt.genSalt(10, function (err, Salt)
	{
		// The bcrypt is used for encrypting password.
		bcrypt.hash(password, Salt, function (err, hash)
		{
  
			if (err)
			{ return console.log('Cannot encrypt'); }
  
			hashedPassword = hash;
			console.log(hash);
			return hash;
		})
	})
}

module.exports = { add: add };