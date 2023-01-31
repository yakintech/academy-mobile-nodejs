const express = require('express');
const { default: mongoose } = require('mongoose');
const { category, product, supplier } = require('./models/Product');
const museumRouter = require('./router/museumRouter')

const app = express();

app.use(express.json());
app.use(express.urlencoded())

mongoose.connect('mongodb+srv://cagatay:jYjpMvn5WXivq4uh@cluster0.imfaisw.mongodb.net/academy-mobile-db')
    .then(res => {
        console.log('Connected!!');
    })
    .catch(err => {
        console.log('Error', err);
    })


    // let newSupplier = new supplier({
    //     companyName: 'Code Academy',
    //     contactName : "Çağatay"
    // });

    // newSupplier.save();

    // let newproduct = new product({
    //     name:'Samsung',
    //     unitPrice:3000,
    //     stock:55,
    //     category: '63d8c6ab7c218e3ad619b175',
    //     supplier: '63d8c86298f3f4858e4d25c4'
    // });

    // newproduct.save();

    // newproduct.save();

    product.find({}).populate('category supplier').exec((err,docs) => {
        console.log('Docs', docs);
    })





app.get('/', (req, res) => {
    res.send('Hello!');
})

app.use('/api/museums', museumRouter)


app.listen(8080);


