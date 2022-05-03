const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name:{
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }  
},{
    timestamps: true
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;