async function getMetaData(firestore, path, limit = 10) {
    let id, length, keys, data, value;
    let getLimit = await firestore.collection(path).where('height', '<', limit).get();
    if (getLimit.empty) return false;
    getLimit.forEach(doc => { id = doc.id; data = doc.data(); });
    keys = Object.keys(data);
    length = keys.length - 1;
    delete data.height;
    value = data;
    return { id, length, keys, value };
}

module.exports = getMetaData;