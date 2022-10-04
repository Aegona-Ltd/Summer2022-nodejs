const express = require('express');
const { engine } = require('express-handlebars');


const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

// Engine Template
app.engine('.hbs', engine({
    extname: '.hbs'
}))
app.set("view engine", ".hbs");
app.set('views', './views')

// Router
require('./app/routes/routers')(app);

app.listen(8080, function() {
    console.log('Node server running @ http://localhost:8080')
});
