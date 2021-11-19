const mongoose = require('mongoose');

const studentSchema =  mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    }, 
    phone:{
        type:Number
    }
}, {
    collection :'students'
})

module.exports = mongoose.model('Student', studentSchema); 