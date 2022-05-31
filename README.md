# firestore_goose

The firestore_goose is library for working with firestore. it makes it easy to work with firestore.<br>
it built on top of [firsbase-admin](https://www.npmjs.com/package/firebase-admin). You still need to understand the basics of firestore to use this library it main purpose is to make it easy using firestore

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

## Example 1 - Adding data

```js
let userCollection = "user";
let userID = "John";
let userDetails = {
  lastName: "Doe",
  age: 20,
  kidsNames: ["Jam", "Mike"],
  weeklyCars: { monday: "ferrari", tuesday: "benz" },
};

let query = {
  path: userCollection, //firestore collection
  key: userID, // firestore fieldKey
  value: userDetails, // firestore fieldValue
};
fireSG.add(query).then((response) => {
  console.log(response);
});
// save another data
let query2 = { path: userCollection, key: "Jane", value: "Doe" };
fireSG.add(query2).then((response) => {
  console.log(response);
});

/*
--response--
{
  id: '5t7AyoVQOgOhXap63wtW',
  data: {
    John: {
      kidsNames: [Array],
      lastName: 'Doe',
      weeklyCars: [Object],
      age: '20'
    },
  }
}
*/
```
**NOTE** 

To overwrite a field you use `fireSG.add(query,{force:true})`
This will overwrite the existing field data

- **id** : The document id
- **data** : The document data

---

## Example 2 - Adding data using transaction

```js
let detailsToUpdate = "random data";
query = {
  path: userCollection, //firestore collection
  value: detailsToUpdate // firestore nested field value
};
fireSG.addWithTransaction(query);
/*
it stores items in an array using firebase transaction
*/
```

- **value** : The data we want to add to transaction array

---

## Example 3 - Updating data

**Note:** Only existing document can be updated

```js
let detailsToUpdate = "age";
let updatedAge = 35;
query = {
  path: userCollection, //firestore collection
  key: userID, // firestore fieldKey
  childObject: detailsToUpdate, // firestore nested field Key
  value: updatedAge, // firestore nested field value
};
fireSG.updateByID(query);
/*
--response--
John.age updated successfully

--output--
John.age = 35
*/
```

- **childObject** : The nested field object key we want to update

---

## Example 4 - Update : add to nested object

```js
detailsToUpdate = "weeklyCars.wednesday";
let updatedCar = "bmw";
query = {
  path: userCollection, //firestore collection
  key: userID, // firestore fieldKey
  childObject: detailsToUpdate, // firestore nested field Key
  value: updatedCar, // firestore nested field value
};
fireSG.updateByID(query);
/*
--response--
John.weeklyCars.wednesday updated successfully
--output--
John.weeklyCars = { monday: 'ferrari', tuesday: 'benz', wednesday: 'bmw' }
*/
```

---

## Example 5 - Update : add new value to array

```js
detailsToUpdate = "kidsNames";
let childToAdd = "Jerry";
query = {
  path: userCollection, //firestore collection
  key: userID, // firestore fieldKey
  childArrayAdd: detailsToUpdate, // firestore nested field array Key
  value: childToAdd, // firestore nested field array value
};
fireSG.updateByID(query);
/*
--response--
John.kidsNames updated successfully

--output--
John.kidsNames = ['Jam', 'Mike', 'Jerry']
*/
```

---

## Example 6 - Update : remove value from array

```js
detailsToUpdate = "kidsNames";
let childToRemove = "Mike";
query = {
  path: userCollection, //firestore collection
  key: userID, // firestore fieldKey
  childArrayRemove: detailsToUpdate, // firestore nested field array Key
  value: childToRemove, // firestore nested field array value
};
fireSG.updateByID(query);
/*
--response--
John.kidsNames updated successfully

--output--
John.kidsNames = ['Jam', 'Jerry']
*/
```

---

## Example 7 - Get : field by id

```js
query = {
  path: userCollection, //firestore collection
  key: userID, // firestore fieldKey
};
fireSG.getByID(query);
/*
--response--
{
  lastName: 'Doe',
  weeklyCars: { tuesday: 'benz', monday: 'ferrari' },
  age: 35,
  kidsNames: [ 'Jam', 'Jerry' ]
}
*/
```

- **response** : it returns only one field data

---

## Example 8 - Get : find value in transaction

```js
query = {
  path: userCollection, //firestore collection
  key: userID, // firestore fieldKey
};
fireSG.getByID(query);
/*
--response--
{
  lastName: 'Doe',
  weeklyCars: { tuesday: 'benz', monday: 'ferrari' },
  age: 35,
  kidsNames: [ 'Jam', 'Jerry' ]
}
*/
```

- **response** : it returns only one field data

---

## Example 9 - Get : all field in a collection

```js
query = {
  path: userCollection, //firestore collection
  value: detailsToFind // firestore nested field value
};
fireSG.findValueInTransaction(query);
/*
--response--
{
  
  John.txId: [ '5t7AyoVQOgOhXap63wtW' ]
}
*/
```

---

## Example 9 - Get : all value in transaction

```js
query = {
  path: userCollection, //firestore collection
};
fireSG.getAll(query);
/*
--response--
{
  
  John.txId: [...],
}
*/
```

---

## Example 10 - Get : last document in the collection

```js
query = {
  path: userCollection, //firestore collection
};
fireSG.getLast(query);
/*
--response--
{
  
  John: {...},
  Jane: ...
}
*/
```

---

## Example 11 - Delete : field by id

```js
userID = "Jane";
query = {
  path: userCollection, //firestore collection
  key: userID, // firestore fieldKey
};
fireSG.delete(query);
/*
--response--
Jane deleted successfully
*/
```

## Example 12 - Delete : a value in a nested field

```js
userID = "John";
detailsToUpdate = "weeklyCars.tuesday";
query = {
  path: userCollection, //firestore collection
  key: userID, // firestore fieldKey
  childObject: detailsToUpdate, // firestore nested field Key
};
fireSG.delete(query);
/*
--response--
John.weeklyCars.tuesday deleted successfully
--output--
John.weekly = { monday: 'ferrari' }
*/
```
