class GetFromTransactions {
    constructor(admin, path) {
        this.collectionPath = path;
        this.firestore = () => admin.firestore();
    }
    async getAllCollectionDoc() {
        try {
            let CollectionDocument = await this.firestore().collection(this.collectionPath).get();
            let docReference = CollectionDocument.docs.map(doc => (doc.data().txIDs));
            return docReference.flat(1);
        } catch (e) { throw "Unable to get collection data"; }
    }
    async findDataInColl(data) {
        let collDocs = await this.getAllCollectionDoc();
        return collDocs.includes(data);
    }
}

module.exports = GetFromTransactions;