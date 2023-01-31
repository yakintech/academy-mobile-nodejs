const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;


const productSchema = new Schema({
    name:String,
    unitPrice: Number,
    stock:Number,
    category: {
        type:'ObjectId',
        ref:'category'
    },
    supplier: {
        type:'ObjectId',
        ref:'supplier'
    }
})


const categorySchema = new Schema({
    name: String,
    description:String
})

const supplierSchema = new Schema({
    companyName: String,
    contactName:String
})

const category = mongoose.model('category', categorySchema);
const product = mongoose.model('product', productSchema);
const supplier = mongoose.model('supplier', supplierSchema);


module.exports = {
    category,
    product,
    supplier
}
