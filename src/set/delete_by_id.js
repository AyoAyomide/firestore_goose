const fieldLocation = require("../helpers/@fieldLocation");
const ErrorHook = require('../errors/errorHook');
class DeleteFieldByID {
    constructor(admin, path) {
        this.collectionPath = path;
        this.admin = admin;
        this.firestore = () => admin.firestore();
    }
    docPath(docID) {
        return this.firestore().collection(this.collectionPath).doc(docID);
    }
    executeData({ key, childObject }) {
        if (childObject) key = `${key}.${childObject}`;
        return {
            [key]: this.admin.firestore.FieldValue.delete()
        }
    }
    async execute(key, childObject) {
        let location, locData, response, docID;
        docID = await fieldLocation(this.firestore(), this.collectionPath, key);
        location = this.docPath(docID);
        try {
            if (key == 'height') throw 'height cannot be deleted';
            await this.firestore().runTransaction(async transaction => {
                locData = await transaction.get(location);
                locData = locData.data()[key];
                if (!locData) throw 'field key not found';
                await transaction.update(location, this.executeData({ key, childObject }));
                if (!childObject) await transaction.update(location, this.executeData({ key }));
            });
            response = childObject ? `${key}.${childObject}` : key;
            return `${response} deleted successfully`;
        } catch (error) { ErrorHook({ error, message: 'unable to delete field', functionName: 'DeleteFieldByID.save' }) }
    }
}

module.exports = DeleteFieldByID;