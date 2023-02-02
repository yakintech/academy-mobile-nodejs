const { webUserModel } = require("../models/WebUser")
require('dotenv').config()
var jwt = require('jsonwebtoken');
let privateKey = process.env.tokenPrivateKey;



const tokenController = {
    login: (req, res) => {
        let email = req.body.email.toLowerCase().trim();
        let password = req.body.password;

        webUserModel.findOne({ email: email, password: password }, (err, doc) => {
            if (!err) {
                if (doc) {
                    let token = jwt.sign({ email: email }, privateKey, {
                        expiresIn: '1d',
                        algorithm: 'HS256'
                    })
                    res.json({ 'token': token });
                    return;
                }
                else {
                    res.status(401).json({ 'message': 'password error!' })
                }
            }
            else {
                res.status(500).json(err);
            }
        })
    },
    tokenControl: (req,res) => {

        let auth = req.headers?.authorization;

        if (auth != undefined) {
            let token = auth.split(' ')[1];
    
            jwt.verify(token, privateKey, function (err, decode) {
                if (err)
                    res.status(401).json({ 'message': 'token error!' })
                else
                    res.send('OK!');
            })
        }
        else {
            res.status(401).json({ 'message': 'token error!' })
        }

    }
}


module.exports = {
    tokenController
}