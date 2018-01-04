<!-- ❤️ ngrx? Please consider supporting our collective: 👉  [donate](https://opencollective.com/ngrx/donate) -->

## I'm submitting a...
<!-- Check one of the following options with "x" -->
<pre><code>
[ ] Regression (a behavior that used to work and stopped working in a new release)
[x] Bug report 
[ ] Feature request
[ ] Documentation issue or request
</code></pre>

## What is the current behavior?
When ```ngtools/webpack``` loader is used to compile angular app, ngrx/store is not being transpiled into es5. The result (the part of the bundle):

```
const /** @type {?} */ INIT = ('@ngrx/store/init');
/* harmony export (immutable) */ __webpack_exports__["c"] = INIT;

class ActionsSubject extends __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"] {
    constructor() {
        super({ type: INIT });
    }
    /**
     * @param {?} action
     * @return {?}
     */
    next(action) {
        if (typeof action === 'undefined') {
            throw new TypeError(`Actions must be objects`);
        }
        else if (typeof action.type === 'undefined') {
            throw new TypeError(`Actions must have a type property`);
        }
        super.next(action);
    }
    /**
     * @return {?}
     */
    complete() {
        /* noop */
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.complete();
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = ActionsSubject;

ActionsSubject.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Injectable */] },
];
```

## Expected behavior:
When ```awesome-typescript-loader``` is used (dev build) ngrx/store is being transpiled into es5:

```
var INIT = ('@ngrx/store/init');
var ActionsSubject = (function (_super) {
    __extends(ActionsSubject, _super);
    function ActionsSubject() {
        return _super.call(this, { type: INIT }) || this;
    }
    /**
     * @param {?} action
     * @return {?}
     */
    ActionsSubject.prototype.next = function (action) {
        if (typeof action === 'undefined') {
            throw new TypeError("Actions must be objects");
        }
        else if (typeof action.type === 'undefined') {
            throw new TypeError("Actions must have a type property");
        }
        _super.prototype.next.call(this, action);
    };
    /**
     * @return {?}
     */
    ActionsSubject.prototype.complete = function () {
        /* noop */
    };
    /**
     * @return {?}
     */
    ActionsSubject.prototype.ngOnDestroy = function () {
        _super.prototype.complete.call(this);
    };
    return ActionsSubject;
}(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"]));
ActionsSubject.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Injectable */] },
];
```


## Minimal reproduction of the problem with instructions:
Use the latest angular with latest ngrx/store (4.1.1) and compile the project with the latest ngtools/webpack.
Look into output bundle (ngrx/store part) to see if there are some es6 code left.

## Version of affected browser(s),operating system(s), npm, node and ngrx:
Chrome61 / IE11, Windows 7 Enterprise
```
"@angular/animations": "5.1.2",
"@angular/cdk": "5.0.2",
"@angular/cli": "1.6.3",
"@angular/common": "5.1.2",
"@angular/compiler": "5.1.2",
"@angular/compiler-cli": "5.1.2",
"@angular/core": "5.1.2",
"@angular/forms": "5.1.2",
"@angular/http": "5.1.2",
"@angular/material": "5.0.2",
"@angular/platform-browser": "5.1.2",
"@angular/platform-browser-dynamic": "5.1.2",
"@angular/router": "5.1.2",
"@ngrx/core": "1.2.0",
"@ngrx/effects": "4.1.1",
"@ngrx/store": "4.1.1",
"@ngtools/webpack": "1.9.3",
```

## Other information:

**_webpack.prod.js_**
```
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const commonConfig = require('./webpack.common.js');
const helpers = require('./webpack.helpers');

module.exports = webpackMerge(commonConfig, {
    output: {
        path: helpers.root('prod'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: '@ngtools/webpack'
            }
        ]
    },

    plugins: [
        new AngularCompilerPlugin({
            tsConfigPath: helpers.root('tsconfig.json'),
            entryModule: helpers.root('src/app/app.module#AppContainerModule')
        })
   ]
});
```

**_tsconfig.json_**
```
{
    "compilerOptions": {
        "target": "es5",
        "module": "es2015",
        "lib": ["es2015", "dom"],
        "moduleResolution": "node",
        "types": ["node", "webpack", "core-js"],
        "typeRoots": ["node_modules/@types"],
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "sourceMap": true,
        "noEmitHelpers": true,
        "baseUrl": ".",
        "paths": {
            "*": [
                "*",
                "node_modules/*",
                "src/*",
                "src/*/index.ts"
            ]
        }
    },

    "exclude": [
        "node_modules",
        "./src/**/*.spec.ts"
    ],

    "awesomeTypescriptLoaderOptions": {
        "resolveGlobs": true,
        "forkChecker": true
    },
    "compileOnSave": false,
    "buildOnSave": false,
}
```

**_app.module.ts_**
```
import {StoreModule} from '@ngrx/store';
import {reducers} from './reducers';

@NgModule({
    bootstrap: [AppContainerComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [BrowserModule,StoreModule.forRoot(reducers)]
})
export class AppContainerModule {}
```

  
