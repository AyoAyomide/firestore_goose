const ErrorHook = require('../errors/errorHook');
const fieldLocation = require('../helpers/@fieldLocation');
class UpdateFieldByID {
    constructor(admin, path) {
        this.collectionPath = path;
        this.admin = admin;
        this.firestore = () => admin.firestore();
    }
    docPath(docID) {
        return this.firestore().doc(`${this.collectionPath}/${docID}`);
    }
    executeData({ key, childObject, childArrayAdd, childArrayRemove, value }) {
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
    async execute({ key, childObject, childArrayAdd, childArrayRemove, value }) {
        let location, dbPath, response;
        try {
            if (key == 'height') throw 'height cannot be updated';
            location = await fieldLocation(this.firestore(), this.collectionPath, key);
            await this.firestore().runTransaction(async transaction => {
                dbPath = this.docPath(location);
                await transaction.update(dbPath, this.executeData({ key, childObject, childArrayAdd, childArrayRemove, value }));
            });
            response = childObject ? `${key}.${childObject}` : key;
            return `${response} updated successfully`;
        }
        catch (error) {
            ErrorHook({ error, message: "unable to update document", functionName: "UpdateFieldByID.save" })
        }
    }
}

module.exports = UpdateFieldByID;