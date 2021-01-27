'use strict';

const mongoose = require('mongoose');

const laptopsLog = mongoose.Schema({
    timestamp: {type: String, required: true},
    action: {type: String, required: true},
    user: {type: String, required: true},
    description: {type: String, required: true}
});

module.exports = mongoose.model('laptopsLog', laptopsLog);