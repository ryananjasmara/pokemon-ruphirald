// initiate and get data from local storage
const localPokemonData = JSON.parse(localStorage.getItem("pokemonData"));
const storageData = [];
if (localPokemonData) {
  Object.keys(localPokemonData.data).map(index => {
    const item = localPokemonData.data[index];
    storageData.push(item);
  });
}

export default {
  state: {
    data: storageData
  },
  reducers: {
    addData(prevState, data) {
      prevState.data.push(data);
      const updatedData = prevState;
      localStorage.setItem("pokemonData", JSON.stringify(updatedData));
      // console.log(updatedData);
      return updatedData;
    },
    clearData(prevState) {
      return {
        ...prevState,
        data: null
      };
    }
  },
  effects: {
    async handleData(payload) {
      //   console.log(payload);
      return this.addData(payload);
    }
  }
};
