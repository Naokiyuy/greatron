import {browserHistory} from 'react-router';

const LOGIN = 'greatron/backend/LOGIN';
const LOGIN_SUCCESS = 'greatron/backend/LOGIN_SUCCESS';

const initialState = {
  user: undefined
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: {
          email: action.user.email
        }
      };
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
          dispatch({type:LOGIN_SUCCESS, user: json.user});
          browserHistory.push(json.pathname);
        }
      });
  };
}
