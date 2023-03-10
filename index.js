const express = require('express');
const { default: mongoose } = require('mongoose');
const { product } = require('./models/Product');
const museumRouter = require('./router/museumRouter');
const tokenRouter = require('./router/tokenRouter');

const fs = require('fs');


require('dotenv').config()

var jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());
app.use(express.urlencoded())

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});



io.on('connection', (socket) => {

    socket.on('chatMessage', (data) => {

        io.emit("chatMessage2", data);

    })

    socket.on('upload', (data) => {

        var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));

        io.emit('upload2', data);
        io.emit('upload3', base64String);

    })
    


    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

})







mongoose.connect('mongodb+srv://cagatay:jYjpMvn5WXivq4uh@cluster0.imfaisw.mongodb.net/academy-mobile-db')
    .then(res => {
        // console.log('Connected!!');
    })
    .catch(err => {
        console.log('Error', err);
    })

// let privateKey = process.env.tokenPrivateKey;
let privateKey = 'codePrivateKey'

app.use((req, res, next) => {

    if (req.url == '/token' || req.url == '/token/tokencontrol' || req.url == '/token/login')
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


app.use('/api/museums', museumRouter);
app.use('/token', tokenRouter);


app.get('/', (req, res) => {
    res.send('Hello!');
})


server.listen(8080);


