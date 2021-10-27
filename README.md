# REST API Bicycle Shop

#### Tech Stack: Express, MongoDB, Mongoose ODM, Postman.
The databse was built on MongoDB Atlas.

This is a REST API for a fictional bicycle shop allowing seamless scheduling of repairs for customer and managing inventory. 

To test the API, follow the steps below:

```
git clone https://github.com/patel-tirth/supplyhive-project.git
cd supplyhive-project
```

```
touch .env
```
Add your Database connect uri in the ```.env``` file created:
```DB_CONNECT=<your uri>```

Run:
```
npm install
npm start
```
Go to Postman or any other API testing platform and start testing the endpoints.
The documents will be created as endpoints are tested.

## REST API

### Example structure and endpoints for this API are described below:

### Sample endpoint examples for CUSTOMER model
``` POST localhost:3000/customers```
```
{
    name": "Tirth Patel",
    "phone": "312-459-3793",
    "email": "pateltirth0517@gmail.com"
}
```
### Response
```
{
    "name": "Tirth Patel",
    "phone": "312-459-3793",
    "email": "pateltirth0517@gmail.com",
    "repairs": [],
    "_id": "6178924ce62be1ec7be21e3f",
    "createdAt": "2021-10-26T23:42:04.191Z",
    "updatedAt": "2021-10-26T23:42:04.191Z",
    "__v": 0
}
```
#### NOTE: ```repairs``` should not be specifed when creating a customer. ```repairs``` for a customer are created through ``` POST localhost:3000/repairs```.

``` GET localhost:3000/customers```
### Response 
```
[
    {
        "_id": "6178748fcfaee206902c6ddf",
        "name": "Tirth Patel",
        "phone": "312-459-3793",
        "email": "pateltirth0517@gmail.com",
        "repairs": [],
        "createdAt": "2021-10-26T21:35:11.655Z",
        "updatedAt": "2021-10-26T22:10:18.549Z",
        "__v": 1
    },
    {
        "_id": "61787815b7e7d79ad07a8c25",
        "name": "Marco Meier",
        "phone": "432-586-9517",
        "email": "mmeierj@rambler.ru",
        "repairs": [],
        "createdAt": "2021-10-26T21:50:13.146Z",
        "updatedAt": "2021-10-26T21:50:13.146Z",
        "__v": 0
    }
 ]
```
``` GET localhost:3000/customers/61787815b7e7d79ad07a8c25```
### Response 
```
{
    "_id": "61787815b7e7d79ad07a8c25",
    "name": "Marco Meier",
    "phone": "432-586-9517",
    "email": "mmeierj@rambler.ru",
    "repairs": [],
    "createdAt": "2021-10-26T21:50:13.146Z",
    "updatedAt": "2021-10-26T21:50:13.146Z",
    "__v": 0
}
```

``` PUT localhost:3000/customers/61787815b7e7d79ad07a8c25```
```
{
    "phone": "986-754-5454"
}
```
### Response 
```
{
    "_id": "61787815b7e7d79ad07a8c25",
    "name": "Marco Meier",
    "phone": "986-754-5454",
    "email": "mmeierj@rambler.ru",
    "repairs": [],
    "createdAt": "2021-10-26T21:50:13.146Z",
    "updatedAt": "2021-10-26T23:49:39.340Z",
    "__v": 0
}
```
``` DELETE localhost:3000/customers/6178748fcfaee206902c6ddf```
### Response 
```
{
   deletedCount: 1
}
```

### Sample endpoint examples for INVENTORY model

``` POST localhost:3000/inventory```
```
 "category": "accessories",
"description": "Lumina Micro 650 Rechargeable Front Bike Light",
"manufacturer": "Nite-Rider",
"price": "59.99",
"total_available": 8,
```
### Response 
```
 {
"_id": "61787ae5b7e7d79ad07a8c41",
"category": "accessories",
"description": "Lumina Micro 650 Rechargeable Front Bike Light",
"manufacturer": "Nite-Rider",
"price": "59.99",
"total_available": 8,
"repair_scheduled": [],
"createdAt": "2021-10-26T22:02:13.563Z",
"updatedAt": "2021-10-26T22:02:13.563Z",
"__v": 0
    }
```
```repair_scheduled``` can also be specified as an array of ids from repair document given that the repair already exists in repair document. This will add this inventory item as ```inventoryRequired``` to repair document. Follow along..


