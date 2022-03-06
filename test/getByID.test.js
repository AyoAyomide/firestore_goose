const chai = require("chai")
const init = require('./devtools/init');
const addToDocs = require('../src/set/add_to_docs');
const getByID = require('../src/get/get_docs_by_id');

const admin = init();
let expect = chai.expect
chai.use(require('chai-as-promised'));

describe('getByID', () => {
    let userCollection = "user";
    let userID = "Name";
    const addToDocsTest = new addToDocs(admin, userCollection);
    const getDocsByID = new getByID(admin, userCollection);
    it('Should return the data in a field', async() => {
        await addToDocsTest.execute(userID, "John Doe", true);

        let result = await getDocsByID.execute(userID);
        expect(result).to.equal("John Doe");
    })
})