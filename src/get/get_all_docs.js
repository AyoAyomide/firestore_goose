class GetAllDocs {
    constructor(admin, { collPath }) {
        this.collPath = collPath;
        this.firestore = () => admin.firestore();
    }
    async get() {
        let result, query, docs;
        query = this.firestore().collection(this.collPath);
        docs = await query.get();
        docs.forEach((docs) => {
            if (docs.id != 'location') { result = { ...result, ...docs.data() }; }
        })
        delete result.height;
        return result;
    }
}
module.exports = GetAllDocs;