class GetAllDocs {
    constructor(admin, path) {
        this.collectionPath = path;
        this.firestore = () => admin.firestore();
    }
    async execute() {
        let result, query, docs;
        query = this.firestore().collection(this.collectionPath);
        docs = await query.get();
        docs.forEach((docs) => {
            if (docs.id != 'location') { result = { ...result, ...docs.data() }; }
        })
        delete result.height;
        return result;
    }
}
module.exports = GetAllDocs;