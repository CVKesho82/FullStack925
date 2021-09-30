/* Location for holding the scripts for various functions within the website */

// Check password matches what is in the database
// const emailValue = document.getElementById("#input1").value;
// const plaintextpassword = document.querySelector("#input2").value; 

function checkLogin() {
    fetch('http://127.0.0.1:3000/login/verify', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(
            {email: document.getElementById("input1").value,
            password: document.getElementById("input2").value})
    }).then (res => res.json())
    .then (data => console.log(data))
    .catch(function (err) {
        console.log('something went wrong, call on database', err); // console.log the errors if any
    });
}
