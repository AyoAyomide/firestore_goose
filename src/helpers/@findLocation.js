async function findLocation(firestore, path, key) {
    let query = firestore.doc(`${path}/location`);
    let docs = await query.get();
    if (!docs.exists) throw 'key not found in location Document';
    return docs.data()[key];
}

module.exports = findLocation;