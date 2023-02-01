const { webUserModel } = require("../models/WebUser")
var jwt = require('jsonwebtoken');
let privateKey = "codePrivateKey";


const tokenController = {
    tokenControl: (req, res) => {
        let email = req.body.email.toLowerCase().trim();
        let password = req.body.password;

        webUserModel.findOne({ email: email, password: password }, (err, doc) => {
            if (!err) {
                if (doc) {
                    let token = jwt.sign({ email: email }, privateKey, {
                        expiresIn: '1d',
                        algorithm: 'HS256'
                    })
                    console.log('token', token);
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
    }
}


module.exports = {
    tokenController
}