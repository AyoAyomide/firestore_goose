async function validateSave(dbPath, fieldKey) {
    let doc = await dbPath.get(fieldKey);
    if (!doc.exists) throw 'new saved document not found';
    return { id: doc.id, data: doc.data() };
}

module.exports = validateSave;