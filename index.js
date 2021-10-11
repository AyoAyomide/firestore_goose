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
module.exports = FireBox;