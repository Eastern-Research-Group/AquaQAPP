'use strict';

const Router = require('express');

const getQAPPRoutes = (app) => {
	const router = new Router();

	router
	.get('/:id', (req, res) => {
		const id = parseInt(req.params.id);
		res.send("get by id" + id);
	})
	.get('/', (req, res) => {
		res.send("get root");
	})
	.post('/', (req, res) => {
		const body = req.body;
		res.send(body);
	});

	app.use('/api/qapp', router);
};

module.exports = getQAPPRoutes;
