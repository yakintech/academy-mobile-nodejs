const express = require('express');
const { default: mongoose } = require('mongoose');

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

const { Schema } = mongoose

const categorySchema = new Schema({
    title: String,
    description: String,
    addDate: {
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    updateDate: {
        type: Date,
        default: Date.now()
    },
    deleteDate: Date
})


const adminUserSchema = new Schema({
    email: String,
    password: String,
    roles: [],
})

const category = mongoose.model('Category', categorySchema);
const adminUser = mongoose.model('AdminUser', adminUserSchema);

let admin = new adminUser({
    email:'test@test.com',
    password:'123565656'
});
admin.save();

app.get('/api/adminusers', function (req, res) {

    adminUser.find({}, function (err, docs) {
        res.json(docs)
    })

})


app.get('/', (req, res) => {
    res.send('Hello!');
})


app.listen(8080);


