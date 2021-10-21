const init_firebase = require('./src/init/_init.js');
const random = require('./src/devstools/random');
const bytesToSize = require('./src/devstools/byteToSize');
// const looper = require('./src/devstools/loop');

const addToDocs = require('./src/set/add_to_docs.js');
const updateDocs = require('./src/set/update_by_id');
const deleteDocs = require('./src/set/delete_by_id');
const getDocsByID = require('./src/get/get_docs_by_id');
const getAllDocs = require('./src/get/get_all_docs');
const getLast = require('./src/get/get_last');
class FirestoreGoose {
    constructor(admin) {
        this.admin = admin;
    }
    add({ path, key, value }) {
        return new addToDocs(this.admin, path).execute(key, value);
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
    getLast({ path, key }) {
        return new getLast(this.admin, path).execute(key);
    }
}

let test = new FirestoreGoose(init_firebase());

let path = 'user';
let key = random();
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
let sample = Buffer.byteLength(JSON.stringify(data));
// console.log(bytesToSize(sample));
// test.add({ path, key, value })
// test.getLast({ path, key: 'BoX3q' })
    // test.getByID({ path, key: 'B4bsd' })
    // test.getAll({ path })
    // test.updateByID({ path, key: 'sam', childObject: 'wifes.jan5', value })
    // test.updateByID({ path, key: 'NR9eA', childArrayAdd: 'wifes', value: "sa2k" })
    // test.updateByID({ path, key: 'NR9eA', childArrayRemove: 'wifes', value: "sakpokl" })
    // test.delete({ path, key: 'aq8ZN' })
    // test.delete({ path, key: 'sam', childObject: 'wifes.jan2' })
    // .then(data => { console.log(data) })
    // .catch(data => { console.log(data) })

// module.exports = FireBox;

// docs.forEach((docs) => {
//     if (docs.id != 'location') { result = docs.id; }
// })
// if (!result) throw 'key not found in location Document';
// console.log(result);
// return result;