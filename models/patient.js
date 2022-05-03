const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({

    phn_no: {
        type: String,
        unique: true
    },
    reports: [{
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor'
        },
        status: {
            type: String
        },
        date: {
            type: String
        }
    }]

},{
    timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;