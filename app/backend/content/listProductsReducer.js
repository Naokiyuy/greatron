const LIST = 'greatron/backend/LIST';
const FETCH_FINISHED = 'greatron/backend/FETCH_FINISHED';
const DELETE_PRODUCT = 'greatron/backend/DELETE_PRODUCT';
const DELETE_PRODUCT_SUCCESS = 'greatron/backend/DELETE_PRODUCT_SUCCESS';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_FINISHED:
      return {
        ...state,
        list: action.products
      };
    default:
      return {...state};
  }
}


export function list() {
  return dispatch => {
    dispatch({type: LIST});
    dispatch(fetchProductList());
  };
}

function fetchProductList() {
  return dispatch => {
    return fetch('/api/products/list', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(json => dispatch(fetchFinished(json)));
  };
}

function fetchFinished(products) {
  return {
    type: FETCH_FINISHED,
    products
  };
}

export function deleteProduct(id) {
  return dispatch => {
    dispatch({type: DELETE_PRODUCT});
    return fetch('/api/products/delete', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id})
    }).then(response => response.json())
      .then(json => dispatch({type: DELETE_PRODUCT_SUCCESS}));
  };
}
