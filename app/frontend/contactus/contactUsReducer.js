const SEND_MAIL = 'greatron/frontend/SEND_MAIL';
const SEND_MAIL_SUCCESS = 'greatron/frontend/SEND_MAIL_SUCCESS';
const SEND_MAIL_FAIL = 'greatron/frontend/SEND_MAIL_FAIL';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return {...state};
  }
}

export function sendMail(params) {
  return dispatch => {
    dispatch({type: SEND_MAIL});
    return fetch('/send-mail', {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }).then(response => {
      if (response.status === 200) {
        return dispatch(sendMailSuccess());
      } else {
        return dispatch(sendMailFail());
      }
    });
  };
}

function sendMailSuccess() {
  return {
    type: SEND_MAIL_SUCCESS
  };
}

function sendMailFail() {
  return {
    type: SEND_MAIL_FAIL
  };
}
