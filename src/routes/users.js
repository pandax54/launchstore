
const express = require('express');
const routes = express.Router();
const SessionController = require('../app/controllers/SessionController');
const UserController = require('../app/controllers/UserController');
const OrderController = require('../app/controllers/OrderController');
// validators
const UserValidator = require('../app/validator/user');
const SessionValidator = require("../app/validator/session");

// middlewares
const { isLogged, onlyUsers } = require('../app/middlewares/session')

// user register UserController.js
//-- criaçaão de usuário
//-- atualização da conta do usuário
//-- remoção do cadastro de usuário
routes.get('/register', UserController.registerForm)
routes.post('/register', UserValidator.post, UserController.post)

// longin/logout SessionController.js
//-- uma rota que mostratá o formulário de login (GET)
routes.get('/login', isLogged, SessionController.loginForm)
//-- fazer o login (POST)
routes.post('/login', SessionValidator.login, SessionController.login)
//-- logout (POST)
routes.post('/logout', SessionController.logout)

// reset password/forgot SessionController.js
//-- forgot password form - preencher para pedir novo password
routes.get('/forgot-password', SessionController.forgotForm)
//-- forgot password form executa a ação para envio do token
routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot)

//-- formulário para escolher novo password
routes.get('/password-reset', SessionController.resetForm)
//-- executar a ação do form
routes.post('/password-reset', SessionValidator.reset, SessionController.reset)


routes.get('/', onlyUsers, UserValidator.show, UserController.show)
routes.put('/', UserValidator.update, UserController.update)
routes.delete('/', UserController.delete)

// listar anúncios do usuário
routes.get('/ads', UserController.ads)

routes.post('/orders', onlyUsers, OrderController.post)
// routes.get('/orders', onlyUsers, (req, res) => {
//     res.render('orders/success')
// })
// routes.get('/orders/error', onlyUsers, (req, res) => {
//     res.render('orders/error')
// })


module.exports = routes 