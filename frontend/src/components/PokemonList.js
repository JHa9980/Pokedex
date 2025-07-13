// 알맞은 속성의 값과 색상을 적용할 수 있는 모듈입니다.
// modules 폴더 내부의 typeTag.js 코드를 확인하고, 알맞게 활용해보세요!

import { setPokemonType } from "../modules/typeTag.js";

export default function PokemonList({
  $app,
  initialState,
  handleItemClick,
  handleTypeClick,
}) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "pokemon-list";

  $app.appendChild(this.$target);
  this.handleItemClick = handleItemClick;
  this.handleTypeClick = handleTypeClick;

  this.template = () => {
    let temp = "";
    if (this.state) {
      this.state.forEach((item) => {
        temp += `<div class="pokemon-wrapper">
                    <div class="img-wrapper" id="${item.id}">
                        <img src="${item.img}" alt="${item.name}"></img>
                    </div>
                    <div class="pokemon-info">
                        <div class="index">No.${item.id}</div>
                        <div class="name">${item.name}</div>
                        <div class="type">${setPokemonType(item.type)}</div> 
                    </div>
                </div>`;
      });
    }
    return temp;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();

    this.$target.querySelectorAll("div.img-wrapper").forEach((elm) => {
      elm.addEventListener("click", () => {
        this.handleItemClick(elm.id);
      });
    });

    this.$target.querySelectorAll("div.type-tag").forEach((elm) => {
      elm.addEventListener("click", () => {
        this.handleTypeClick(elm.id);
      });
    });
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render();
}
