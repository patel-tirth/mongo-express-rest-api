const mongoose = require('mongoose')

const CustomerSchema  = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    repairs: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Repair'}
    ]
}, {
    timestamps: true

}); 

module.exports = mongoose.model('Customers',CustomerSchema)