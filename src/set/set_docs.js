const ErrorHook = require('../errors/errorHook');
const getHeight = require('../helpers/@getHeight');

class SetDocs {
    constructor(admin, { collPath, docPath }) {
        this.docPath = docPath;
        this.collPath = collPath;
        this.firestore = () => admin.firestore();
    }
    async doesNotExist({ collPath, docPath }) {
        let path;
        if (collPath) path = collPath;
        if (docPath) {
            let docToArray = docPath.split('/');
            docToArray.pop();
            path = docToArray.toString();
        }
        this.height = await getHeight(this.firestore(), path);
        if (this.height) throw "document already exist";
    }
    getDocPath(path) {
        if (path) return this.firestore().doc(path);
    }
    getCollToDocPath(path) {
        if (path) return this.firestore().collection(path).doc();
    }
    async validateSave(dbPath, fieldKey) {
        let doc = await dbPath.get(fieldKey);
        if (!doc.exists) throw 'new saved document not found';
        return doc.data();
    }
    async save(key, value) {
        try {
            await this.doesNotExist({ collPath: this.collPath, docPath: this.docPath });
            let dbPath = this.collPath ? await this.getCollToDocPath(this.collPath) : this.getDocPath(this.docPath);
            let genesisData = { height: 1, [key]: value };
            await dbPath.set(genesisData);
            let saved = await this.validateSave(dbPath, key);
            return saved;
        }
        catch (error) {
            ErrorHook({ error, message: "unable to save new document", functionName: "SetDocs.save" })
        }
    }
}
module.exports = SetDocs;