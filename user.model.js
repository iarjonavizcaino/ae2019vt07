const mongoose = require("mongoose");
const config = require("./_config");
const mongooseFieldEncyption = require("mongoose-field-encryption").fieldEncryption;


userSchema = new mongoose.Schema({
    curp: {
        type: String,
        required: true,
        match: /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /.+@.+\..+/,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date  
    }
});

userSchema.pre('save', function(next) {
    var self = this;
    self.birthdate = self.curp.substr(4,2)+"/"+self.curp.substr(6,2)+"/"+self.curp.substr(8,2);
    next();
});

userSchema.plugin(mongooseFieldEncyption, { 
    fields: ["curp", "email", "name", "password"], 
    secret: config.SECRET_KEY,
    saltGenerator: function(secret) {
        return "1234567890123456"; // should ideally use the secret to return a string of length 16
      }
});

module.exports = userSchema;