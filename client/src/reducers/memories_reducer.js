import { GET_MEMORIES } from '../actions/memories_actions';

export default function(state = null, action){

  switch(action.type){

    case GET_MEMORIES:
      console.log(action.payload)
      return Object.assign({}, state, {
        memories:action.payload.data
      })
    case 'DELETE_MEMORY':
      return state;

    default:
    return state
  }

}
