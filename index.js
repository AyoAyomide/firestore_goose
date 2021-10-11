// const init_firebase = require('./src/init/_init.js');
const setNew = require('./src/set/set_docs.js');
class FireBox {
    constructor(admin) {
        this.admin = admin;
        this.firestore = () => admin.firestore();
    }
    set({ path, key, value }) {
        return new setNew(this.admin, path).save(key, value);
    }
}

module.exports = FireBox;