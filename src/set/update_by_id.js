const ErrorHook = require('../errors/errorHook');
class UpdateFieldByID {
    constructor(admin, { collPath }) {
        this.collPath = collPath;
        this.firestore = () => admin.firestore();
    }
    docPath(docID) {
        return this.firestore().doc(`${this.collPath}/${docID}`);
    }
    async save(key, value) {
        let location, locData, dbPath;
        location = this.docPath('location');
        try {
            if (key == 'height') throw 'height cannot be updated';
            this.firestore().runTransaction(async transaction => {
                locData = await transaction.get(location);
                locData = locData.data()[key]
                dbPath = this.docPath(locData);
                await transaction.update(dbPath, { [key]: value });
            });
            return `successfully updated ${key}`;
        }
        catch (error) {
            ErrorHook({ error, message: "unable to update document", functionName: "UpdateFieldByID.save" })
        }
    }
}

module.exports = UpdateFieldByID;