// const admin = require('firebase-admin');
// const db = admin.firestore();

async function getHeight(firestore, path) {
    let id;
    let getLimit = await firestore.collection(path).where('height', '<', 100).get();
    if (getLimit.empty) return false;
    getLimit.forEach(doc => { id = doc.id });
    return id;
}

module.exports = getHeight;