# vue-warehouse-sap
Register warehouse consumptions and returns in SAP.

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


## SAP side (not in this repository): 
APIs implemented: get lgort, get materials, post material movements. 


Steps: 
* create a service (SICF)
* create a class handler and setup in the service created. this class works like a router. 
* create a class resource to implement each API. 
* set system parameter icf/cors_enabled to 1.
* configure CORS whitelist in transaction UCONCOCKPIT 

