import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; // can rename when you bring stuff in
import memoriesReducer from './memories_reducer';
import authReducer from './auth_reducer';


const rootReducer = combineReducers({
  form: formReducer,
  memories: memoriesReducer,
  auth: authReducer

})

export default rootReducer;
