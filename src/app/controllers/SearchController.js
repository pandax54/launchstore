const Product = require('../models/Product');
const { formatBRL, date, forat } = require('../../lib/utils');
const File = require('../models/File');
const LoadService = require('../services/LoadProductService');

module.exports = {

    async index(req, res) {

        try {
            let results,
                params = {}

            const { filter, category } = req.query

            if (!filter) return res.redirect('/')

            // se tiver filtro adicionar no objeto params
            params.filter = filter

            // manter o ?filter= e adicionar ?category=
            if (category) {
                // se tiver category adicionar no objeto params
                params.category = category
            }

            let products = await Product.search(params)

            // array de promises
            ////
            const productsPromise = products.map(LoadService.format)
            products = await Promise.all(productsPromise)

            const search = {
                term: req.query.filter,
                total: products.length
            }

            // se houver mais de um produto com o mesmo nome ou cagoria, ele irá se repetir entao teremos que filtrar repetições
            const categories = products.map(product => ({
                id: product.category_id,
                name: product.category_name
            })).reduce((categoriesFiltered, category) => {
                // https://skylab.rocketseat.com.br/node/listando-produtos-da-launchstore/group/pagina-de-busca/lesson/organizando-categorias-e-filtros-1
                // se tiver repetido, nao colocar mais uma vez 
                const found = categoriesFiltered.some(item => item.id == category.id)

                // se ele nao achar
                if (!found) {
                    categoriesFiltered.push(category)
                }

                return categoriesFiltered
            }, [])

            return res.render("search/index", { products, search, categories })


        } catch (error) {
            console.error(error)
        }

    }

}