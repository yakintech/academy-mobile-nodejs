const express = require('express');
const { default: mongoose } = require('mongoose');
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

app.get('/', (req, res) => {
    res.send('Hello!');
})

app.use('/api/museums', museumRouter)


app.listen(8080);


