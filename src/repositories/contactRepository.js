const db = require('../database/index');
const {rows} = require("pg/lib/defaults");

class contactRepository {
    async findAll(orderBy = 'asc') {
        const order =  orderBy.toLowerCase() === 'asc' ? 'asc' : 'desc';
        const rows = await db.query(`SELECT contacts.*, categories.name as socialName
        FROM contacts left join categories on categories.id = contacts.categoryId
        order by contacts.name ${order}`);
        return rows;
    }

    async findByEmail(email){
        const [rows] = await db.query("SELECT * FROM contacts where email = $1",[email]);
        return rows;
    }

    async create({name,email,phone,categoryId}){
        const [row] = await db.query(`INSERT INTO contacts(name,email,phone,categoryId) 
        values($1,$2,$3,$4) RETURNING *`,[name,email,phone,categoryId])
        return row;
    }

    async findById(id){
        const [rows] = await db.query(`SELECT contacts.*, categories.name as socialName 
        FROM contacts left join categories on categories.id = contacts.categoryId
        where contacts.id = $1`,[id]);
        return rows;
    }

    async update(id,{name,email,phone,categoryId}){
        const [row] = await db.query(`UPDATE contacts SET name = $1, phone = $2, email = $3, categoryId = $4
                    WHERE id = $5 RETURNING name,phone,email,categoryId,id`,[name,phone,email,categoryId,id]);
        return row
    }

    async delete(id){
        const [row] = await db.query("DELETE FROM contacts where id = $1 returning *",[id])
        return row
    }
}

module.exports = new contactRepository();
