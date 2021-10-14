# firestore_goose

The firestore_goose is library for working with firestore. it makes it easy to work with firestore.<br>
it built on top of [firsbase-admin](https://www.npmjs.com/package/firebase-admin)

## Prerequisite

- make sure you have firebase-admin installed

```bash
npm i firebase-admin
```

- make sure you have initialized your firebase project

```js
const firebaseAdmin = require("firebase-admin");
firebaseAdmin.initializeApp();
```

## Installation

### Using npm

```bash
npm i firestore_goose
```

### Node.js

```js
const FirestoreGoose = require("firestore_goose");
```

### Basic Usage

```js
const fireSG = new FirestoreGoose(firebaseAdmin);
```

**firebaseAdmin** : The initialize firebase admin instance

## Step 1 - Adding data

```js
let collectionPath = "user";
let fieldKey = "mykey";
let fieldValue = "myvalue"; // string | object| array

let query = { path: collectionPath, key: fieldKey, value: fieldValue };

fireSG.add(query).then((response) => {
  console.log(response);
});
```

**response** : All data in the collection

## Step 2a - Updating data

**Note**: Only existing fieldKey can be updated.

```js
fieldValue = { newValue: "myvalue" }; // string | object| array

query = { path: collectionPath, key: fieldKey, value: fieldValue };

fireSG.updateByID(query).then((response) => {});
```

**response** : \*successfully updated **key\***

## Step 2b - Updating nested object

```js

```
