const {Schema, model} = require('mongoose')

const tureSchema =  new Schema ({
    name : {
        type : String,
        require : true,
    },
    email : {
        type : String,
        require : true,
        required  :true
    },
    password : {
        type : String,
        require : true,
    }
} ,{timestamps: true})

const IIT = model("IIT" , tureSchema)

module.exports  = IIT