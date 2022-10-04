const Contact = require('../database/model/contact.model')
const moment = require('moment')

// view contactForm
exports.contactForm = async (req, res) => {
    return res.render('page/contactForm', { layout: false })
}

// get List contact
exports.contactList = async (req, res) => {
    Contact.getAllContact((err, rows) => {
        if (err) res.json(err)

        let listContact = rows.map((item, key) => {
            let dateTime = item.date_time.toISOString().substring(0, item.date_time.toISOString().length-2).split('T')
            return {
                ...item,
                date_time: dateTime[0] + ' ' + dateTime[1],
                index: key + 1,
            }
        })

        return res.render('page/contacts', { contacts:  listContact})
    })
}

// add Contact
exports.postContact = async (req, res) => {
    let { fullName, email, phone, subject, messages } = req.body;
    let dateTime = moment().format()
    const contact = {
        fullname: fullName,
        email: email,
        phone: phone,
        subject: subject,
        messages: messages,
        filename: null,
        date_time: dateTime
    }
    
    Contact.addContact(contact, function(err, rows) {
        if (err) {
            res.json(err)
        }else {
            res.redirect('/login')
        }
    })
}

// API delete
exports.deleteContact = async (req, res) => {
    Contact.deleteContact(req.params.id,(err, rows) => {
        if (err) {
            return res.json(err)
        }else {
            return res.json({
                status: 200,
                data: true,
                message: 'success'
            })
        }
    })
}

// API get detail contact
exports.getContact = async (req, res) => {
    Contact.getContactById(req.params.id, (err, rows) => {
        if (err){
            return res.json(err)
        }else {
            return res.json({
                status: 200,
                data: rows[0],
                messages: ''
            })
        }
    })
}