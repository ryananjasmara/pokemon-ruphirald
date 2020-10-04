import axios from "axios";

const pokemonList = {
  state: {
    data: [],
    isFetching: false,
    error: false
  },
  reducers: {
    request(prevState) {
        return {
          ...prevState,
          isFetching: true,
          error: false
        }
    },
    success(prevState, data) {
      return {
        ...prevState,
        data: [...prevState.data, ...data],
        isFetching: false,
        error: false
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
    async fetchPokemonList(payload) {
      this.request();
      const { offset } = payload;
      //api issue
      return axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=10`)
      .then(res => {
        this.success(res.data.results);
      }).catch(error => {
        this.failure(error);
      });
    }
  }
};

export default pokemonList;
