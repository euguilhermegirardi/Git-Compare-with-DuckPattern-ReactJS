// REQUEST -> SAGA -> CHAMADA API -> SUCCESS
// ACTION -> SAGA -> REDUCER

import { all, takeLatest } from 'redux-saga/effects'; 
import { addFavorite } from './favorites-sagas'; 
import { Types as FavoriteTypes } from '../ducks/ducks-favorites'; // Connects the reducers Types.

export default function* rootSaga(){
  yield all([
    takeLatest(FavoriteTypes.ADD_REQUEST, addFavorite),
  ]);
}

// "all" is like the "CombineReducers" from Saga.
// function* use with Saga.
// yield is like "await". It's like a point to the function stop for the next line before it starts.
// takeLatest: will listen to the 'FavoriteTypes.ADD_REQUEST' to active the 'addFavorite'.
// takeLatest: is a property that get the last request from the user, for an example:
//             if the use clicks 5 times the button 'send', it will take the only last one, we could use for an example
//             the property 'takeEvery', this one would listen to the 5 clicks instead. This way the application would
//             add 5 repositories.