``` GET localhost:3000/inventory```

### Response 
```
[
    {
        "_id": "617876b4b7e7d79ad07a8c17",
        "category": "bicyle",
        "description": "supercaliber 9.8 GX",
        "manufacturer": "Trek Corporation",
        "price": "7000",
        "total_available": 2,
        "repair_scheduled": [
            "6178778db7e7d79ad07a8c1e"
        ],
        "createdAt": "2021-10-26T21:44:20.230Z",
        "updatedAt": "2021-10-26T22:07:24.978Z",
        "__v": 1
    },
    {
        "_id": "617879a2b7e7d79ad07a8c34",
        "category": "parts",
        "description": "Brake",
        "manufacturer": "Centurion",
        "price": "250",
        "total_available": 9,
        "repair_scheduled": [
            "61787d57b7e7d79ad07a8c6c"
        ],
        "createdAt": "2021-10-26T21:56:50.283Z",
        "updatedAt": "2021-10-26T22:12:39.198Z",
        "__v": 1
    },
    {
        "_id": "61787a21b7e7d79ad07a8c39",
        "category": "accessories",
        "description": "Combo lock",
        "manufacturer": "Kryptonite",
        "price": "30.99",
        "total_available": 15,
        "repair_scheduled": [],
        "createdAt": "2021-10-26T21:58:57.886Z",
        "updatedAt": "2021-10-26T21:58:57.886Z",
        "__v": 0
    },
    {
        "_id": "61787a67b7e7d79ad07a8c3d",
        "category": "accessories",
        "description": "Front Fender",
        "manufacturer": "X-Mud",
        "price": "20.99",
        "total_available": 3,
        "repair_scheduled": [],
        "createdAt": "2021-10-26T22:00:07.157Z",
        "updatedAt": "2021-10-26T22:00:07.157Z",
        "__v": 0
    },
    {
        "_id": "61787ae5b7e7d79ad07a8c41",
        "category": "accessories",
        "description": "Lumina Micro 650 Rechargeable Front Bike Light",
        "manufacturer": "Nite-Rider",
        "price": "59.99",
        "total_available": 8,
        "repair_scheduled": [],
        "createdAt": "2021-10-26T22:02:13.563Z",
        "updatedAt": "2021-10-26T22:02:13.563Z",
        "__v": 0
    },
    {
        "_id": "61787b37b7e7d79ad07a8c45",
        "category": "parts",
        "description": "Forte TerraMax Wheels",
        "manufacturer": "TerraMax",
        "price": "129.99",
        "total_available": 10,
        "repair_scheduled": [],
        "createdAt": "2021-10-26T22:03:35.812Z",
        "updatedAt": "2021-10-26T22:03:35.812Z",
        "__v": 0
    },
    {
        "_id": "61787b75b7e7d79ad07a8c49",
        "category": "parts",
        "description": "SPD-SL Road Cleats",
        "manufacturer": "Shimano",
        "price": "30.99",
        "total_available": 1,
        "repair_scheduled": [],
        "createdAt": "2021-10-26T22:04:37.899Z",
        "updatedAt": "2021-10-26T22:48:54.271Z",
        "__v": 2
    }
]
```
``` GET localhost:3000/inventory/61787ae5b7e7d79ad07a8c41```
### Response
```
{
        "_id": "61787ae5b7e7d79ad07a8c41",
        "category": "accessories",
        "description": "Lumina Micro 650 Rechargeable Front Bike Light",
        "manufacturer": "Nite-Rider",
        "price": "40.99",
        "total_available": 5,
        "repair_scheduled": [],
        "createdAt": "2021-10-26T22:02:13.563Z",
        "updatedAt": "2021-10-26T22:02:13.563Z",
        "__v": 0
    }
```

