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
module.exports = FireBox;
