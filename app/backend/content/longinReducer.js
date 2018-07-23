import {browserHistory} from 'react-router';

const LOGIN = 'greatron/backend/LOGIN';
const LOGIN_SUCCESS = 'greatron/backend/LOGIN_SUCCESS';

const initialState = {

};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return {...state};
  }
}

export function login(values) {
  const params = {
    email: values.email,
    password: values.password
  };
  return dispatch => {
    dispatch({type: LOGIN});
    return fetch('/api/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }).then(response => response.json())
      .then(json => {
        if (json.status === 200) {
          browserHistory.push(json.pathname);
        }
      });
  };
}
