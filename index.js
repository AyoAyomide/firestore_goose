const init_firebase = require('./src/init/_init.js');
const random = require('./src/devstools/random');
// const bytesToSize = require('./src/devstools/byteToSize');
// const looper = require('./src/devstools/loop');

const addToDocs = require('./src/set/add_to_docs.js');
const addToDocsWithTransaction = require('./src/set/add_to_doc_with_transaction.js');
const updateDocs = require('./src/set/update_by_id');
const deleteDocs = require('./src/set/delete_by_id');
const getDocsByID = require('./src/get/get_docs_by_id');
const getAllTransaction = require('./src/get/get_from_transaction');
const getAllDocs = require('./src/get/get_all_docs');
const getLast = require('./src/get/get_last');
class FirestoreGoose {
    constructor(admin) {
        this.admin = admin;
    }
    add({ path, key, value, maxHeight }, { force = false } = {}) {
        return new addToDocs(this.admin, path, maxHeight).execute(key, value, force);
    }
    addWithTransaction({ path, value, maxHeight }) {
        return new addToDocsWithTransaction(this.admin, path, maxHeight).execute(value);
    }
    updateByID({ path, key, childObject, childArrayAdd, childArrayRemove, value }) {
        return new updateDocs(this.admin, path).execute({ key, childObject, childArrayAdd, childArrayRemove, value });
    }
    delete({ path, key, childObject }) {
        return new deleteDocs(this.admin, path).execute(key, childObject);
    }
    getByID({ path, key }) {
        return new getDocsByID(this.admin, path).execute(key);
    }
    getAll({ path }) {
        return new getAllDocs(this.admin, path).execute();
    }
    getAllFromTransaction({ path }) {
        return new getAllTransaction(this.admin, path).getAllCollectionDoc();
    }
    findValueInTransaction({ path, value }) {
        return new getAllTransaction(this.admin, path).findDataInColl(value);
    }
    getLast({ path }) {
        return new getLast(this.admin, path).execute();
    }
}

let test = new FirestoreGoose(init_firebase());

let path = 'user';
// let key = "sam";
let value = random();

// looper(3, () => {
//     let key = random();
//     let value = random();
//     test.add({ path, key, value })
// });
let data = {
        "ySujRpRyfm6hE2oofX5e": ['5EogN', '5EogN', '5EogN', '5EogN', '5EogN'],
        "ySujRpRyfm6hE2oofX5p": ['5EogN', '5EogN', '5EogN', '5EogN', '5EogN']
    }
    // test.add({ path, key, value }, { force: true })
    // test.addWithTransaction({ path, value })
    // let sample = Buffer.byteLength(JSON.stringify(data));
    // console.log(bytesToSize(sample));
    // test.add({ path, key, value, maxHeight: 1 })
    // test.getLast({ path, key: 'sam' })
    // test.getByID({ path, key: 'sam' })
    // test.getAll({ path })
    // test.getAllFromTransaction({ path })
    // test.findValueInTransaction({ path, value: "VAawR" })
    // test.updateByID({ path, key: 'sam', childObject: 'wifes.jan5', value })
    // test.updateByID({ path, key: 'sam', childArrayAdd: 'wifes', value })
    // test.updateByID({ path, key: 'sam', childArrayRemove: 'wifes', value: "sakpokl" })
    // test.delete({ path, key: 'sam' })
    // test.delete({ path, key: 'sam', childObject: 'wifes.jan5' })
    // .then(data => { console.log(data) })
    // .catch(data => { console.log(data) })

// module.exports = FireBox;

// docs.forEach((docs) => {
//     if (docs.id != 'location') { result = docs.id; }
// })
// if (!result) throw 'key not found in location Document';
// console.log(result);
// return result;