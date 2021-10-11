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
    async doesNotExist(dbPath, key) {
        let height = await getHeight(dbPath);
        if (height.fieldKeys.includes(key)) throw 'key already exist';
    }
    async updateHeight(dbPath) {
        let length = await getHeight(dbPath);
        let height = length.length;
        console.log(height);
        return await dbPath.set({ height }, { merge: true });
    }
    async save(key, value) {
        try {
            let dbPath = this.getDocPath(this.docPath);
            await this.doesNotExist(dbPath, key);
            await dbPath.set({ [key]: value }, { merge: true });
            let saved = await validateSave(dbPath, key);
            await this.updateHeight(dbPath);
            return saved;
        }
        catch (error) {
            ErrorHook({ error, message: "unable to add new document", functionName: "AddToDocs.save" })
        }
    }
}

module.exports = AddToDocs;