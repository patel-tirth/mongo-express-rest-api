# REST API Bicycle Shop

#### Tech Stack: Express, MongoDB, Mongoose ODM, Postman.

This is a REST API for a fictional bicycle shop allowing seamless scheduling repairs and managing inventory for customers. 

To test the API, follow the steps below:

```
git clone https://github.com/patel-tirth/supplyhive-project.git
cd supplyhive-project
npm install
npm start
```


## REST API

### Example structure and endpoints for this API are described below:

``` POST localhost:3000/customers```
```
"name": "Tirth Patel",
"phone": "312-459-3793",
"email": "pateltirth0517@gmail.com"
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



