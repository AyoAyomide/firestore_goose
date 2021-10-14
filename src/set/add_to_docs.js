const ErrorHook = require('../errors/errorHook');
const metaData = require('../helpers/@getCollMeta');
const validateSave = require('./utils/validate_save');
class AddToDoc {
    constructor(admin, { collPath }) {
        this.collPath = collPath;
        this.limit = 5;
        this.firestore = () => admin.firestore();
    }
    async getMetaData() {
        let id = await metaData(this.firestore(), this.collPath, this.limit);
        if (!id) id = { keys: [], length: 0, limitExceed: true };
        return id;
    }
    doesNotExist(fieldKeys, key) {
        if (fieldKeys.includes(key)) throw 'key already exist';
    }
    exceedLimit(length) {
        return length > this.limit ? true : false;
    }
    fieldPath(limitExceed, id = false) {
        return !limitExceed ? this.firestore().doc(`${this.collPath}/${id}`) : this.firestore().collection(this.collPath).doc();
    }
    fieldValue({ limitExceed, fieldID, fieldData, height }) {
        let increaseHeight = height + 1;
        return !limitExceed ? { height: increaseHeight, [fieldID]: fieldData } : { height: 1, [fieldID]: fieldData };
    }
    async addDocToLocation(docID, fieldID) {
        let data = { [fieldID]: docID };
        let dbPath = this.firestore().doc(`${this.collPath}/location`);
        await dbPath.set(data, { merge: true });
    }
    async save(fieldID, fieldData) {
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
            ErrorHook({ error, message: "unable to add new document", functionName: "AddToDocs.save" })
        }
    }
}
module.exports = AddToDoc;