const ErrorHook = require('../errors/errorHook');
const metaData = require('../helpers/@getCollMeta');
const validateSave = require('./utils/validate_save');
class AddToDoc {
    constructor(admin, path, limit = 5) {
        this.collectionPath = path;
        this.fieldsPerDocument = limit;
        this.firestore = () => admin.firestore();
    }
    async getMetaData() {
        let id = await metaData(this.firestore(), this.collectionPath, this.fieldsPerDocument);
        if (!id) id = { keys: [], length: 0, limitExceed: true };
        return id;
    }
    doesNotExist(fieldKeys, key) {
        if (fieldKeys.includes(key)) throw 'key already exist';
    }
    exceedLimit(length) {
        return length > this.fieldsPerDocument ? true : false;
    }
    fieldPath(limitExceed, id = false) {
        return !limitExceed ? this.firestore().doc(`${this.collectionPath}/${id}`) : this.firestore().collection(this.collectionPath).doc();
    }
    fieldValue({ limitExceed, fieldID, fieldData, height }) {
        let increaseHeight = height + 1;
        return !limitExceed ? { height: increaseHeight, [fieldID]: fieldData } : { height: 1, [fieldID]: fieldData };
    }
    async addDocToLocation(docID, fieldID) {
        let dbPath = this.firestore().doc(`${this.collectionPath}/location`);
        await dbPath.set({ [fieldID]: docID }, { merge: true });
    }
    async execute(fieldID, fieldData) {
        try {
            let meta, limit, dbPath, data, saved;
            meta = await this.getMetaData();
            this.doesNotExist(meta.keys, fieldID);
            limit = this.exceedLimit(meta.length);
            dbPath = this.fieldPath(meta.limitExceed, meta.id);
            data = this.fieldValue({ limit, fieldID, fieldData, height: meta.length });
            await dbPath.set(data, { merge: true });
            saved = await validateSave(dbPath, fieldID);
            await this.addDocToLocation(saved.id, fieldID);
            return saved;
        }
        catch (error) {
            ErrorHook({ error, message: "unable to add new document", functionName: "AddToDocs.execute" })
        }
    }
}
module.exports = AddToDoc;