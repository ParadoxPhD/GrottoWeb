var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'zirbrainiac@gmail.com',
    pass: '***'
  }
});

function send(recipient, subject_, text_)
{
	var mailOptions =
	{
		from: 'zirbrainiac@gmail.com',
		to: recipient,
		subject: subject_,
		text: text_;
	};
	
	console.log("emailer emailing?");
	transporter.sendMail(mailOptions, function(error, info)
	{
		if (error)
		{ console.log(error); }
		else
		{ console.log('Email sent: ' + info.response); }
	});
}

module.exports = { send: send };