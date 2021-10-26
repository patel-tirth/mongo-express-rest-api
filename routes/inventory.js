const express  = require('express')
const Inventory = require('../models/Inventory')
const router = express.Router();
const CustomError = require('../utils/customError')
const Repair = require('../models/Repair')
// retrieve all inventory
router.get('/', async (req,res) => {
    try{
        const inventory = await Inventory.find();
        res.json(inventory)
    } catch(err){
        res.json({messsage: err})
    }
});

// add a new inventory item
router.post('/', async (req,res,next) => {
    
    const inventory = new Inventory(req.body)
    
    const ids = inventory.repair_scheduled.map(item => item._id); 
    const getRepairSchedules = await Inventory.find({'_id': {$in: ids}});
    // can add data validation and sanitization here
    try{
        // if repair_scheduled for this inventory item is also added, then update the corresponding repair as well
        // correspoding repair should be present in database
        console.log(getRepairSchedules.length)
        if(getRepairSchedules.length != 0 && getRepairSchedules!=null ){
            console.log("hello");
            
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
           
            if(await Repair.exists({_id: {$in: ids}})){
                const savedInventory = await inventory.save()
                res.json(savedInventory);
            } else {
                throw new CustomError("Repair/Repairs do not exists in database ", 400);
            }
        }
    } catch(err){
        next(err);
    }

});


// get inventory by id
router.get('/:inventoryId', async (req,res) => {
    try{
        const inventory = await Inventory.findById(req.params.inventoryId)
        res.json(inventory);
    } catch(err){
        res.json({message: err});
    }
  
});


// update inventory by id 
router.put('/:inventoryId', async (req,res) => {
    try{
        const inventoryUpdated = await Inventory.findByIdAndUpdate(
            req.params.inventoryId,
            req.body,
            {new :true} 
            )
        res.json(inventoryUpdated);
    } catch(err){
        res.json({message: err});
    }
  
});


// delete inventory by id
router.delete('/:inventoryId', async(req,res) => {
  
    try{
        const inventoryItemDeleted = await  Inventory.remove({_id: req.params.inventoryId});
        res.json(inventoryItemDeleted)
    } catch(err) {
        res.json({message: err});
    }
})




module.exports = router;