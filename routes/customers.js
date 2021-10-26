const express  = require('express')
const Customer = require('../models/Customer')
const router = express.Router();

// retrieve all customers
router.get('/', async (req,res) => {
    try{
        const customers = await Customer.find();
        res.json(customers)
    } catch(err){
        res.json({messsage: err})
    }
});

// add a new customer
router.post('/', async (req,res) => {
    // create new customer and update database
    const customer  = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    });

    try{
        const savedCustomer = await customer.save()
        res.json(savedCustomer);
    } catch(err){
        res.json({message: err});
    }

});


// get customer by id
router.get('/:customerId', async (req,res) => {
    try{
        const customer = await Customer.findById(req.params.customerId)
        res.json(customer);
    } catch(err){
        res.json({message: err});
    }
  
});

// update customer by id 
router.put('/:customerId', async (req,res) => {
    try{
        const customerUpdated = await Customer.findByIdAndUpdate(
            req.params.customerId,
            req.body,
            {new :true}  // to return updated results
            )
        res.json(customerUpdated);
    } catch(err){
        res.json({message: err});
    }
  
});


// delete customer by id
router.delete('/:customerId', async(req,res) => {
  
    try{
        const customerDeleted = await  Customer.remove({_id: req.params.customerId});
        res.json(customerDeleted)
    } catch(err) {
        res.json({message: err});
    }
})


module.exports = router;