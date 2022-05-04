const validationController = require('./validation_controller');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const path = require('path');

// register a new patient/display the patient info if exists
module.exports.register = async (req, res)=>{

    const {error} = validationController.patientRegister(req.body);
    if(error){return res.status(400).json({Error: error.details[0].message, message: "Bad Request", status: 400});}

    try{
        // check if patient exists
        const patient = await Patient.findOne({phn_no: req.body.phn_no})
        .populate({
            path: 'reports',
            populate: {
                path: 'doctor',
                model: 'Doctor'
            }
        });
        if(patient){
            return res.status(200).json({message: "Patient already exists", patient});
        }else{
            const patientCreated = await Patient.create(req.body);
            return res.status(200).json({message: "Patient Created Successfully", patientCreated});
        }
    }catch(err){
        return res.status(400).json({message: "Error in creating patient try again"});
    }
}

// create patients report and stores it in the database
module.exports.createReport = async (req, res)=>{
    const statusArray = ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'];
    if(!statusArray.includes(req.body.status)){
        return res.status(400).json({message: "Error in creating report status not in array", status_Array: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit']});
    }
    const doctor = await Doctor.findById(req.user._id);
    const patient = await Patient.findById(req.params.id);
    const d = new Date();
    const date = path.join(d.getFullYear()+'-'+d.getMonth()+'-'+d.getDay()+'-'+d.getHours()+'-'+d.getMinutes());
    const update = {
        doctor: doctor,
        status: req.body.status,
        date: date
    }
    const report = await patient.reports.push(update);
    patient.save();
    return res.status(200).json({message: "Report Created Successfully"});
}
// displays all the reports of the respective person
module.exports.displayAllReports = async (req, res)=>{
    const patient = await Patient.findById(req.params.id)
    .populate({
        path: 'reports',
        populate: {
            path: 'doctor',
            model: 'Doctor'
        }
    });
    return res.status(200).json({reports: patient.reports});
}