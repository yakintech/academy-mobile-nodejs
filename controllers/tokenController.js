const { webUserModel } = require("../models/WebUser")
require('dotenv').config()
var jwt = require('jsonwebtoken');
let privateKey = 'codePrivateKey';
var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    direct: true,
    host: 'smtp.yandex.com',
    port: 465,
    auth: {
        user: 'cagatay.yildiz@neominal.com',
        pass: 'xpioqsemuckxloiv'
    },
    secure: true
})


const tokenController = {
    login: (req, res) => {
        let email = req.body.email.toLowerCase().trim();
        let password = req.body.password;

        webUserModel.findOne({ email: email, password: password }, (err, doc) => {
            if (!err) {
                if (doc) {

                    let confirmCode = Math.floor(Math.random() * 999999);

                    doc.confirmCode = confirmCode;
                    doc.save((saveErr, saveDoc) => {


                        var mailOptions = {
                            from: 'cagatay.yildiz@neominal.com',
                            to: doc.email,
                            subject: 'Confirm Code',
                            text: 'Confirm Code: ' + confirmCode
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                return console.log(error);
                            }
                            return res.json({ webUserId: saveDoc._id });
                        });


                    })

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
    tokenControl: (req, res) => {

        let token = req.body.token;

        jwt.verify(token, privateKey, function (err, decode) {
            if (err)
                res.status(401).json({ 'message': 'token error1!' })
            else
                res.send('OK!');
        })


    },
    token: (req, res) => {

        let confirmCode = req.body.confirmCode;
        let webUserId = req.body.webUserId;

        webUserModel.findOne({confirmCode: confirmCode, webUserId: webUserId}, (err,doc) => {
            if(!err){

                if(doc){
                    res.json(doc);
                }
                else{
                    res.status(404).json({'messsage':'Not found!'});
                }
            }
            else{
                res.status(500).json(err)
            }
        })

    }
}


module.exports = {
    tokenController
}