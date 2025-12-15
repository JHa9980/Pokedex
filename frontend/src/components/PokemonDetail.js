import { setPokemonType } from "../modules/typeTag.js";

export default function PokemonDetail({ $app, initialState, handlePrev, handleNext, handleBack }) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "pokemon-detail";

  $app.appendChild(this.$target);
  this.handlePrev = handlePrev;
  this.handleNext = handleNext;
  this.handleBack = handleBack;

  this.template = () => {
    let pokemonData = this.state;
    let temp = ``;
    if (pokemonData) {
      temp = `
        <div class="detail-container">
            <button class="nav-btn prev-btn" ${pokemonData.id <= 1 ? 'disabled' : ''}>
                &lt;
            </button>
            
            <div class="detail-wrapper">
                <button class="back-btn">Back to List</button>
                
                <div class="left-wrapper">
                    <img src="${pokemonData.img}" alt="${pokemonData.name}">
                </div>
                <div class="right-wrapper">
                    <div class="detail-header">
                        <h1 class="name">${pokemonData.name}</h1>
                        <span class="index">#${pokemonData.id}</span>
                    </div>
                    <div class="type">${setPokemonType(pokemonData.type)}</div>
                    <p class="description">${pokemonData.description}</p>
                    
                    <div class="detail-info">
                        <div>
                            <span class="label">Height</span>
                            <span class="info">${pokemonData.height}m</span>
                        </div>
                        <div>
                            <span class="label">Category</span>
                            <span class="info">${pokemonData.info}</span>
                        </div>
                        <div>
                            <span class="label">Weight</span>
                            <span class="info">${pokemonData.weight}kg</span>
                        </div>
                    </div>
                </div>
            </div>

            <button class="nav-btn next-btn">
                &gt;
            </button>
        </div>`;
    }

    return temp;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();

    const $prevBtn = this.$target.querySelector(".prev-btn");
    const $nextBtn = this.$target.querySelector(".next-btn");
    const $backBtn = this.$target.querySelector(".back-btn");

    if ($prevBtn) {
        $prevBtn.addEventListener("click", () => {
            if (this.state.id > 1) this.handlePrev(this.state.id);
        });
    }

    if ($nextBtn) {
        $nextBtn.addEventListener("click", () => {
            this.handleNext(this.state.id);
        });
    }

    if ($backBtn) {
        $backBtn.addEventListener("click", () => {
            this.handleBack();
        });
    }
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render();
}