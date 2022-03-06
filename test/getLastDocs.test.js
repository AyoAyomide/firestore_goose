const chai = require("chai")
const init = require('./devtools/init');
const getLastDocs = require('../src/get/get_last');

const admin = init();
let expect = chai.expect
chai.use(require('chai-as-promised'));

describe('getLastDocs', () => {
    let userCollection = "user";
    const getLast = new getLastDocs(admin, userCollection);

    it('Should the document with height lower than maximum', async() => {
        let result = await getLast.execute();
        expect(result).to.have.property('id');
    })
})