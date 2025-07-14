const Property= require('../models/propertyModel.js')

const getAllProperties= async(req, res)=>{
    try{
        const allProperties= await Property.find({})
        if (allProperties){
            res.status(200).json({
                message: "Properties fetched successfully"
            }, allProperties)
        }
    }catch(error){
        res.status(500).json({message: error.message})    
}}

const getProperty= async(req, res)=>{
    try{
        const {email}= req.body
        const propertyExists= await Property.findOne({email})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const createProperty= async (req, res)=>{
    try{
    const {name, email} = req.body
    const PropertyExists= Property.findOne({email})

    if(!PropertyExists){
        const newProperty= await Property.create({name, email})
        res.status(201).json(newProperty)
    }
    else{
        res.status(200).json(PropertyExists)
    }
    }catch(error){
        res.status(500).json(error.message)
    }
    
}

const updateProperty= async(req, res)=>{
    const {email}= req.body
    const Property= Property.update({email}, )
    

}

const deleteProperty= async(req, res)=>{

}

module.exports= {getAllProperties, getProperty, createProperty, deleteProperty, updateProperty}


