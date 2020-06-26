const starContainer = document.getElementsByClassName(".star");
const commonContainer = document.getElementsByClassName(".boards");
let starredOnes = document.querySelectorAll(".star .starredOnes");
let token = localStorage.getItem("token");
let tokenParsed = JSON.parse(token);

window.addEventListener("load", (event) => {
  getBoards();
});

async function getBoards() {
  const response = await fetch("http://localhost:3000/boards/", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Token token="${tokenParsed.token}"`,
    },
  });
  const boards = await response.json();

  boards.forEach(({ id, name, closed, color, starred }) => {
    if (starred) {
      document.querySelector(".star").innerHTML += `
      <div class="boardItem starredOnes" style="background-color: ${colorpicker(color)};">
        <h5>${name}</h5>
        <div class="boardItem_options">
          <div class="action">
            <img src="./public/assets/golder_star.png" alt="" />
          </div>
        </div>
      </div>
      `;
    }
  });

  boards.forEach(({ id, name, closed, color, starred }) => {
    if (!starred) {
      document.querySelector(".board_list").innerHTML += `
      <div class="boardItem unstarred" style="background-color: ${colorpicker(color)};">
        <h5>${name}</h5>
        <div class="boardItem_options">
          <div class="delete action">
            <img src="./public/assets/action_delete.png" alt="" />
          </div>
          <div class="star action">
            <img src="./public/assets/action_star.png" alt="" />
          </div>
        </div>
        
      </div>
      `;
    }
  });
}

function colorpicker(color) {
  switch (color) {
    case "blue":
      return "#0079BF";
    case "red":
      return "#B04632";
    case "orange":
      return "#D29034";
    case "purple":
      return "#89609E";
    case "pink":
      return "#CD5A90";
    case "green":
      return "#519839";
    case "grey":
      return "#838C90";
    case "sky":
      return "#0AAECB";
    case "lime":
      return "#4BBF6B";
    default:
      break;
  }
}
