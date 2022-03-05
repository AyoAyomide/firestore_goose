const chai = require("chai")
const init = require('./devtools/init');
const updateByID = require('../src/set/update_by_id');
const admin = init();
let expect = chai.expect
chai.use(require('chai-as-promised'))

describe.only('UpdateByID', () => {
    it('Should update a document in the collection', async() => {
        let userCollection = "user";
        let userID = "Name";
        let query = {
            path: userCollection,
            key: userID,
            value: "Samuel Doe",
        };
        const updateByIDTest = new updateByID(admin, userCollection);
        let result = await updateByIDTest.execute(query);
        expect(result).to.equal(userID + " updated successfully");
    })
})