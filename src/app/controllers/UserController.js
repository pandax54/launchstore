const User = require('../models/User')
const Product = require('../models/Product');
const LoadService = require('../services/LoadProductService');

const user = require('../validator/user')

const { formatCpfCnpj, formatCep } = require('../../lib/utils')

const { hash } = require("bcryptjs");
const { unlinkSync } = require("fs")

module.exports = {
    async registerForm(req, res) {

        // pegar o id do usuário que está logado do session

        return res.render("user/register")
    },
    async post(req, res) {

        try {
            let { name, email, password, cpf_cnpj, cep, address } = req.body

            //hash of password
            // promise
            password = await hash(password, 8)
            cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
            cep = cep.replace(/\D/g, "")

            const userId = await User.create({
                name,
                email,
                password,
                cpf_cnpj,
                cep,
                address
            })

            // agora temos acesso ao session por meio do req
            req.session.userId = userId

            //return res.redirect('/users')
            return res.redirect('/users')

        } catch (error) {
            console.error(error)
        }
    },
    async show(req, res) {

        try {
            // a parte de validação foi removida e colocar em validators -> user.js
            const { user } = req

            user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
            user.cep = formatCep(user.cep)

            return res.render("user/index", { user })

        } catch (error) {
            console.error(error)
        }
    },
    async update(req, res) {

        try {
            let { user } = req
            let { name, email, cpf_cnpj, cep, address } = req.body

            cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
            cep = cep.replace(/\D/g, "")

            let results = await User.update(user.id, {
                name, email, cpf_cnpj, cep, address
            })

        } catch (err) {
            console.error(err)
            return res.render("user/index", {
                user,
                error: "Algum erro aconteceu"
            })
        }

        console.log("aqui", user)

        return res.render("user/index", {
            user: req.body,
            success: "Conta atualizada com sucesso"
        })


    },
    async delete(req, res) {
        try {
            const products = await Product.findAll({ where: { user_id: req.body.id } })


            // dos produtos, pegar todas as imagens
            const allFilesPromise = products.map(product =>
                Product.files(product.id))

            let promiseResults = await Promise.all(allFilesPromise)

            // rodar a remoção do usuário
            await User.delete(req.body.id)
            req.session.destroy()

            // remover as imagens da pasta public
            promiseResults.map(files => {
                files.map(file => {
                    try {
                        unlinkSync(file.path)
                    } catch (err) {
                        console.error(err)
                    }

                })
            })

            return res.render("session/login", {
                success: "Conta deletada com sucesso!"
            })

        } catch (error) {
            console.error(error)
            return res.render("user/index", {
                user: req.body,
                error: "Erro ao tentar deletar sua conta"
            })
        }
    },
    async ads(req, res) {
        // filtrando pelo user id do usuário logado
        const products = await LoadService.load('products', { where: { user_id: req.session.userId } })

        return res.render('user/ads', { products })
    }
}

