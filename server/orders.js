'use strict'

const db = require('APP/db')
const Order= db.model('order')
const ShoeInventory= db.model('shoe_inventory')
const ShoeModel= db.model('shoe_model')

const {mustBeLoggedIn, selfOnly, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
	
	.get('/', mustBeLoggedIn, selfOnly("see your own orders."), (req, res, next) => 
		Order.findAll({where: {user_id: req.query.id}, order: 'date DESC'})
		.then(orders => res.json(orders))
		.catch(next))

	.get('/:id', mustBeLoggedIn, selfOnly("see your own orders."), (req, res, next) => 
		Order.findOne({where: {id: req.params.id}})
		.then(order => order.getShoeInventories({include:
			[{model: ShoeModel, include:
				[{model: Comment, where: {user_id: order.user_id}}]}]
		}))
		.then(shoes => res.json(shoes))
		.catch(next))

	.get('/pending/:userId', (req, res, next) => 
		Order.findOne({where: {user_id: req.params.userId, status: 'pending' }, include:
			[{model:ShoeInventory, include:[{model:ShoeModel}]}]
		})
		.then(order => res.json(order))
		.catch(next))