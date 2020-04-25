"use strict";

let express = require('express');
let router = express.Router();
let nodemailer = require('nodemailer');
let path = require('path');
let pugEngine = require('pug');
let render = pugEngine.compileFile(path.join(__dirname, '../views/contact_email.pug'));
import validate from 'validate.js';
import ContactFormConstraints from '../validations/contact_form';
require('dotenv').config();

router.use((req, res, next) => {
	res.locals.status = res.statusCode;
	next();
});

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index');
});

/* POST */
router.post('/contact', function (req, res) {
	let data = {
		name: req.body['name'],
		email: req.body['email'],
		subject: req.body['subject'],
		message: req.body['message'],
		hpot: req.body['hpot']
	};

	let errorMessage = validate(data, ContactFormConstraints.constraints());

	if (errorMessage) {
		res.send('form validation failed');
	} else {

		let transporter = nodemailer.createTransport(process.env.MAILER_URL);
		let message = {
			from: process.env.MAILER_FROM,
			to: process.env.MAILER_TO,
			subject: process.env.MAILER_SUBJECT,
			html: render({
				name: data['name'],
				email: data['email'],
				subject: data['subject'],
				message: data['message']
			})
		};

		transporter.sendMail(message, function (err, info) {
			if (err) {
				res.sendStatus(500);
			} else {
				res.send('ok');
			}
		});
	}
});

module.exports = router;
