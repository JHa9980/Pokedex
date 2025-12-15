export default function Header({
  $app,
  initialState,
  handleClick,
  handleSearch,
}) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "header";

  $app.appendChild(this.$target);
  this.handleClick = handleClick;
  this.handleSearch = handleSearch;

  this.template = () => {
    const { searchWord, currentPage } = this.state;
    let temp = `<div class="header-container">
        <div class='header-logo' id="title">
            <img src='/frontend/src/img/ball.webp' alt="Pokeball">
            <span>Pokédex</span>
        </div>`;
    
    if (!currentPage.includes("/detail")) {
      temp += `<div class="search-container">
            <div class="search-box">
                <input type="text" placeholder="Search Pokemon..." id="search" autocomplete="off" value="${decodeURIComponent(searchWord)}">
                <button id="search-button">
                    <img src="/frontend/src/img/search.png" alt="Search">
                </button>
            </div>
        </div>`;
    }
    
    temp += `</div>`; // Close header-container

    return temp;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();

    const $title = document.getElementById("title");
    $title.addEventListener("click", () => {
      this.handleClick();
    });

    if (!this.state.currentPage.includes("/detail")) {
      const $searchInput = document.getElementById("search");
      const $searchButton = document.getElementById("search-button");

      $searchButton.addEventListener("click", () => {
        this.handleSearch($searchInput.value);
      });
      $searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          this.handleSearch($searchInput.value);
        }
      });
    }
  };

  this.setState = (newState) => {
    this.state = newState;
  };

  this.render();
}
