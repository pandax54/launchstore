// const db = require('../../config/db')
// const { create } = require('browser-sync')
// const { hash } = require("bcryptjs");
// const Product = require("../models/Product");

// const fs = require("fs")

const Base = require('./Base');

Base.init({ table: 'users' })


const User = {
    ...Base,
    // async create(data) {

    //     try {

    //         const query = `
    //         INSERT INTO users (
    //             name, 
    //             email,
    //             password,
    //             cpf_cnpj,
    //             cep,
    //             address
    //             ) 
    //         VALUES ($1, $2, $3, $4, $5, $6)
    //         RETURNING id`

    //         //hash of password
    //         // promise
    //         const passwordHash = await hash(data.password, 8)

    //         const values = [
    //             data.name,
    //             data.email,
    //             passwordHash,
    //             data.cpf_cnpj.replace(/\D/g, ""),
    //             data.cep.replace(/\D/g, ""),
    //             data.address
    //         ]

    //         const results = await db.query(query, values)
    //         return results.rows[0].id

    //     } catch (err) {
    //         console.error(err)
    //     }

    // },
    // async update(id, fields) {
    //     // https://skylab.rocketseat.com.br/node/controle-da-sessao-de-usuario/group/atualizando-usuarios/lesson/logica-do-model-de-update-de-usuario

    //     try {

    //         let query = `
    //         UPDATE users SET 
    //             `

    //         Object.keys(fields).map((key, index, array) => {
    //             if ((index + 1) < array.length) {
    //                 query = `${query}
    //                 ${key} = '${fields[key]}',
    //                 `
    //             } else {
    //                 // last iteration - sem vírgula
    //                 query = `${query}
    //                 ${key} = '${fields[key]}'
    //                 WHERE id = ${id}
    //                 `
    //             }
    //         })

    //         console.log(query)

    //         await db.query(query)
    //         return

    //     } catch (err) {
    //         console.error(err)
    //     }
    // },
    // async delete(id) {
    //     // pegar todos os produtos
    //     let results = await Product.findByUser(id)

    //     const products = results.rows

    //     // dos produtos, pegar todas as imagens
    //     const allFilesPromise = products.map(product => {
    //         // array de files de cada produto
    //         Product.files(product.id)
    //     })

    //     let promiseResults = await Promise.all(allFilesPromise)

    //     // rodar a remoção do usuário
    //     await db.query(`DELETE FROM users WHERE id = $1`, [id])

    //     // remover as imagens da pasta public
    //     promiseResults.map(results => {
    //         // um para cada produto
    //         results.rows.map(file => {
    //             try {
    //                 fs.unlinkSync(file.path)
    //             } catch (error) {
    //                 console.error(error)
    //             }
    //         })
    //     })
    // }

}

module.exports = User