import { combineReducers, createStore } from 'redux'
import {mapTransform} from './reducers/map-transform'
const reducers = combineReducers([
    mapTransform,
]);

export default function configureStore(preloadedState) {
    const store = createStore(reducers, preloadedState);
    return store;
}
