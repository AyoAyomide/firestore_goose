const chai = require("chai")
const init = require('./devtools/init');
const random = require('./devtools/random');
const addToDocs = require('../src/set/add_to_docs');
const admin = init();
let expect = chai.expect
chai.use(require('chai-as-promised'))

describe('AddToDocs', () => {
    context("When force is set", () => {
        it('Should add a document to the collection', async() => {
            let userCollection = "user";
            let userID = "Name";
            let userDetails = random();
            const addToDocsTest = new addToDocs(admin, userCollection);
            let result = await addToDocsTest.execute(userID, userDetails, true);
            expect(result.data).to.have.property(userID);
            expect(result.data).to.have.property("height");
        })
    })
    context("When force is not set", () => {
        it('Should not add a document to the collection', async() => {
            let userCollection = "user";
            let userID = "Name";
            let userDetails = "John Doe";
            const addToDocsTest = new addToDocs(admin, userCollection);
            await expect(addToDocsTest.execute(userID, userDetails))
                .to.eventually.be.rejected
                .and.have.property('error', 'key already exist');
        })
    })
})