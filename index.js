// const init_firebase = require('./src/init/_init.js');
const createNewDocs = require('./src/set/create_docs.js');
class FireBox {
    constructor(admin) {
        this.admin = admin;
        this.firestore = () => admin.firestore();
    }
    create({ path, key, value }) {
        return new createNewDocs(this.admin, path).save(key, value);
    }
}

module.exports = FireBox;