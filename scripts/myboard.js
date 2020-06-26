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
      <div class="boardItem starredOnes" style="background-color: ${color};">
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
      <div class="boardItem unstarred" style="background-color: ${color};">
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
      </div>
      `;
    }
  });
}
