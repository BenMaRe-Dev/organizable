// login

let logIn = document.querySelector(".login_btn");

async function loginValidation(username, password) { 
  const response = await fetch('http://localhost:3000/login/', {
    method: 'POST', 
    body: JSON.stringify({
      username : username, 
      password : password,
    }), 
    headers: {
      'Content-type': 'application/json', 
    },
  });

  const userData = await response.json(); 
  localStorage.setItem('token', JSON.stringify( userData )); 
  window.location.href = "./my_board.html";
};

logIn.addEventListener("click", event => {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  loginValidation(username, password); 
});



// 2) Get boards
// getBoards() // -> Remember to send authorization header. Use token from localStorage
// showBoards(boards) -> Muestro los boards