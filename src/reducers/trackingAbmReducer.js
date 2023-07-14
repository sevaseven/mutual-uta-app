import { types } from "../types/types";

const initialState = {
    items: [],
};

export const trackingAbmReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.trackingAbmClearReducer:
        return {
          ...initialState,
        };
      case types.trackingAbmGetTrackingSuccess:
        return {
          ...state,
          items: action.payload,
        };
      case types.trackingAbmGetTrackingError:
        return {
          ...state,
          items: [],
        };
      default:
        return state;  
    }
};