const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;


const webUserSchema = new Schema({
    email: String,
    password: String
})

const webUserModel = mongoose.model('webUser', webUserSchema);

module.exports = {
    webUserModel
}