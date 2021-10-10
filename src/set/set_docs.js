const admin = require('firebase-admin');
const db = admin.firestore();
const getHeight = require('../helpers/@getHeight');
class SetDocs {
    constructor({ collPath, docPath }) {
        this.docPath = docPath;
        this.collPath = collPath;
    }
    async doesNotExist({ collPath, docPath }) {
        let path;
        if (collPath) path = collPath;
        if (docPath) {
            let docToArray = docPath.split('/');
            docToArray.pop();
            path = docToArray.toString();
        }
        this.height = await getHeight(path);
        if (this.height) throw "document already exist";
    }
    getDocPath(path) {
        if (path) return db.doc(path);
    }
    getCollToDocPath(path) {
        if (path) return db.collection(path).doc();
    }
    async save(key, value) {
        try {
            await this.doesNotExist({ collPath: this.collPath, docPath: this.docPath });
            let dbPath = this.collPath ? await this.getCollToDocPath(this.collPath) : this.getDocPath(this.docPath);
            let genesisData = { height: 1, [key]: value };
            await dbPath.set(genesisData);
        }
        catch (error) {
            console.log(error);
        }
    }
}
module.exports = SetDocs;