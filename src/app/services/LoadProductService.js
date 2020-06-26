const Product = require('../models/Product');
const { formatBRL, date } = require('../../lib/utils');


// agora pegar as imagens usando o product id
async function getImages(productId) {
    // get the images of the product
    let files = await Product.files(productId)
    // somente retornar o caminho pois precisamos da url na tag da imagem
    files = files.map(file => ({
        ...file,
        src: `${file.path.replace("public", "")}`
        // /images/...
        // `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }))

    // console.log("files", files)

    return files
}



async function format(product) {

    const files = await getImages(product.id)
    product.img = files[0].src
    product.files = files
    product.formattedPrice = formatBRL(product.price)
    product.formattedOldPrice = formatBRL(product.old_price)

    const { hour, minutes, day, month, year } = date(product.updated_at)

    product.published = {
        date: `${day}/${month}/${year}`,
        time: `${hour}h:${minutes}`
    }

    product.formattedCreatedAt = `${product.published.date} às ${product.published.time}`


    // devolve o product formatado
    return product

    // products  = await Promise.all(productsPromise)
}


const LoadService = {
    load(service, filter) {

        this.filter = filter
        return this[service]()
    },
    async product() {

        try {

            const product = await Product.findOne(this.filter)
            return format(product)

        } catch (error) {
            console.error(error)
        }

    },
    async products() {
        try {

            const products = await Product.findAll(this.filter)
            // products.map(product => format(product)) == products.map(format)
            const productsPromise = products.map(format)
            return Promise.all(productsPromise)

        } catch (error) {
            console.error(error)
        }
    },
    async productWithDeleted() {
        try {
            let product = await Product.findOneWithDeleted(this.filter)
            return format(product)

        } catch (error) {
            console.error(error)
        }
    },
    format
}

// LoadService.load('product', { where: { id: 1}})

module.exports = LoadService