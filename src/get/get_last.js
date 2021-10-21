const getMetaData = require("../helpers/@getCollMeta");

class GetDocsByID {
    constructor(admin, path) {
        this.collectionPath = path;
        this.firestore = () => admin.firestore();
    }
    async execute() {
        return await getMetaData(this.firestore(), this.collectionPath);
    }
}

module.exports = GetDocsByID;