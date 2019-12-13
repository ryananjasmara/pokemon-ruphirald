// initiate and get data from local storage
const localPokemonData = JSON.parse(localStorage.getItem("pokemonData"));
const storageData = [];
if (localPokemonData) {
  Object.keys(localPokemonData).map(index => {
    const item = localPokemonData[index];
    storageData.push(item);
  });
}

export default {
  state: {
    data: storageData
  },
  reducers: {
    addData(prevState, data) {
      const updatedData = [...prevState.data, data];
      localStorage.setItem("pokemonData", JSON.stringify(updatedData));
      return {
        ...prevState,
        data: updatedData
      };
    },
    clearData(prevState) {
      localStorage.clear();
      return {
        ...prevState,
        data: null
      };
    }
  },
  effects: {
    async handleData(payload) {
      return this.addData(payload);
    }
  }
};
