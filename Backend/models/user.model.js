const mongoose = require('mongoose');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
        type: String,
        required: true,
        minlength:[3,'First name must be at least 3 characters long'],
        maxlength:[30,'First name can not be more than 30 characters long']
    },
        lastname: {
        type: String,
        minlength:[3,'Last name must be at least 3 characters long'],
        maxlength:[30,'Last name can not be more than 30 characters long']
    }
},
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        minlength:[10,'Email must be at least 10 characters long'],
        maxlength:[50,'Email can not be more than 50 characters long']
    },

    password: {
        type: String,
        required: true,
        select : false,
    },
    socketID: { 
    }

})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET); 
    return token;
}

userSchema.methods.comparePassword = async function(password) {
    return await bycrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function(password) {
    return await bycrypt.hash(password, 10); 
}

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;