const chai = require("chai")
const init = require('./devtools/init');
const addToDocs = require('../src/set/add_to_docs');
const updateByID = require('../src/set/update_by_id');

const admin = init();
let expect = chai.expect
chai.use(require('chai-as-promised'))

describe('UpdateByID', () => {

    let userCollection = "user";
    let userID = "Name";
    let query;
    // setup database for test
    const addToDocsTest = new addToDocs(admin, userCollection);
    const updateByIDTest = new updateByID(admin, userCollection);

    context('Update single field', () => {
        it('Should update a document in the collection', async() => {
            await addToDocsTest.execute(userID, "Samuel James", true);
            query = {
                path: userCollection,
                key: userID,
                value: "John Doe",
            };
            let result = await updateByIDTest.execute(query);
            expect(result).to.equal(userID + " updated successfully");
        })
    })
    context('Update nested field', () => {
        it('Should update a nested document in a collection', async() => {
            await addToDocsTest.execute(userID, { 'wife': 'Jane Doe', 'age': 32 }, true);
            query = {
                path: userCollection, //firestore collection
                key: userID, // firestore fieldKey
                childObject: 'wife.age', // firestore nested field Key
                value: 100, // firestore nested field value
            };
            let result = await updateByIDTest.execute(query);
            expect(result).to.equal(`${query.key}.${query.childObject} updated successfully`);
        })
    })
    context('Update value in array: ADD', () => {
        it('Should append new value to array in a document', async() => {
            await addToDocsTest.execute(userID, { 'kids': ['mike', 'jane', 'jerry'] }, true);
            query = {
                path: userCollection, //firestore collection
                key: userID, // firestore fieldKey
                childArrayAdd: 'kids', // firestore nested field array Key
                value: 'solomon', // firestore nested field array value
            };
            let result = await updateByIDTest.execute(query);
            expect(result).to.equal(userID + " updated successfully");
        })
    })
    context('Update value in array: REMOVE', () => {
        it('Should remove existing value from array in a document', async() => {
            query = {
                path: userCollection, //firestore collection
                key: userID, // firestore fieldKey
                childArrayRemove: 'kids', // firestore nested field array Key
                value: 'solomon', // firestore nested field array value
            };
            let result = await updateByIDTest.execute(query);
            expect(result).to.equal(userID + " updated successfully");
        })
    })
})