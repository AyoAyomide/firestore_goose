const ErrorHook = require('../errors/errorHook');
class UpdateFieldByID {
    constructor(admin, { collPath }) {
        this.collPath = collPath;
        this.admin = admin;
        this.firestore = () => admin.firestore();
    }
    docPath(docID) {
        return this.firestore().doc(`${this.collPath}/${docID}`);
    }
    saveData({ key, childObject, childArrayAdd, childArrayRemove, value }) {
        if (childObject) key = `${key}.${childObject}`;
        if (childArrayAdd) {
            key = `${key}.${childArrayAdd}`;
            value = this.admin.firestore.FieldValue.arrayUnion(value);
        }
        if (childArrayRemove) {
            key = `${key}.${childArrayRemove}`;
            value = this.admin.firestore.FieldValue.arrayRemove(value);
        }
        return { [key]: value }
    }
    async save({ key, childObject, childArrayAdd, childArrayRemove, value }) {
        let location, locData, dbPath;
        location = this.docPath('location');
        try {
            if (key == 'height') throw 'height cannot be updated';
            this.firestore().runTransaction(async transaction => {
                locData = await transaction.get(location);
                locData = locData.data()[key]
                dbPath = this.docPath(locData);
                await transaction.update(dbPath, this.saveData({ key, childObject, childArrayAdd, childArrayRemove, value }));
            });
            return `successfully updated ${key}`;
        }
        catch (error) {
            ErrorHook({ error, message: "unable to update document", functionName: "UpdateFieldByID.save" })
        }
    }
}

module.exports = UpdateFieldByID;