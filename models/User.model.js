const mongoose = require('mongoose');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
    email: String,
    firstname: String,
    lastname: String
});


const User = mongoose.model('User', UserSchema);
module.exports = {User};