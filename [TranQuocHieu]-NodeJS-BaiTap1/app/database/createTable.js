function createTable(db) {
    // console.log("Drop table contacts")
    // db.query('DROP TABLE contacts')
    createTableContacts(db);
    createTableUsers(db);
}

function createTableContacts(db) {
    console.log('Create Table contacts...')
    db.query('CREATE TABLE IF NOT EXISTS contacts ('
        +'id INT AUTO_INCREMENT PRIMARY KEY,'
        + 'name varchar(255) NOT NULL,'
        + 'email varchar(255) NOT NULL, '
        + 'phone varchar(10) NOT NULL, '
        + 'subject varchar(255) NOT NULL, '
        + 'messages varchar(500) NOT NULL, '
        + 'filename varchar(255),'
        + 'date_time datetime'
        + ')');
    console.log('Create Table contacts success')
}

function createTableUsers(db) {
    console.log('Create Table users...')
    db.query('CREATE TABLE IF NOT EXISTS users ('
        +'email varchar(255) PRIMARY KEY,'
        + 'name varchar(255) NOT NULL,'
        + 'password varchar(255) NOT NULL'
        + ')');
    console.log('Create Table users success')
}

module.exports = { createTable }