const addToDocs = require('./src/set/add_to_docs.js');
class FireBox {
    constructor(admin) {
        this.admin = admin;
    }
    add({ path, key, value }) {
        return new addToDocs(this.admin, path).save(key, value);
    }
}
module.exports = FireBox;
