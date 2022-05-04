const validationController = require('../controllers/validation_controller');
const Doctor = require('../models/doctor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// implement Register Action
module.exports.register = async (req, res)=>{
    // Validate data before pushing it to the database
    const {error} = validationController.registerValidation(req.body);
    if(error){return res.status(400).json({Error: error.details[0].message, message: "Bad Request", status: 400});}

    try{
        // Check if email exists
        const emailExist = await Doctor.findOne({email: req.body.email});
        if(emailExist){return res.status(400).json({message: "Email already exists try logging in"});}
        // HASH Passwords
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        // create Doctor
        const doctor = Doctor.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        if(!doctor){return res.json({message: "bad Request", status: 400});}
        return res.json({message: "Registration Successful", status: 200});
    }catch(err){
        return res.status(400).json({message: "Error in creating doctor try again"});
    }
}
// implement Login Action
module.exports.login = async (req, res)=>{
    // validating doctor before checking the login
    const {error} = await validationController.loginValidation(req.body);
    if(error){return res.status(400).json({Error: error.details[0].message, message: "Bad Request", status: 400});}
    try{
        // check if doctor email exists
        const doctor = await Doctor.findOne({email: req.body.email});
        if(!doctor){return res.status(400).json({message: "Invalid email/Password"});}
        // Compare PASSWORDS 
        const validPassword = await bcrypt.compare(req.body.password, doctor.password);
        if(!validPassword){return res.status(400).json({message: "Invalid email/Password"});}

        // create jwt and send it to the user
        const accessToken = jwt.sign({_id: doctor._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1hr' });
        return res.header('auth-token', accessToken).status(200).json({message: "Login Successful", accessToken: accessToken, name: doctor.name});

    }catch(err){
        console.log('Error',err);
        return res.status(400).json({message: "Error in logging in user try again"});
    }
}