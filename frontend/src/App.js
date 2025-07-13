//COMPONENTS
import PokemonList from "./components/PokemonList.js";
import Header from "./components/Header.js";

//APIS
import { getPokemonDetail, getPokemonList } from "./modules/api.js";
import PokemonDetail from "./components/PokemonDetail.js";

export default function App($app) {
  const getSearchWord = () => {
    if (window.location.search.includes("search=")) {
      return window.location.search.split("search=")[1];
    }
    return "";
  };

  this.state = {
    type: window.location.pathname.replace("/", ""),
    pokemonList: [],
    searchWord: getSearchWord(),
    currentPage: window.location.pathname,
  };

  // Header
  const renderHeader = () => {
    new Header({
      $app,
      initialState: {
        searchWord: this.state.searchWord,
        currentPage: this.state.currentPage,
      },
      handleClick: async () => {
        history.pushState(null, null, `/`);
        const pokemonList = await getPokemonList();
        this.setState({
          ...this.state,
          type: "",
          pokemonList: pokemonList,
          searchWord: "",
          currentPage: "/",
        });
      },
      handleSearch: async (searchWord) => {
        history.pushState(null, null, `/?search=${searchWord}`);
        const pokemonList = await getPokemonList(this.state.type, searchWord);
        this.setState({
          ...this.state,
          pokemonList: pokemonList,
          searchWord: searchWord,
          currentPage: `?search=${searchWord}`,
        });
      },
    });
  };

  // PokemonList
  const renderPokemonList = () => {
    new PokemonList({
      $app,
      initialState: this.state.pokemonList,
      handleItemClick: async (id) => {
        history.pushState(null, `No.${id}`, `/detail/${id}`);
        this.setState({
          ...this.state,
          currentPage: `/detail/${id}`,
        });
      },

      handleTypeClick: async (type) => {
        history.pushState(null, `${type}`, `/${type}`);
        const pokemonList = await getPokemonList(type);
        this.setState({
          ...this.state,
          pokemonList: pokemonList,
          searchWord: getSearchWord(),
          type: type,
          currentPage: `/${type}`,
        });
      },
    });
  };

  // PokemonDetail
  const renderPokemonDetail = async (pokemonNo) => {
    try {
      const pokemonDetailData = await getPokemonDetail(pokemonNo);
      new PokemonDetail({ $app, initialState: pokemonDetailData });
    } catch (error) {
      console.log(error);
    }
  };

  const render = async () => {
    const path = this.state.currentPage;
    $app.innerHTML = "";
    if (path.startsWith("/detail/")) {
      const pokemonNo = path.split("/detail/")[1];
      renderHeader();
      renderPokemonDetail(pokemonNo);
    } else {
      renderHeader();
      renderPokemonList();
    }
  };

  window.addEventListener("popstate", async () => {
    const urlPath = window.location.pathname;
    const prevType = urlPath.replace("/", "");
    const prevSearchWord = getSearchWord();
    const prevPokemonList = await getPokemonList(prevType, prevSearchWord);

    this.setState({
      ...this.state,
      type: prevType,
      pokemonList: prevPokemonList,
      searchWord: prevSearchWord,
      currentPage: urlPath,
    });
  });

  this.setState = (newState) => {
    this.state = newState;
    render();
  };

  const init = async () => {
    const path = this.state.currentPage;

    if (path.startsWith("/detail/")) {
      render();
    } else {
      const pokemons = await getPokemonList(
        this.state.type,
        this.state.searchWord
      );
      this.setState({
        ...this.state,
        pokemonList: pokemons,
      });
    }
  };

  init();
}
