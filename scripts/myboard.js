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
      <div data-id="${id}" data-starred="${starred}" class="boardItem starredOnes" style="background-color: ${colorpicker(
        color
      )};">
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

  if (document.getElementById("star_container").innerHTML == "") {
    document.getElementById("star_title").style.display = "none";
    document.getElementById("star_container").style.display = "none";
  }

  boards.forEach(({ id, name, closed, color, starred }) => {
    if (!starred && !closed) {
      document.querySelector(".board_list").innerHTML += `
      <div data-id="${id}" data-starred="${starred}" class="boardItem unstarred" style="background-color: ${colorpicker(
        color
      )};">
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
    <div class="boardItem unstarred new_board_section" id="add_new">
      <h5 class="new_board">Create a new Board</h5>
    </div>
  `;


  var modal = document.getElementById("myModal");
  var btn = document.getElementById("add_new");
  var span = document.getElementsByClassName("close")[0];

  btn.onclick = function() {
    modal.style.display = "block";
  }

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  async function saveBoard(name, color) {
    const response = await fetch('http://localhost:3000/boards', {
      method: 'POST',
      body: JSON.stringify({
        "name": name,
        "closed": false,
        "color": color,
        "starred": false,
      }), 
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Token token="${jsonParsed.token}"`,
      },
    });
  };

  document.forms.new_board_form.onsubmit = function(event) {
    event.preventDefault();
    let name = this.new_board_name.value;
    console.log(name);
    let color = this.dataset.colorOption;
    saveBoard(name, color); 
    window.location.href = "./my_board.html"
    };
  
  

  let stars = document.querySelectorAll(".boardItem .star"); 
  stars.forEach(star => star.addEventListener("click", (event) => {
    let boardItem = event.target.closest(".boardItem");
    //console.log(boardItem)
    let id = boardItem.dataset.id
    let starState = boardItem.dataset.starred
    
    updateBoard(id, starState); 
  }));

  let close = document.querySelectorAll(".boardItem .delete");
  close.forEach((item) =>
    item.addEventListener("click", (event) => {
      let closeItem = event.target.closest(".boardItem");
      let id = closeItem.dataset.id;
      let closeState = closeItem.dataset.starred;

      closeBoard(id, closeState);
    })
  );
};

// CLOSE ITEM

async function closeBoard(id, closeState) {
  console.log(closeState);
  if (closeState == "false") {
    const respose = await fetch(`http://localhost:3000/boards/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        closed: true,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Token token="${tokenParsed.token}"`,
      },
    });
  }
  window.location.href = "./my_board.html";
}

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


const palette = document.querySelectorAll(".color");
palette.forEach((color) => {
  const colorOption = color.dataset.color;
  color.onclick = function() {
    const form = document.forms.new_board_form
    form.dataset.colorOption = colorOption;
    form.querySelector(".draft_board").style.background = colorpicker(colorOption);
  },
  color.style.background = colorpicker(colorOption)
});


closedBoards.addEventListener("click", (event) => {
  window.location.href = "./closed_boards.html";
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


