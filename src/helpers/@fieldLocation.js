async function fieldLocation(firestore, path, key) {
    let query, docs, result;
    query = firestore.collection(path).orderBy(key);
    docs = await query.get();
    docs.forEach((docs) => {
        if (docs.id != 'location') { result = docs.id; }
    })
    if (!result) throw `key not found in collection`;
    return result;
}

module.exports = fieldLocation;