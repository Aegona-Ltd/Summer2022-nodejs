var db = require('../db')

let User = {
    getAllUser: (callback) => {
        const sql = 'SELECT * FROM users';
        return db.query(sql, callback);
    },
    
    getUserById: (id, callback) => {
        const sql = 'SELECT * FROM users WHERE id=?'
        return db.query(sql, [id], callback)
    },
    
    addUser: (user, callback) => {
        const sql = 'INSERT INTO users(email, name, password) VALUES (?, ?, ?)'
        return db.query(sql, [user.email, user.name, user.password], callback)
    },
    
    deleteContact: (id, callback) => {
        const sql = 'DELETE FROM users WHERE id=?';
        return db.query(sql, [id], callback)
    }
}

module.exports = User;