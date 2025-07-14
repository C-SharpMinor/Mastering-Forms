const mongoose= require('mongoose')

const propertySchema= new mongoose.Schema({
    title:{type: String, required: true },
    description:{type: String, required: true },
    location: {type: String, required: true },
    price: {type: Number, required: true },
    img: {type: String, required: true },
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true}
})

const PropertyModel= mongoose.model('Property', propertySchema)

module.exports= PropertyModel