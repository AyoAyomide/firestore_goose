async function validateSave(dbPath, fieldKey) {
    let doc = await dbPath.get(fieldKey);
    if (!doc.exists) throw 'new saved document not found';
    return doc.data();
}

module.exports = validateSave;