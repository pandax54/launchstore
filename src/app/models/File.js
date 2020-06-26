const db = require('../../config/db')
// const fs = require('fs')

// module.exports = {
//     create({ filename, path, product_id }) {

//         const query = `
//         INSERT INTO files (
//             name, 
//             path, 
//             product_id 
//             ) 
//         VALUES ($1, $2, $3)
//         RETURNING id`


//         const values = [
//             filename,
//             path,
//             product_id
//         ]

//         return db.query(query, values);
//     },
//     put(data) {

//         const query = `
//         UPDATE files SET
//             name=($1), 
//             path=($2), 
//             product_id=($3)
//             WHERE id=$4 `

//         const values = [
//             data.name,
//             data.path,
//             data.product_id,
//             data.id
//         ]

//         return db.query(query, values);
//     },
//     async delete(id) {

//         try {
//             // precisaremos do path da file para que ela possa ser detectada e consequentemente deletada
//             const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id])

//             const file = result.rows[0] // dentro teremos o path que assim poderemos passar como parâmetro para o unlinkSync

//             fs.unlinkSync(file.path)
//             return db.query(`DELETE FROM files WHERE id = $1`, [id])


//         } catch (err) {
//             console.log(err)
//         }

//     },
//     async findById(productId) {
//         const query = `SELECT * FROM files WHERE product_id = $1`

//         return db.query(query, [productId])


//     }

// }



const Base = require('./Base');

Base.init({ table: 'files' })


const Files = {
    ...Base,
}


module.exports = Files