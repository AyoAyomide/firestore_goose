const init_firebase = require('./src/init/_init.js');
init_firebase();
const fireboxSET = require('./src/set/set_docs.js');
let path = { docPath: 'user/mydoc' };
let path2 = { collPath: 'user' };
let key = "sam";
let data = {
    age: 23,
    sex: "mals"
}
let user = new fireboxSET(path);
user.save(key, data)
