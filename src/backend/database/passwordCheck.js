const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

// Test variables
db = []; // Simulator database value

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    console.log('Plain text: ', myPlaintextPassword);
    console.log('Hash:', hash);
    db.push(hash);
    console.log(db);

    // Check pass from database
    bcrypt.compare(myPlaintextPassword, db[0], function(err, result) {
        console.log(result);
    });

});
