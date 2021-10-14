const ErrorHook = require('../errors/errorHook');
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
        let location, locData, dbPath, response;
        location = this.docPath('location');
        try {
            if (key == 'height') throw 'height cannot be updated';
            await this.firestore().runTransaction(async transaction => {
                locData = await transaction.get(location);
                locData = locData.data()[key];
                if (!locData) throw 'invalid field key';
                dbPath = this.docPath(locData);
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