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
let FirestoreGoose = require("firestore_goose");
```

### Basic Usage

```js
let fireSG = new FirestoreGoose(firebaseAdmin);
```

**firebaseAdmin** : The initialize firebase admin instance

#### Example 1 - Adding data

```js
let path = { collPath: "user/jame/transaction" };
let fireSG = new FirestoreGoose(firebaseAdmin);
```
