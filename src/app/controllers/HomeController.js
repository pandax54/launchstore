const Product = require('../models/Product');
const { formatBRL, date, forat } = require('../../lib/utils');
const File = require('../models/File');
const LoadService = require('../services/LoadProductService');

module.exports = {

    async index(req, res) {

        try {

            // const lastAdded = await Promise.all(productsPromise)

            const products = await LoadService.load('products')
            const lastAdded = products.filter((product, index) => index > 8 ? false : true)   // pegar apenas os primeiros produtos

            return res.render("home/index", { products: lastAdded })

        } catch (error) {
            console.error(error)
        }

    }

}