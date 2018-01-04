* ```npm install```
* ```npm run dev``` runs webpack dev server at ```http://127.0.0.1:8080/```
* ```npm run build:dev``` builds dev version of the app using ```awesome-typescript``` loader
* ```npm run build:prod``` builds prod version of the app using ```ngtools/webpack``` loader

Steps to reproduce:
1. build dev and prod versions of the app
2. open ```dev/vendor.js``` file and search for ```store/init``` string, confirm that all es6/typescript was transpiled to es5
3. open ```prod/vendor.js``` file and search for ```store/init``` string, locate following es6 expression ```class ActionsSubject extends __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"] {``` 
