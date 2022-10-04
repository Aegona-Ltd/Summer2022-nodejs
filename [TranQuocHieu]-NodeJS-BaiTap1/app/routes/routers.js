module.exports = (app) => {
    const router = require('express').Router();
    // page
    const homePage = require("../controllers/homeController")
    const contact = require("../controllers/contactController")
    const login = require('../controllers/loginController')
    const user = require('../controllers/userController')
    const register = require('../controllers/registersController')

    // Router
    router.get('', homePage.home);
    
    router.get("/contactForm", contact.contactForm);
    router.get('/api/contact/:id', contact.getContact);
    router.post('/contactForm', contact.postContact);
    router.delete('/api/contact/:id', contact.deleteContact);

    router.get('/login', login.login);

    router.get('/listContact', contact.contactList);

    router.get('/listUser', user.userList);
    router.post('/user', )

    router.get('/info', user.userInfo);

    router.get('/register', register.registerPage);

    

    app.use('', router);
}