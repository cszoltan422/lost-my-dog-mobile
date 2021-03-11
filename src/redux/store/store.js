import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/root.reducer';
import rootSaga from '../sagas/root.saga';

const sagaMiddleware = createSagaMiddleware()

function configureStore(initialState) {
    let enhancer = applyMiddleware(sagaMiddleware);

    return createStore(rootReducer, initialState, enhancer);
}

export default configureStore();
sagaMiddleware.run(rootSaga);