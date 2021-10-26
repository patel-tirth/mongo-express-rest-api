const express  = require('express')
const Repair = require('../models/Repair')
const Customer = require('../models/Customer')
const Inventory = require('../models/Inventory')
const router = express.Router();
const CustomError = require('../utils/customError')
const catchError = require('../utils/catchError')

// retrieve all repairs
router.get('/', catchError(async (req,res,next) => {
        const repairs = await Repair.find();
        res.json(repairs)

}));


// add a new repair
router.post('/', catchError(async (req,res,next) => {

   const repair = new Repair(req.body)
//    console.log(repair)
   const customer =  await Customer.findOne({'_id': repair.customer});

   // get the ids for parts required for repair
   const ids = repair.inventoryRequired.map(item => item._id); 
   // check if these parts are available in inventory
   const items =  await Inventory.find({ '_id': { $in: ids} , 'total_available': {$gt: 0}}) ;
    
        if(items.length ==0 || items.length != repair.inventoryRequired.length){
            throw new CustomError("Items not available in inventory",400);
         }
       // check if customer exists and all parts are available in inventory before scheduling the repair
       if(customer && items != null && (items.length == ids.length) && items.length!=0){
        //   await Inventory.findByIdAndUpdate({'_id': "61761bf31f8766dc0be697e3"}, {$inc: {total_available: -1}},{new :true} )
         
         repair.save();
         // update the customer's document with scheduled repair
         customer.repairs.push(repair);
         // push this repair to particualr item/s in inventory
         // we also need to update inventory item that it is scheduled for repair
         items.forEach(item => { 
             item.repair_scheduled.push(repair)
             item.total_available -= 1  // decrement the total available pieces of this item
             item.save()
            //  console.log(item)
         });
       
         customer.save()
         
         res.json(repair);
       } else {
           // give appropriate error message
           if(items == null || items.length != ids.length || items.length == 0) {
               throw new CustomError(`${ids.length - items.length} item/s does not exist in inventory`,400);

           }
           throw new CustomError("Customer does not exist in database",400);
       }
   
}));


// get repair by id
router.get('/:repairId', catchError(async (req,res,next) => {

        const repair = await Repair.findById(req.params.repairId)
        res.json(repair);
   
  
}));

// function to check if items exists in inventory
// params:  ids of items
 async function checkInventory(ids){
    const items =  await Inventory.find({ '_id': { $in: ids} });
    if(items != null && (items.length == ids.length) && items.length != 0 ){
        return true;
    }
    return false;
}

// function to check if customer exists in database
// params: customer id
async function checkCustomer(customerId){
    const customer =  await Customer.findOne({'_id': customerId});
    if(customer)
        return true;
    return false
}

// function to update inventory 
// params: list of inventory documents, repair document
async function updateInventory(items,repair){
    
    items.forEach(item => { 
        item.repair_scheduled.push(repair)

        item.total_available -= 1  // decrement the total available pieces of this item
        item.save()
       //  console.log(item)
    });
}

// update repairs by id 
router.put('/:repairId', catchError(async (req,res,next) => {
    const repair = new Repair(req.body)
    // console.log(repair.customer)
    // console.log(req.body)
    const getRepair = await Repair.findOne({'_id': req.params.repairId});

    // get requested ids for items
    const ids = repair.inventoryRequired.map(item => item._id); 
    
     // console.log(ids)
        // before updating the repair, check if inventory has desired items for this new repair
        // also checking if customer is changed for this repair, check if new customer is present in database

        // ASSUMING that customer is not changed during update, that is repair is under same cusomter
        if(await checkInventory(ids) && await checkCustomer(repair.customer)){
            // console.log("is available")

            const repairUpdated = await Repair.findByIdAndUpdate(
                req.params.repairId,
                req.body,
                {new :true} 
                ) 
                // only update the inventory if there is new item required for the repair 
                // that is, if the  difference of new and previous inventory is greater than 0
                
                // get only the inventory ids that are new in update request
               const differentIds= ids.filter(id => !(getRepair.inventoryRequired.includes(id)));
        
               const differentItemsDoc = await Inventory.find({ '_id': { $in: differentIds} })
               // update the realted documents, inventory and repairs if repair is updated with different items
                if(differentIds.length > 0)  {
                    updateInventory(differentItemsDoc,repair);
                }
            res.json(repairUpdated);
        } else {
            if(await checkCustomer(repair.customer) == false){
                throw new CustomError("Opps..Customer does not exist in database",400)
            }
            throw new CustomError("Item does not exist in inventory",400)
        }
    
  
}));

// function to update inventory with item increments  and also remove repairs from customer
//params: list of inventory documents, repair document
const updateInventoryAndCustomerInc = async (items, repair) => {
    const customer =  await Customer.findOne({'_id': repair.customer});
    // remove this repair from customer's active repairs
    customer.repairs.pop(repair);
    customer.save()
    items.forEach(item => { 
        // remove the repair scheduled for this item
        item.repair_scheduled.pop(repair)

        item.total_available += 1  // decrement the total available pieces of this item
        item.save()
       //  console.log(item)
    });
 }



// delete a scheduled repair by id
router.delete('/:repairId', catchError(async(req,res,next) => {

    const repair = await Repair.findById({_id: req.params.repairId});
    // console.log(itemsReturned)
    // const itemsReturned = req.body.inventoryRequired.map(item => item._id); 
    const itemReturnedDocs = await Inventory.find({ '_id': { $in: repair.inventoryRequired} }) 
    // console.log(itemsReturned)
    const repairDelete = await Repair.deleteOne({_id: req.params.repairId});
    
    // after deleting the repair, increment the count of items that were required for this repair
    // also delete customer's scheduled repairs
    
    updateInventoryAndCustomerInc(itemReturnedDocs,repair);
    
    res.json(repairDelete)
        
}));

//update schedule date for repair id
router.post('/:repairId/schedule', catchError(async (req,res,next) => {

        // get the specific repair doc

    const repairScheduleUpdated = await Repair.findByIdAndUpdate(
        req.params.repairId,
        {$set :{scheduledDate: req.body.scheduledDate}},
        {new :true} 
        ) 
    
    res.json(repairScheduleUpdated);
}));


module.exports = router;