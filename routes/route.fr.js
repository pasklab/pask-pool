import validate from "validate.js";
import ContactFormConstraints from "../validations/contact_form";

var express = require('express');
var router = express.Router();

router.use((req, res, next) => {
	res.locals.status = res.statusCode;
	next();
});

/* GET home page. */
router.get('/', function(req, res) {
	// res.render('index');
	res.redirect('https://pipool.online/')
});

module.exports = router;
