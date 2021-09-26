/* Routing for the Adulting OverFlow application */
// TODO: checkLogin(login, password) {}
// Login in page
    // Check database information
    // If matches, then procceed to main
    // If false

// Check username & database exist in the database
//  If no username or password exist in database
//      grab user input from fields, check against database
//      error 401 -> "That account does not exist, enter a different acount name"
//  If username & password don't match database records
//      error 401 -> "Incorrect Username or Password"
//  If so, do they match?
//      If Yes to both, then get access to the website
//      Redirect to main page

// Registration Page
// TODO: registration() {}
//  When user hits submit, update information into the database records
//      Check that username doesn't conflict with existing username
//      If conflict exists, prevent database from updating
//          Return error code 400, "User name already exists"
//  If successfully updated, return message 201(?) that registration was successful
//      Redirect to main page

// Hash password function, return as object to update database

// Check username and password exist in database
//  Check bcrypt hash password matches one in the database
//  Check that username matches one in database
//      If true, then return true
//      If not, then return false

console.log('Hello World');
