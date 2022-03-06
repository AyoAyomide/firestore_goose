const chai = require("chai")
const init = require('./devtools/init');
const addToDocs = require('../src/set/add_to_docs');
const deleteDocs = require('../src/set/delete_by_id');

const admin = init();
let expect = chai.expect
chai.use(require('chai-as-promised'));

describe('deleteDocs', () => {

    let userCollection = "user";
    let userID = "Jane";
    const addToDocsTest = new addToDocs(admin, userCollection);
    const deleteFromDocs = new deleteDocs(admin, userCollection);
    context('Delete a single field', () => {
        it('Should delete a field in document', async() => {
            await addToDocsTest.execute(userID, "John wife", true);
            let result = await deleteFromDocs.execute(userID);
            expect(result).to.equal(userID + " deleted successfully");
        })
    })

    context('Delete a nested field', () => {
        it('Should delete a nested field in a document', async() => {
            await addToDocsTest.execute(userID, { "hubbyName": "John", "hubbyAge": "45" }, true);
            let result = await deleteFromDocs.execute(userID, 'hubbyName');
            expect(result).to.equal(`${userID}.hubbyName deleted successfully`);
        })
    })
})