var db = require('../db')

let Contact = {
    getAllContact: (callback) => {
        const sql = 'SELECT * FROM contacts ORDER BY id DESC';
        return db.query(sql, callback);
    },
    
    getContactById: (id, callback) => {
        const sql = 'SELECT * FROM contacts WHERE id=?'
        return db.query(sql, [id], callback)
    },
    
    addContact: (contact, callback) => {
        const sql = 'INSERT INTO contacts(name, email, phone, subject, messages, filename, date_time) VALUES (?, ?, ?, ?, ?, ?, ?)'
        return db.query(sql, [contact.fullname, contact.email, contact.phone, contact.subject, contact.messages, contact.filename, contact.date_time], callback)
    },
    
    deleteContact: (id, callback) => {
        const sql = 'DELETE FROM contacts WHERE id=?';
        return db.query(sql, [id], callback)
    }
}



module.exports = Contact;