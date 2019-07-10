import { all, takeLatest } from 'redux-saga/effects'; 
import { addFavorite } from './favorites-sagas'; 
import { Types as FavoriteTypes } from '../ducks/ducks-favorites';

export default function* rootSaga(){
  yield all([
    takeLatest(FavoriteTypes.ADD_REQUEST, addFavorite),
  ]);
}