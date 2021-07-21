# vue-warehouse-sap
Register warehouse consumption, sign it, send data to SAP and create material movement, print pdf signed.

## Vue app 
connected to SAP via API REST using Axios. 
validate warehouse, add materials list, select kind of document and create material movements.

### Use: 
* vue 3
* Axios
* vue-toastification 
* vue-signature
* bootstrap 5
* font awesome

### Proyect setup
Compiles and hot-reloads for development
```
npm install
npm run serve 
```
Compiles and minifies for production
```
npm run build
```
Lints and fixes files
```
npm run lint
```


## SAP ABAP side (not in this repository): 
APIs implemented: verify user and password, get lgort, get materials, post material movements. 


Steps: 
* create a service in SICF transaction.
* create a handler class and setup it in the service created before. this class works like a router. 
* create a resource class to implement each API. 
* set system parameter icf/cors_enabled to 1 in RZ10 transaction.
* configure CORS whitelist in UCONCOCKPIT transaction. 

