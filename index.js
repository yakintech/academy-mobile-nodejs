const express = require('express');
const { default: mongoose } = require('mongoose');
const { product } = require('./models/Product');
const museumRouter = require('./router/museumRouter');
const tokenRouter = require('./router/tokenRouter');

var jwt = require('jsonwebtoken');
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

let privateKey = "codePrivateKey";

app.use((req, res, next) => {

    if (req.url == '/token')
        return next();
    let auth = req.headers?.authorization;

    if (auth != undefined) {
        let token = auth.split(' ')[1];

        jwt.verify(token, privateKey, function (err, decode) {
            if (err)
                res.status(401).json({ 'message': 'token error!' })
            else
                next();
        })
    }
    else {
        res.status(401).json({ 'message': 'token error!' })
    }

})


app.use('/api/museums', museumRouter)
app.use('/token', tokenRouter)

product.find({}).populate('category supplier').exec((err, docs) => {
    console.log('Docs', docs);
})





app.get('/', (req, res) => {
    res.send('Hello!');
})




app.listen(8080);


