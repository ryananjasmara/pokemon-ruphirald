import axios from "axios";

const LIMIT = 10;

const pokemonList = {
  state: {
    data: [],
    isFetching: false,
    error: false,
    countData: 0
  },
  reducers: {
    request(prevState) {
        return {
          ...prevState,
          data: [],
          isFetching: true,
          error: false
        }
    },
    success(prevState, data) {
      console.log('sukses', prevState);
      return {
        ...prevState,
        data: [...prevState.data, ...data],
        isFetching: false,
        error: false,
        countData: prevState.countData + LIMIT,
      }
    },
    failure(prevState, error) {
      return {
        ...prevState,
        data: [],
        isFetching: false,
        error
      }
    }
  },
  effects: {
    async fetchPokemonList() {
      this.request();
      const offset = pokemonList.state.countData;
      console.log(offset);
      console.log(LIMIT);
      return axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${LIMIT}`)
      .then(res => {
        this.success(res.data.results);
      }).catch(error => {
        this.failure(error);
      });
    }
  }
};

export default pokemonList;
