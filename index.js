// const init_firebase = require('./src/init/_init.js');
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
// // test.create({ path, key: "sam", value: "hello" });
// test.add({ path, key: "sawfs", value: "brown" })
//     .then(data => { console.log(data) })
//     .catch(error => console.log(error));
module.exports = FireBox;