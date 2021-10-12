class GetDocsByID {
    constructor(admin, { collPath }) {
        this.collPath = collPath;
        this.firestore = () => admin.firestore();
    }
    async findLocation(key) {
        let query = this.firestore().doc(`${this.collPath}/location`);
        let docs = await query.get();
        if (!docs.exists) throw 'key not found in location Document';
        return docs.data()[key];
    }
    async locationToDocPath(fieldPath, key) {
        let query = this.firestore().doc(`${this.collPath}/${fieldPath}`);
        let docs = await query.get();
        if (!docs.exists) throw 'key not found document';
        return docs.data()[key];
    }
    async get(key) {
        let fieldPath = await this.findLocation(key);
        let docData = await this.locationToDocPath(fieldPath, key);
        return docData;
    }
}
module.exports = GetDocsByID;