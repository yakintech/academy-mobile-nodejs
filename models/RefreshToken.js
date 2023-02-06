const { default: mongoose } = require("mongoose");


const {Schema} = mongoose;

const refreshTokenSchema = new Schema({
    token:String,
    expireDate: Date,
    webUserId: String
})

const refreshTokenModel = mongoose.model('refreshToken', refreshTokenSchema);

module.exports = {
    refreshTokenModel
}