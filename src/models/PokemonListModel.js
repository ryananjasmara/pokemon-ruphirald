export default {
  state: {
    data: [],
    isFetching: false,
    error: false
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
      return {
        ...prevState,
        data,
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
      return this.addData(payload);
    }
  }
};
