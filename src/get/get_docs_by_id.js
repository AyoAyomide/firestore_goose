const fieldLocation = require("../helpers/@fieldLocation");
class GetDocsByID {
    constructor(admin, path) {
        this.collectionPath = path;
        this.firestore = () => admin.firestore();
    }
    async locationToDocPath(fieldPath, key) {
        let query, docs;
        query = this.firestore().doc(`${this.collectionPath}/${fieldPath}`);
        docs = await query.get();
        if (!docs.exists) throw 'key not found document';
        return docs.data()[key];
    }
    async execute(key) {
        let fieldPath, docData;
        fieldPath = await fieldLocation(this.firestore(), this.collectionPath, key);
        docData = await this.locationToDocPath(fieldPath, key);
        return docData;
    }
}
module.exports = GetDocsByID;