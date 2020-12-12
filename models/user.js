const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your email']
    },
    name: {
        type: String
    },
    specialize: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);