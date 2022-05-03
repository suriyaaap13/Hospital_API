const validationController = require('./validation_controller');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');

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
            Patient.create(req.body);
            return res.status(200).json({message: "Patient Created Successfully"});
        }
    }catch(err){
        return res.status(400).json({message: "Error in creating patient try again"});
    }
}