// sign up
let signUp = document.querySelector(".sign_up_btn")

async function signUpValidation(username, password, email, firstName, lastName) { 
  const response = await fetch('http://localhost:3000/users/', {
    method: 'POST', 
    body: JSON.stringify( {user: {
      username : username, 
      password : password,
      email: email,
      first_name: firstName, 
      last_name: lastName, 
    }}), 
    headers: {
      'Content-type': 'application/json', 
      
    },
  });
  console.log({response})

  const userData = await response.json();
  console.log({userData})
  
  localStorage.setItem('token', JSON.stringify(
    userData
  )); 
  window.location.href = "./login.html";
}

signUp.addEventListener("click", (event) => {
  console.log("aquí comienza esta wea")
  event.preventDefault();
  let username = document.getElementById("username").value;
  console.log({username})
  let password = document.getElementById("password").value;
  console.log({password})
  let email = document.getElementById("email").value;
  console.log({email})
  let firstName = document.getElementById("first_name").value;
  console.log({firstName})
  let lastName = document.getElementById("last_name").value;
  console.log({lastName})
  signUpValidation(username, password, email, firstName, lastName); 
  console.log("aquí termina esta wea")
});