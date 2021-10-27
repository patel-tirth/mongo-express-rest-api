const mongoose = require('mongoose')

const RepairSchema = mongoose.Schema({

    scheduledDate: {
        type: Date,
        default: new Date(+new Date() + 1*24*60*60*1000) 
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Customers',
        required: true
    },
    description: {  
        type: String,
        required: true
    },
    inventoryRequired: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Inventory',
        required: true
        }
    ]
},
{
    timestamps: true
    
});



module.exports = mongoose.model('Repairs',RepairSchema)