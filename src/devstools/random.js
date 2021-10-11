const generator = require('generate-password');

function random() {
    return generator.generate({
        length: 5,
        numbers: true
    });
}

module.exports = random;