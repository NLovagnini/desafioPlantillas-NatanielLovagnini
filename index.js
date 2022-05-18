const express = require('express')
const Contenedor = require('./class.js')
const app = express()
const multer = require('multer')
const handlebars = require('express-handlebars')
const routes = require('./routes.js')

app.set('views', './views')
app.set('view engine', 'hbs' )

app.engine('hbs', handlebars.engine({
    extname: '.hbs', 
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname+'/views/layouts',
    partialsDir: __dirname+'/views/partials'
}))









const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+"/public/uploads")
    },
    filename: function (req, file, cb){
        cb(null, )
    }
})

app.use(multer({
    storage
}).single("myFile"))


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+"/public"))
app.use('/api/productos', routes)



//startup sv
const PORT = 8081
const server = app.listen(PORT, ()=>{
    console.log(`PORT ${PORT} ONLINE`)
})

