const init_firebase = require('./src/init/_init.js');
const random = require('./src/devstools/random');
const looper = require('./src/devstools/loop');

const addToDocs = require('./src/set/add_to_docs.js');
const getDocsByID = require('./src/get/get_docs');
class FireBox {
    constructor(admin) {
        this.admin = admin;
    }
    add({ path, key, value }) {
        return new addToDocs(this.admin, path).save(key, value);
    }
    getByID({ path, key }) {
        return new getDocsByID(this.admin, path).get(key);
    }
}
let path = { collPath: 'user' };
let test = new FireBox(init_firebase());

let key = random();
let value = random();
// test.add({ path, key, value })
//     .then(data => { console.log(data) })
//     .catch(error => console.log(error));

// looper(3, () => {
//     let key = random();
//     let value = random();
//     test.add({ path, key, value })
// });

test.getByID({ path, key: 'aq8ZN' })
    .then(data => { console.log(data) })

// module.exports = FireBox;