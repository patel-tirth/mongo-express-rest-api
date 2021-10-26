const mongoose = require('mongoose')

const InventorySchema = mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    manufacturer: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    total_available: {
        type: Number,
        default: 1
    },
    repair_scheduled: [
        {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Repair'
        }
    ]
    // defective:{
    //     type: Boolean,
    //     required: true
    // },
    

}, {
    timestamps: true
});

module.exports = mongoose.model('Inventory',InventorySchema)