const Types = {
  SET: "SET_USER",
};

const INITIAL_STATE = {
  user: {},
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SET:
      return {
        ...state,
        user: {
          ...action.payload,
        },
      };

    default:
      return state;
  }
}

export function setUser(data) {
  return {
    type: Types.SET,
    payload: data,
  };
}
