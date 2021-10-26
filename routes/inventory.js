const express  = require('express')
const Inventory = require('../models/Inventory')
const router = express.Router();
const CustomError = require('../utils/customError')
const Repair = require('../models/Repair')
const catchError = require('../utils/catchError');

// retrieve all inventory
router.get('/', catchError(async (req,res,next) => {
        const inventory = await Inventory.find();
        res.json(inventory)
    
}));

// add a new inventory item
router.post('/', catchError(async (req,res,next) => {
    
    const inventory = new Inventory(req.body)
    
    const ids = inventory.repair_scheduled.map(item => item._id); 
    const getRepairSchedules = await Inventory.find({'_id': {$in: ids}});
    // can add data validation and sanitization here

        // if repair_scheduled for this inventory item is also added, then update the corresponding repair as well
        // correspoding repair should be present in database
        
    if(getRepairSchedules.length != 0 && getRepairSchedules!=null ){
        
        
        const findRepairs =  await Repair.find({ '_id': { $in: getRepairSchedules} })  
        if(findRepairs != null && findRepairs.length!=0 ){
            // save the inventory
            inventory.save()
            // save related repair as well
            getRepairSchedules.forEach(repair => {
                repair.inventoryRequired.push(inventory)
                repair.save();
            });
            res.json(inventory);
        } else {
            throw new CustomError("Repairs/Repair do not exists in database ", 400);
        }
        
    } else {
        
        if(await Repair.exists({_id: {$in: ids}}) || req.body.repair_scheduled == undefined){
            const savedInventory = await inventory.save()
            res.json(savedInventory);
        } else { 
            throw new CustomError("Repair/Repairs do not exists in database ", 400);
        }
    }


}));


// get inventory by id
router.get('/:inventoryId', catchError(async (req,res) => {

    const inventory = await Inventory.findById(req.params.inventoryId)
    res.json(inventory);
    
  
}));

// update inventory by id 
router.put('/:inventoryId', catchError(async (req,res,next) => {

    const inventoryUpdated = await Inventory.findByIdAndUpdate(
        req.params.inventoryId,
        req.body,
        {new :true} 
        ) 
        // assuming repairs scheduled for an inventory are not updated through /inventory/:inventoryId
        // they are updated through /repairs/:reapairId
    res.json(inventoryUpdated);
    
}));


// delete inventory by id
router.delete('/:inventoryId', catchError(async(req,res,next) => {
  
    const inventory = await Inventory.findById({_id: req.params.inventoryId});
    // get all repair docs where this inventory is required
    const repairs = await Repair.find({ '_id': { $in: inventory.repair_scheduled} }) 

        

    const inventoryItemDeleted = await  Inventory.remove({_id: req.params.inventoryId});
    // if inventory is deleted, then also delete repairs that includes this inventory
    // remove the inventory from repair
    repairs.forEach(repair => {
        repair.inventoryRequired.pop(inventory)
        
        repair.save();
    });    

    res.json(inventoryItemDeleted)
   
}));




module.exports = router;