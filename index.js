const addToDocs = require('./src/set/add_to_docs.js');
const updateDocs = require('./src/set/update_by_id');
const deleteDocs = require('./src/set/delete_by_id');
const getDocsByID = require('./src/get/get_docs_by_id');
const getAllDocs = require('./src/get/get_all_docs');
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
}
module.exports = FirestoreGoose;
