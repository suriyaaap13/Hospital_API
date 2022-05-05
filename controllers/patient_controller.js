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
    // if the status entered by the doctor doesn't match with the array elements then return error
    const statusArray = ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'];
    if(!statusArray.includes(req.body.status)){
        return res.status(400).json({message: "Error in creating report status not in array", status_Array: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit']});
    }
    try{
        const doctor = await Doctor.findById(req.user._id);
        const patient = await Patient.findById(req.params.id);
        const d = new Date();
        let minutes = d.getMinutes();
        if(minutes<10){
            minutes = '0'+minutes;
        }
        const date = path.join(d.getFullYear()+'-'+d.getMonth()+'-'+d.getDay()+'_time_'+d.getHours()+':'+minutes);
        const update = {
            doctor: doctor,
            status: req.body.status,
            date: date
        }
        const report = await patient.reports.push(update);
        patient.save();
        return res.status(200).json({message: "Report Created Successfully"});
    }catch(err){
        console.log(err);
        return res.status(400).json({message: "Error in creating report try again"});
    }
    
}
// displays all the reports of the respective person
module.exports.displayAllReports = async (req, res)=>{
    try{
        const patient = await Patient.findById(req.params.id)
        .populate({
            path: 'reports',
            populate: {
                path: 'doctor',
                model: 'Doctor'
            }
        });
        if(patient.reports.length==0){
            return res.status(200).json({reports: patient.reports});
        }
        return res.status(200).json({reports: patient.reports});
    }catch(err){
        return res.status(400).json({message: "Bad request Check your patient Id"});
    }
    
}