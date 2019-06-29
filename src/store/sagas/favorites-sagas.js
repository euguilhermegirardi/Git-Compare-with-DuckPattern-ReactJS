// REQUEST -> SAGA -> CHAMADA API -> SUCCESS

import api from '../../services/api';
import { call, put, select } from 'redux-saga/effects'; // Call the API GitHub.
import { Creators as FavoriteActions } from '../ducks/ducks-favorites'; 

// call: Call the promisse in the API.
// put:
// select: Select data from the redux state.


// Generation function.
// addFavorite(action) = "action" is the "action's information", such as 'type' and 'payload'.
export function* addFavorite(action) {
  try {

    //Syntax async/await \/
    //const response = yield api.get(`/repos/${action.payload.repository}`);


    //Syntax 'call' from redux-saga

    const { data } = yield call(api.get, `/repos/${action.payload.repository}`);
    // 'api.get' = function that we want execute.
    // then the parameter that we want to pass to the function to be executed. Could be more than one.



    const isDuplicated = yield select(state => 
      state.favorites.data.find(favorite => favorite.id === data.id));
      // Checks if we have a favorite.id equal to data.id, if yes \/

    if (isDuplicated) {
      yield put(FavoriteActions.addFavoriteFailure("  Repository duplicated."));
    } else {
      const repositoryData = {
        id: data.id,
        name: data.full_name,
        description: data.description,
        url: data.html_url,
      };

      yield put(FavoriteActions.addFavoriteSuccess(repositoryData));
    } 
  } catch (err) {
      yield put(FavoriteActions.addFavoriteFailure("  Error."));
    }
  }