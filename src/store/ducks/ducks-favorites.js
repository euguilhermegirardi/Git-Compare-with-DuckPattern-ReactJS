//DUCK PATTERN. ACTIONS AND REDUCERS FILES TOGETHER.

//TYPES
export const Types = {
  // Instead of use ADD_FAVORITE_REQUEST, ADD_FAVORITE_SUCCESS, ADD_FAVORITE_FAILURE.
  // We write down the name without the 'reducer' (FAVORITE).
  // So the name will be, 'reducer/new name'.
  ADD_REQUEST: 'favorites/ADD_REQUEST',
  ADD_SUCCESS: 'favorites/ADD_SUCCESS',
  ADD_FAILURE: 'favorites/ADD_FAILUE',
};


//REDUCERS
const INITIAL_STATE = {
  loading: false, // Start with false, obviously.
  data: [], 
  error: null, // Start with flase, obsviously.
};

//EVERY TIME WHEN THE 'ACTIONS' CALL THE 'REDUCERS' THEY WILL EXECUTE THAT.
export default function favorites(state= INITIAL_STATE, action){
  switch (action.type) {

    case Types.ADD_REQUEST:
      return { ...state, 
        loading: true }; // loading: true because that case is the ADD_REQUEST, it's searching the information.

    case Types.ADD_SUCCESS:
    return { ...state, 
      loading: false, // loading: false because it already finish the search.
      error: null, 
      data: [...state.data, action.payload.data,] };
    
    case Types.ADD_FAILURE:
    return { ...state, 
      loading: false, // If the action loaded the 'loading' is false, of course.
      error: action.payload.error };
    
    default:
      return state;
  }
}


// ACTIONS
// ACTIONS WILL JUST TELL THE "REDUCERS" TO EXECUTE THE FOLLOW ACTIONS.
export const Creators = { 
  // Instead of have 3 "export const" for each actions we create the 'const Creators'.
  addFavoriteRequest: repository => ({
    type: Types.ADD_REQUEST,
    payload: { repository }, // Reducer will listen to this.
  }),
  //ADD_REQUEST will be called by 'pages/index-main.js' in the function 'handleAddRepository'.


// REQUEST -> SAGA -> CHAMADA API -> SUCCESS
// Saga will liston to the ADD_REQUEST, get the information in API and then do the ADD_SUCCESS.
  
  addFavoriteSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: { data }, // Reducer will listen to this.
  }),
  //ADD_SUCCESS will be called by 'sagas/favorites-sagas.js'.

  
  addFavoriteFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: { error }, // Reducer will listen to this.
  }),
};
