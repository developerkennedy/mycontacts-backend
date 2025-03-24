const db = require('../database/index');

class categoryRepository{
    async findAll(){
        const row = await db.query("SELECT * FROM categories")
        return row
    }

    async findById(id) {
        const [row] = await db.query("SELECT *  FROM categories where id = $1",[id])
        return row
    }

    async create({name}) {
       const [newCategory] = await db.query("INSERT INTO categories(name) values($1) RETURNING *",[name])
       return newCategory
   }

    async delete(id) {
        const [row] = await db.query("DELETE FROM categories where id = $1 returning *",[id])
        return row
    }

    async update(id,{name}) {
        const [row] = await db.query("UPDATE categories SET name = $1  where id = $2 returning  *",[name,id])
        return row
    }
}

module.exports = new categoryRepository();
