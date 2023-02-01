const express = require('express');
const { default: mongoose } = require('mongoose');
const { category, product, supplier } = require('./models/Product');
const museumRouter = require('./router/museumRouter')
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
        next();
    let auth = req.headers.authorization;

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


product.find({}).populate('category supplier').exec((err, docs) => {
    console.log('Docs', docs);
})



app.post('/token', (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    if (email == 'a@a.com' && password == '123') {
        let token = jwt.sign({ email: email }, privateKey, {
            expiresIn: '10s',
            algorithm: 'HS256'
        })

        res.json({ 'token': token });
    }
    else {
        res.status(401).json({ 'message': 'password error!' })
    }

})


app.get('/', (req, res) => {
    res.send('Hello!');
})

app.use('/api/museums', museumRouter)


app.listen(8080);


