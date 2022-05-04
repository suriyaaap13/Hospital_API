const Doctor = require('../models/doctor');
const Patient = require('../models/patient');

module.exports.findReports = async (req, res)=>{
    // if the status entered by the doctor doesn't match with the array elements then return error
    const statusArray = ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'];
    if(!statusArray.includes(req.params.status)){
        return res.status(400).json({message: "Report status not in array", status_Array: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit']});
    }
    try{
        const patientArray = await Patient.find({})
        .populate({
            path: 'reports',
            populate: {
                path: 'doctor',
                model: 'Doctor'
            }
        });
        const display = [];
        patientArray.forEach((element)=>{
            const temp = [];
            element.reports.forEach((e)=>{
                if(e.status==req.params.status){
                    temp.push(e);
                }
            });
            if(temp.length>0){
                const update = {
                    phn_no: element.phn_no,
                    reports: temp
                }
                display.push(update);
            }
        });
        return res.status(200).json(display);
    }catch(err){
        return res.status(400).json({message: "Bad request"});
    }
}