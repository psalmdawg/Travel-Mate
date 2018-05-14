import { AUTHENTICATED, UNAUTHENTICATED, AUTH_ERROR } from '../actions';

export default function(state={}, action) {
  switch(action.type) {
    case AUTHENTICATED:
      return { ...state, error:'', authenticated: true };
    case UNAUTHENTICATED:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
     
  }
  return state;
}