# REST API Bicycle Shop

#### Tech Stack: Express, MongoDB, Mongoose ODM, Postman.

This is a REST API for a fictional bicycle shop allowing seamless scheduling of repairs and managing inventory for customers. 

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
