const {Router} = require('express')
const Contenedor = require('./class.js')
const router = Router()

const getAllProds = () =>{
    const container = new Contenedor();
    const file = './productos.json';
    const allProductsArr = container.read(file);
    return allProductsArr
}

const getById = (id) =>{
    const container = new Contenedor();
    const file = './productos.json';
    const allProductsArr = container.read(file)
    return allProductsArr[id]
}

let products = getAllProds()

router.get('/:id', (req, res) =>{
    const {id} = req.params
    if (getById(id-1) == undefined){
        return res.json({error: 'producto no encontrado'})
    }
    res.send(getById(id-1)) 
})

router.get('/', (req, res) =>{
    res.render("main",{
        products
    })
})


router.post('/', (req, res) =>{
    const newObj = req.body
    newObj.id = products.length+1
    products.push(newObj)
    res.json({newObj})
})

router.put('/:id', (req, res) =>{
    const {id} = req.params
    const {title, price, thumbnail} = req.body
    if (getById(id-1) == undefined){
        return res.json({error: 'producto no encontrado'})
    }
    products.splice(id-1, 1, {
        title: title,
        price: price,
        thumbnail: thumbnail,
        id: id})
    res.json(products)
})

router.delete('/:id', (req, res) =>{
    const {id} = req.params
    if (getById(id-1) == undefined){
        return res.json({error: 'producto no encontrado'})
    }
    products.splice(id-1, 1)
    res.send(products)
})


router.post('/uploadfile', (req, res) =>{
    res.json({message: 'Upload Successful'})
})


module.exports = router