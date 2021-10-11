async function getHeight(dbPath) {
    let doc = await dbPath.get('height');
    if (!doc.exists) throw 'document does not exits';
    let fieldKeys = Object.keys(doc.data());
    let length = fieldKeys.length - 1;
    return { fieldKeys, length };
}

module.exports = getHeight;