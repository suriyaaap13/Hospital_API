const Joi = require('joi');

// validates the register entry
module.exports.registerValidation = (data)=>{
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .max(30)
            .required(),
    
        email: Joi.string()
            .min(6)
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
            
    });
    return schema.validate(data);
}
// validates the login entry
module.exports.loginValidation = (data)=>{
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
        
    });
    return schema.validate(data);
}
// validates the patient login details
module.exports.patientRegister = (data)=>{
    const schema = Joi.object({
        phn_no: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
        
        
    });
    return schema.validate(data);
}