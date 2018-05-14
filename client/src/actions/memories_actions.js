import axios from 'axios';
import { Redirect, Route } from 'react-router-dom';

export const GET_MEMORIES = 'GET_MEMORIES';


export function getMemories(user){
  // user arg if needed
  console.log('get memories')

  const request = axios({
    method: 'get',
    url: `/memories`,
    headers: {
      authorization: localStorage.getItem('token')
    },
  })
  console.log('request', request)
  return {
    type: GET_MEMORIES,
    payload:request
  }

}


export function deleteMemory(journeyId, memId) {
  return function(dispatch){
    const request = axios({
      method: 'delete',
      url: `/memories/${journeyId}/${memId}`,
      headers: {
        authorization: localStorage.getItem('token')
      },
    });
    return {
      type: 'DELETE_MEMORY',
      payload: request
    };
  }
}

export function deleteJourney(journeyId){

  return function(dispatch){
    const request = axios({
      method: 'delete',
      url: `/journies/${journeyId}`,
      headers: {
        authorization: localStorage.getItem('token')
      },
    })


    return {
      type: 'DELETE_JOURNEY',
      payload: request
    };
  }
}
