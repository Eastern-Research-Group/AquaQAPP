'use strict';

const Router = require('express');
const qappControl = require('../controllers/qappController');

const getQAPPRoutes = (app) => {
	const router = new Router();

	router
		.get('/', (req, res) => {
			res.send("You must use post.");
		})
		.post('/', (req, res) => {
			//const body = req.body;
			const result = qappControl.generate(req,res);
			//res.send(result);
		});

	app.use('/api/qapp', router);
};

module.exports = getQAPPRoutes;
