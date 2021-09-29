/* Location for holding the scripts for various functions within the website */
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:')

// Check password matches what is in the database
function checkLogin() {
    // Grab values from html form
    let emailValue = document.getElementById("email").value;
    let plaintextpassword = document.getElementById("password").value; 

    // fetch 
    fetch(login, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
          password: plaintextpassword,
        }),
      })
}
