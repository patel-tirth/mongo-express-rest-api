const express  = require('express')
const Customer = require('../models/Customer')
const Repair = require('../models/Repair')
const Inventory = require('../models/Inventory')
const CustomError = require('../utils/customError')
const catchError = require('../utils/catchError')
const router = express.Router();

// retrieve all customers
router.get('/', catchError(async (req,res,next) => {

    const customers = await Customer.find();
    res.json(customers)
   
}));

// add a new customer
router.post('/', catchError(async (req,res,next) => {
    // create new customer and update database
    const customer  = new Customer(req.body);

    // save the customer
    const savedCustomer = await customer.save()
    
    res.json(savedCustomer);

}));


// get customer by id
router.get('/:customerId', catchError(async (req,res,next) => {
        const customer = await Customer.findById(req.params.customerId)
        res.json(customer);
  
}));

// update customer by id 
router.put('/:customerId', catchError(async (req,res,next) => {

    const customerUpdated = await Customer.findByIdAndUpdate(
        req.params.customerId,
        req.body,
        {new :true}  // to return updated results
        )
    res.json(customerUpdated);
  
}));

// function to delete a repair after cusomter is deleted
// params: repairs docs
async function deleteRepair(repairs){

    const repair = await  Repair.remove({_id: {$in: repairs}});
}

// delete customer by id
router.delete('/:customerId', catchError(async(req,res,next) => {
  

        const cust = await Customer.findById({_id: req.params.customerId});
        const getRepairDocs = await Repair.find({'_id': {$in: cust.repairs}})
        const customerDeleted = await  Customer.remove({_id: req.params.customerId});

        
        // also delete scheduled repairs for this customer if any
        if(getRepairDocs!= null && getRepairDocs.length > 0){
            // const deleteRepair = await Repair.remove
           await  deleteRepair(getRepairDocs)
        }
          // we can also return the inventory item to inventory that was required for this repair
           // that is not implemented for now

            // getRepairDocs.forEach(repair => {
            //    await  Repair.remove({_id: repair._id })
               
            //     
            //     // const getItemsDoc = await Inventory.find({_id: {$in: repair.inventoryRequired}})
            //     // if(getItems!= null && getItems.length!=0){
            //     //     getItemsDoc.forEach(item => {
            //     //         item.total_available += 1  // return the item to inventory
            //     //         item.repair_scheduled.pop(repair)
            //     //         item.save();
            //     //     })

            //     // }
                
            // });

        
        res.json(customerDeleted)
    
}));


module.exports = router;