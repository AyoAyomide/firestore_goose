const ErrorHook = require('../errors/errorHook');
const getHeight = require('../helpers/@getHeight');
const validateSave = require('../set/utils/validate_save');
class AddToDocs {
    constructor(admin, { docPath }) {
        this.docPath = docPath;
        this.firestore = () => admin.firestore();
    }
    getDocPath(path) {
        if (path) return this.firestore().doc(path);
    }
    async getNewHeight(dbPath, key) {
        let height = await getHeight(dbPath);
        if (height.fieldKeys.includes(key)) throw 'key already exist';
        return height.length + 1;
    }
    async save(key, value) {
        try {
            let dbPath = this.getDocPath(this.docPath);
            let height = await this.getNewHeight(dbPath, key);
            let saveData = { height, [key]: value };
            await dbPath.set(saveData, { merge: true });
            let saved = await validateSave(dbPath, key);
            return saved;
        }
        catch (error) {
            ErrorHook({ error, message: "unable to add new document", functionName: "AddToDocs.save" })
        }
    }
}

module.exports = AddToDocs;