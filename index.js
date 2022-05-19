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

// app.set('view engine', 'ejs')
// app.set('view engine', 'pug')





const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+"/public/uploads")
    },
    filename: function (req, file, cb){
        cb(null, file.fieldname+'-'+file.originalname )
    },
    fileFilter: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        if(ext !== '.png'){
            return cb(new Error('Only png files allowed'))
        }
        cb(null, true)
    }
})

app.use(multer({
    storage
}).single("thumbnail"))


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/productos', routes)
app.use(express.static(__dirname+"/public"))


//startup sv
const PORT = 8081
const server = app.listen(PORT, ()=>{
    console.log(`PORT ${PORT} ONLINE`)
})

app.get('/', (req, res) =>{
    res.render("main",{
    })
})

