require('dotenv').config();
const admin = require('firebase-admin');

function init_admin() {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CONFIG)),
        });
    }
    catch (error) {
        console.log('Unable to initialize firebase')
    }
}
module.exports = init_admin;