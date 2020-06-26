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
  if (!userData.token) {
    alert("Username or password not valid!")
    window.location.href = "./log_in.html";
  } else {
    window.location.href = "./my_board.html";
  }
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




//MODAL 

// const button = document.querySelector(".js-modal-button");  
// const overlay = document.querySelector(".modal-overlay");  
// button.addEventListener("click", () => {    
//   overlay.classList.add("modal-overlay--active")  
// })  
// const closeModal = document.querySelector(".modal__close");  
// closeModal.addEventListener("click", () => {    
//   overlay.classList.remove("modal-overlay--active")  
// })  
// overlay.addEventListener("click", (event) => {    
//   if (event.target === overlay) {      
//     overlay.classList.remove("modal-overlay--active");    
//   }  
// })