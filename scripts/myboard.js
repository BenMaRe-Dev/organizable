const starContainer = document.getElementsByClassName(".star");
const commonContainer = document.getElementsByClassName(".boards");
let closedBoards = document.querySelector(".closedBoards");
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
    if (starred && !closed) {
      document.querySelector(".star").innerHTML += `
      <div data-id="${id}" data-starred="${starred}" class="boardItem starredOnes" style="background-color: ${colorpicker(color)};">
        <h5>${name}</h5>
        <div class="boardItem_options">
          <div class="star action">
            <img src="./public/assets/golder_star.png" alt="" />
          </div>
        </div>
      </div>
      `;
    }
  });

  boards.forEach(({ id, name, closed, color, starred }) => {
    if (!starred && !closed) {
      document.querySelector(".board_list").innerHTML += `
      <div data-id="${id}" data-starred="${starred}" class="boardItem unstarred" style="background-color: ${colorpicker(color)};">
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

  document.querySelector(".board_list").innerHTML += `
    <div class="boardItem unstarred" id="add_new">
      <h5 class="new_board">Create a new Board</h5>
    </div>
  `;

  document.getElementById("add_new").addEventListener("click", () => {
    console.log("Franco");
  }); 

  let stars = document.querySelectorAll(".boardItem .star"); 
  stars.forEach(star => star.addEventListener("click", (event) => {
    let boardItem = event.target.closest(".boardItem");
    //console.log(boardItem)
    let id = boardItem.dataset.id
    let starState = boardItem.dataset.starred
    
    updateBoard(id, starState); 
  }));
};

// UPDATE BOARD

async function updateBoard(id, starState) {
  console.log(starState);
  if (starState == "true") {
    const respose = await fetch(`http://localhost:3000/boards/${id}`, {
      method: "PATCH", 
      body: JSON.stringify({
        starred: false,
      }),
      headers: {
        'Content-type': 'application/json', 
        Authorization: `Token token="${tokenParsed.token}"`,
      },
    });
  } else {
    const respose = await fetch(`http://localhost:3000/boards/${id}`, {
      method: "PATCH", 
      body: JSON.stringify({
        starred: true,
      }),
      headers: {
        'Content-type': 'application/json', 
        Authorization: `Token token="${tokenParsed.token}"`,
      },
    });
  }
  window.location.href = "./my_board.html";
}

document.querySelector(".modal_overlay").innerHTML = `
<div class="modal">
  <div class="modal_draft_section">
    <div class="draft_board">
      <div class="new_board_header"><h1>ksdhdn</h1><p class="modal_close">x</p></div>
    </div>
    <div class="color_picker">
      <div class="color" data-color="blue"></div>
      <div class="color" data-color="red"></div>
      <div class="color" data-color="orange"></div>
      <div class="color" data-color="purple"></div>
      <div class="color" data-color="pink"></div>
      <div class="color" data-color="green"></div>
      <div class="color" data-color="grey"></div>
      <div class="color" data-color="sky"></div>
      <div class="color" data-color="lime"></div>
    </div>
  </div>
  <button class="create_board_button">Create Board</button>
</div>
`

let palette = document.querySelectorAll(".color");
palette.forEach((color) => {
  let colorOption = color.dataset.color;
  color.style.background = colorpicker(colorOption)
});


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
};

closedBoards.addEventListener("click", (event) => {
  window.location.href = "./closed_boards.html";
});
