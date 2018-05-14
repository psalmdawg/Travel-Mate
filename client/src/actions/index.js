import axios from 'axios';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTH_ERROR = 'auth_error';

export * from './memories_actions';

export function signinUser({ email, password }, history){
  return function(dispatch){
    axios.post(`/auth/signin`, { email, password })
      .then(
        response => {
        console.log(response)
        dispatch({type:AUTHENTICATED})
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', response.data.user_id);
        history.push('/welcome');

      })
      .catch(() => {
        dispatch(authError('Login details not valid'))
      })
  }

}

export function signupUser({ email, password }, history) {
  return function(dispatch) {
    axios.post(`/auth/signup`, { email, password })
      .then(response => {
        console.log(response)
        dispatch({ type: AUTHENTICATED });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', response.data.user_id);
        history.push('/welcome');
      })
      .catch(err => {
        console.log(err.response);
        dispatch(authError(err.response.data.error));
      });
  }
}

export function signOutUser(){
  localStorage.removeItem('token')
  localStorage.removeItem('user_id')
  return{ type: UNAUTHENTICATED }
}


export function authError(error){
  console.log(error)
  return {
    type:AUTH_ERROR,
    payload:error
  };
}
