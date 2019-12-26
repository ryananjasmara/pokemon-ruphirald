export default {
  state: {
    data: []
  },
  reducers: {
    addData(prevState, data) {
      return {
        ...prevState,
        data: [...prevState.data, data]
      };
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
      return this.addData(payload);
    }
  }
};
