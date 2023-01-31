const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const museumSchema = new Schema({
    title:String,
    description:String,
    images:[],
    isdeleted: {
        type:Boolean,
        default:false
    }
});

const museum = mongoose.model('museum', museumSchema);

module.exports = {
    museum
}