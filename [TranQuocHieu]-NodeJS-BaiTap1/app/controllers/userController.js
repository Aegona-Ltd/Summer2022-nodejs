const User = require('../database/model/user.model')

exports.userList = async (req, res) => {
    return res.render('page/users')
}

exports.userInfo = async (req, res) => {
    return res.render('page/infoUser')
}

exports.addUser = async (req, res) => {
    const { email, name, password } = req.body;
    User.addUser({email, name, password}, function(err, rows) {
        if (err) res.json(err)
        else res.json({
            status: 200,
            data: true,
            message: 'Add user Success'
        })
    })
}