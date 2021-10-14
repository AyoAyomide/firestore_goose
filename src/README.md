# firestore_goose

The firestore_goose library is  optimizes how you communicate with the Cloud Firestore database.   
As a by-product, it minimizes any firestore related algorithm in your codebase.



# Why use firestore_goose?

- It organizes the structure of your data to minimize firebase billing.
- It reduces firestore-optimization related algorithms to a maximum of 5 lines of code.
- It is perfect for storing large amounts of data
- It does not depend on the firebase-admin library
- It is light, and contains all the CRUD operations from the firestore admin-sdk
- It supports ES6 syntax



# Installation

### Using npm
```bash
npm install firestore_goose 
```

### Using yarn
```bash
yarn add firestore_goose
```



# Usage

### Import it

```js 
// ES5
const Firebox = require('firestore_goose')
```

```js 
// ES6
import Firebox from 'firestore_goose'
```

### Add or create a document

```js
// make sure you import the firebase-admin sdk, also make sure it is initialized
// e.g import admin from 'firebase-admin'
 await new FireBox(admin.app()).add({
            path: { collPath: 'my_collection' },
            key: 'field_1',
            value: {foo: 'bar'}
        })

// note that if the key exists, it'll throw an error
```

### Get a single field from a document

```js
await new FireBox(admin.app()).getByID({ 
    path: { collPath: 'my_collection' },
    key: 'field_1' 
    })
// it will return {foo: 'bar'}
```

### Get all the values in a collection

```js
await new FireBox(admin.app()).getAll({ 
    path: { collPath: 'my_collection' } 
    })
// it will return {foo: 'bar'}
// if there are multiple documents, it will return everything in a single object
```

### Update data in a document

```js
await new FireBox(admin.app()).updateByID({
                path: { collPath: 'my_collection' },
                key: 'field_1',
                value: 'baz'
            })
// if the key doesn't exist, it will throw an error

// for nested object, use the childObject property and pass the path to the exact field you want to update e.g
await new FireBox(admin.app()).updateByID({
                path: { collPath: 'my_collection' },
                key: 'field_1',
                childObject: 'bar.baz.boo'
                value: 'bee'
            })
// you can add to an existing array, just path the path to the exact field that contains the array
await new FireBox(admin.app()).updateByID({
                path: { collPath: 'my_collection' },
                key: 'field_1',
                childArrayAdd: 'bar.baz.boo'
                value: ['bee', 'buu', 'bii']
            })
// you can also delete an array, as usual, pass the path to the array
await new FireBox(admin.app()).updateByID({
                path: { collPath: 'my_collection' },
                key: 'field_1',
                childArrayRemove: 'bar.baz.boo'
                value: ['bee', 'buu', 'bii']
            })
// note that you cannot use childObject, childArrayAdd, and childArrayRemove at the same time, it can only be used one at a time 
```

### Delete data in a document

```js
await new Firebox(admin.app()).delete({
        path: { collPath: 'my_collection' },
        key: cardName,
        childObject: `.bar.baz.boo`
        })
// simply pass the path to the exact field that needs to be deleted
```

# License
Copyright © 2021 Ayomide Samuel Released under the MIT license

# Credits
firestore_goose was created by Ayomide Samuel   
firestore_goose is maintained by Ayomide Samuel, Mitchel Febechukwu  and other Contributors