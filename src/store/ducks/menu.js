const Types = {
  SET_MENU: "SET_MENU",
};

const INITIAL_STATE = {
  menu: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SET_MENU:
      return {
        ...state,
        menu: action.payload,
      };

    default:
      return state;
  }
}

export function setMenu(data) {
  return {
    type: Types.SET_MENU,
    payload: data,
  };
}
