// const init_firebase = require('./src/init/_init.js');
// const random = require('./src/devstools/random');
const createNewDocs = require('./src/set/create_docs.js');
const addToDocs = require('./src/set/add_to_docs.js');
class FireBox {
    constructor(admin) {
        this.admin = admin;
    }
    create({ path, key, value }) {
        return new createNewDocs(this.admin, path).save(key, value);
    }
    add({ path, key, value }) {
        return new addToDocs(this.admin, path).save(key, value);
    }
}
// let path = { docPath: 'user/mydoc' };

// let test = new FireBox(init_firebase());
// test.create({ path, key: "sam", value: "hello" });
// for (let i = 0; i < 3; i++) {
//     let key = random();
//     let value = random();
//     setTimeout(() => {
//         test.add({ path, key, value })
//     }, 1);
// }
// test.add({ path, key, value })
//     .then(data => { console.log(data) })
//     .catch(error => console.log(error));
module.exports = FireBox;