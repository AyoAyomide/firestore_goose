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
module.exports = FirestoreGoose;