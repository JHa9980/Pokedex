import { setPokemonType } from "../modules/typeTag.js";

export default function PokemonDetail({ $app, initialState }) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "pokemon-detail";

  $app.appendChild(this.$target);

  this.template = () => {
    let pokemonData = this.state;
    let temp = ``;
    if (pokemonData) {
      temp = `
        <div class="detail-wrapper">
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
        </div>`;
    }

    return temp;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render();
}
