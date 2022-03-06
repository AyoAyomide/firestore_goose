const chai = require("chai")
const init = require('./devtools/init');
const getAllDocs = require('../src/get/get_all_docs');
const admin = init();
let expect = chai.expect
chai.use(require('chai-as-promised'));

describe('getAllField', () => {
    let userCollection = "user";
    const getAll = new getAllDocs(admin, userCollection);

    it('Should return as field in a document', async() => {
        let result = await getAll.execute();
        expect(result).to.have.property('Name');
    })
})