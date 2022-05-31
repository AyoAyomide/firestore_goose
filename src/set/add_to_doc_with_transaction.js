class AddToDocWithTransaction {
    constructor(admin, path, maxHeight = 6000) {
        this.collectionPath = path;
        this.arrayLength = maxHeight;
        this.firestore = () => admin.firestore();
    }
    async setToNewDoc() {
        let NewDoc = await this.firestore().collection(this.collectionPath).add({
            txIDs: [],
            height: 1
        });
        return NewDoc.id;
    }

    async getIncompleteDoc() {
        let CollectionDocument = await this.firestore().collection(this.collectionPath).where('height', '<', this.arrayLength).limit(1).get();
        let docReference = CollectionDocument.docs[0];
        let docID;
        if (docReference !== undefined) docID = docReference.id;
        else { docID = await this.setToNewDoc(); }
        return this.firestore().collection(this.collectionPath).doc(docID)
    }

    async execute(fieldData) {
        let docReference = await this.getIncompleteDoc();
        try {
            if (docReference) return await this.firestore().runTransaction(async(transaction) => {
                const doc = await transaction.get(docReference);
                const height = doc.data().height + 1;
                if (height <= this.arrayLength) {
                    const docKeys = doc.data().txIDs;
                    if (!docKeys.includes(fieldData)) {
                        docKeys.push(fieldData);
                        transaction.update(docReference, {
                            txIDs: docKeys,
                            height: docKeys.length
                        })
                    }
                }
            });
            else {
                throw "Invalid document"
            }
        } catch (e) { throw "Unable to save data"; }
    }
}

module.exports = AddToDocWithTransaction;