``` PUT localhost:3000/inventory/61787ae5b7e7d79ad07a8c41```
``` 
"price": "40.99",
"total_available": 5
```
### Response
```
{
        "_id": "61787ae5b7e7d79ad07a8c41",
        "category": "accessories",
        "description": "Lumina Micro 650 Rechargeable Front Bike Light",
        "manufacturer": "Nite-Rider",
        "price": "40.99",
        "total_available": 5,
        "repair_scheduled": [],
        "createdAt": "2021-10-26T22:02:13.563Z",
        "updatedAt": "2021-10-26T22:02:13.563Z",
        "__v": 0
    }
```
``` DELETE localhost:3000/inventory/61787ae5b7e7d79ad07a8c41```
### Response 
```
deletedCount: 1

```
``` POST localhost:3000/repairs ```
```
{
"scheduledDate": "2021-09-30T21:44:20.230Z",
"customer": "617878f4b7e7d79ad07a8c2f",
"description": "fix brake",
"inventoryRequired": [
    "617879a2b7e7d79ad07a8c34"
]
}
```
#### Note: To schedule a repair as above, the following conditions should be true, else it will throw error:
1) The ```customer``` should exist in customer document.
2) Inventory id / ids specified in ```inventoryRequired``` should exist in the inventory document. 
3) The specified inventory ids should have a ```total_available``` count of greater than 0 to schedule a repair. 
If scheduled date is not provided,  default scheduled date is current time + 1 day.
After properly scheduling the repair, corresponding customer document will be updated with this ```repairs```. A customer can have multiple repairs scheduled. 
The corresponding inventory items will also be updated with ```repair_scheduled``` denoting that the item is scheduled for a repair. 
Also, the total available count of inventory item/items required for this repair will be decremented by 1. 

``` GET localhost:3000/repairs ```
```
[
    {
        "_id": "6178778db7e7d79ad07a8c1e",
        "scheduledDate": "2021-10-27T21:44:20.230Z",
        "customer": "6178748fcfaee206902c6ddf",
        "description": "buy bicycle",
        "inventoryRequired": [
            "617876b4b7e7d79ad07a8c17"
        ],
        "__v": 0
    },
    {
        "_id": "61787d57b7e7d79ad07a8c6c",
        "scheduledDate": "2021-09-30T21:44:20.230Z",
        "customer": "617878f4b7e7d79ad07a8c2f",
        "description": "fix brake",
        "inventoryRequired": [
            "617879a2b7e7d79ad07a8c34"
        ],
        "__v": 0
    }
]
```
``` GET localhost:3000/repairs/6178778db7e7d79ad07a8c1e ```
### Response 
```
{
    "_id": "6178778db7e7d79ad07a8c1e",
    "scheduledDate": "2021-10-27T21:44:20.230Z",
    "customer": "6178748fcfaee206902c6ddf",
    "description": "buy bicycle",
    "inventoryRequired": [
        "617876b4b7e7d79ad07a8c17"
    ],
    "__v": 0
}
```
``` PUT localhost:3000/repairs/6178778db7e7d79ad07a8c1e ```
``` 
{
"customer": "6178748fcfaee206902c6ddf"
"description": "fix brake and bicyle",
"inventoryRequired": [
    "617879a2b7e7d79ad07a8c34", "617876b4b7e7d79ad07a8c17"
]
}
```
### Note: The same conditions about inventory required explained above should be true here as well. It is important to provided the ```customer``` when updating a repair. Otherwise, it will give an error. It is assumed that customer associated with this repair earlier does not change during update.
If the repair is updated with new inventory items, then only decrement the count of newly added inventory items in inventory document and associate that item with this repair. 

``` DELETE localhost:3000/repairs/6178778db7e7d79ad07a8c1e ```

# Response
``` 
deletedCount: 1
```
### Note: If a repair is deleted, the repair will also be deleted from the customer associated with this repair. Also the inventory items associated with this repairs will be returned to inventory and their availabilty will be incremented. 

``` POST localhost:3000/repairs/61787d57b7e7d79ad07a8c6c/schedule ```

``` 
{
scheduledDate : "2021-08-30T21:44:20.230Z"
}
```

### Response 

``` 
{
    "_id": "61787d57b7e7d79ad07a8c6c",
    "scheduledDate": "2021-08-30T21:44:20.230Z",
    "customer": "617878f4b7e7d79ad07a8c2f",
    "description": "fix brake",
    "inventoryRequired": [
        "617879a2b7e7d79ad07a8c34"
    ],
    "__v": 0
}
```

