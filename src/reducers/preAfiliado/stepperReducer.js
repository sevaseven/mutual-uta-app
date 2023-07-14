import { types } from "../../types/types";

const initialState = {
  estado: null,
  step:0
};

export const stepperReducer = (state = initialState, action) => {   
    switch (action.type) {
        case types.changeStepper:
          return {
            ...state,
            step:action.payload
          };
        default:
          return state;
      }
};