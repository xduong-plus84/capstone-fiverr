//rxr

let initialState = {
  menuLoaiCongViec: [],
};

export let reducerNumber = (state = initialState, action) => {
  switch (action.type) {
    case "GiamSoLuong": {
      state.soLuong -= action.payload;
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
};
