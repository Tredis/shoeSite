
'use strict'

const db = require('APP/db')
const Comment = db.model('comment')

const {mustBeLoggedIn, selfOnly, forbidden} = require('./auth.filters')

module.exports = require('express').Router()

	.get('/', mustBeLoggedIn, selfOnly("edit your own comments."), (req, res, next) =>
		Comment.findAll({where:{user_id: req.query.id}})
		.then(comments => res.json(comments))
		.catch(next))

	.put('/:id', (req, res, next) =>
		Comment.update(req.body, {where: {id: req.params.id}, returning: true})
		.then(user => res.json(user[1][0]))
		.catch(next))

	// .put('/vote/:id', (req, res, next) =>
	// 	Comment.
	// 	.then(user => res.json(user[1][0]))
	// 	.catch(next))

	.post('/', (req, res, next) =>
		Comment.create(req.body)
		.then(user => res.json(user))
		.catch(next))

	.delete('/:id', (req, res, next) =>
		Comment.destroy({where: {id: req.params.id}})
		.then(user => res.json(user))
		.catch(next))
