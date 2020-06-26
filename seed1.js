const User = require('./src/app/models/User');
const Product = require('./src/app/models/Product');
const File = require('./src/app/models/File');
const { hash } = require("bcryptjs");

const faker = require("faker")

let usersIds = []
//let productsId = []
let totalProducts = 10
let totalUsers = 8

async function createUsers() {
    const users = []

    // criar uma senha com bcrypt
    const password = await hash('1111', 8)

    // estrutura para criar vários usuários - loop e usando fakerjs
    // https://github.com/marak/Faker.js/
    while (users.length < totalUsers) {

        // atualização do users.length
        users.push({
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password,
            cpf_cnpj: faker.random.number(99999999999),
            cep: faker.random.number(9999999),
            address: faker.address.streetAddress()
        })
    }

    // array de promessas - pra cada usuário criado ele irá persistir no banco de dados
    const usersPromise = users.map(user => User.create(user))

    usersIds = await Promise.all(usersPromise)
    console.log("users", usersIds)
}

async function createProducts() {
    let products = []

    while (products.length < totalProducts) {

        products.push({
            // número da categoria
            category_id: Math.ceil(Math.random() * 4),
            // depois de criarmos randomicamente usuários, pegaremos randomicamente users_ids do array para criar os products
            // posição do array = total.length - 1, por isso usamos o Math.floor para arredondar pra baixo
            user_id: usersIds[Math.floor(Math.random() * totalUsers)],
            name: faker.name.title(),
            description: faker.lorem.paragraph(Math.ceil(Math.random() * 10)),
            old_price: faker.random.number(9999),
            price: faker.random.number(9999),
            quantity: faker.random.number(99),
            // 0 or 1
            status: Math.round(Math.random())
        })
    }

    const productsPromise = products.map(product => Product.create(product))

    const productsId = await Promise.all(productsPromise)
    console.log("products", productsId)


    let files = []
    while (files.length < 50) {
        files.push({
            name: faker.image.image(),
            path: `public/images/placeholder.png`,
            product_id: productsId[Math.floor(Math.random() * totalProducts)]
        })
    }

    const filesPromise = files.map(file => File.create(file))

    await Promise.all(filesPromise)
}

async function init() {
    await createUsers()
    await createProducts()
}

init()
// node seed.js
