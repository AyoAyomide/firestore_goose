const ErrorHook = require('../errors/errorHook');
const getHeightKey = require('../helpers/@getHeightKey');
const validateSave = require('../set/utils/validate_save');
class CreateNewDocs {
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
        this.height = await getHeightKey(this.firestore(), path);
        if (this.height) throw "document already exist";
    }
    getDocPath(path) {
        if (path) return this.firestore().doc(path);
    }
    getCollToDocPath(path) {
        if (path) return this.firestore().collection(path).doc();
    }
    async save(key, value) {
        try {
            await this.doesNotExist({ collPath: this.collPath, docPath: this.docPath });
            let dbPath = this.collPath ? await this.getCollToDocPath(this.collPath) : this.getDocPath(this.docPath);
            let genesisData = { height: 1, [key]: value };
            await dbPath.set(genesisData);
            let saved = await validateSave(dbPath, key);
            return saved;
        }
        catch (error) {
            ErrorHook({ error, message: "unable to save new document", functionName: "SetDocs.save" })
        }
    }
}
module.exports = CreateNewDocs;