import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import reactotron from '../../ReactotronConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Persist configuration
const persistConfig = {
  key: 'root', // The key for your persisted storage
  storage:AsyncStorage,     // Define the storage engine (e.g., AsyncStorage or localStorage)
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with middleware and Reactotron
export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(thunk), reactotron.createEnhancer())
);

// Create the persistor
export const persistor = persistStore(store);
