require('dotenv').config();
const admin = require('firebase-admin');

function init_admin() {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CONFIG)),
    });
    if (admin.app().name) return admin;
}
module.exports = init_admin;