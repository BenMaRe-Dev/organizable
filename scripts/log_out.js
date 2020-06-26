let logout = document.querySelector(".log_out"); 
let out = localStorage.getItem("token");
let jsonParsed =  JSON.parse(out);



async function loginOut() {
  const response = await fetch('http://localhost:3000/logout/', {
    method: 'POST',
    //body: JSON.stringify(),
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Token token="${jsonParsed.token}"`
    },
  });
}; 

logout.addEventListener("click", (event) => { 
  console.log(jsonParsed.token);
  localStorage.removeItem("token");
  window.location.href = "./log_in.html"
});