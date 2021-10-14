const ErrorHook = require('../errors/errorHook');
class DeleteFieldByID {
    constructor(admin, { collPath }) {
        this.collPath = collPath;
        this.admin = admin;
        this.firestore = () => admin.firestore();
    }
    docPath(docID) {
        return this.firestore().doc(`${this.collPath}/${docID}`);
    }
    deleteData({ key, childObject }) {
        if (childObject) key = `${key}.${childObject}`;
        let value = this.admin.firestore.FieldValue.delete();
        return { [key]: value }
    }
    async save(key, childObject) {
        let location, locData, dbPath, response;
        location = this.docPath('location');
        try {
            if (key == 'height') throw 'height cannot be deleted';
            await this.firestore().runTransaction(async transaction => {
                locData = await transaction.get(location);
                locData = locData.data()[key]
                dbPath = this.docPath(locData);
                if (!locData) throw 'field key not found';
                await transaction.update(dbPath, this.deleteData({ key, childObject }));
                if (!childObject) await transaction.update(this.docPath('location'), this.deleteData({ key }));
            });
            response = childObject ? `${key}.${childObject}` : key;
            return `${response} deleted successfully`;
        }
        catch (error) { ErrorHook({ error, message: 'unable to delete field', functionName: 'DeleteFieldByID.save' }) }
    }
}

module.exports = DeleteFieldByID;