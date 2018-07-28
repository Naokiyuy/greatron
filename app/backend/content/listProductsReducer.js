import queryString from 'query-string';
import {reset} from 'redux-form';

const LIST = 'greatron/backend/LIST';
const FETCH_FINISHED = 'greatron/backend/FETCH_FINISHED';
const DELETE_PRODUCT = 'greatron/backend/DELETE_PRODUCT';
const DELETE_PRODUCT_SUCCESS = 'greatron/backend/DELETE_PRODUCT_SUCCESS';
const SEARCH_PRODUCTS_BY_PARAMS = 'greatron/backend/SEARCH_PRODUCTS_BY_PARAMS';
const SEARCH_PRODUCTS_BY_PARAMS_SUCCESS = 'greatron/backend/SEARCH_PRODUCTS_BY_PARAMS_SUCCESS';
const RESET_SEARCH = 'greatron/backend/RESET_SEARCH';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_FINISHED:
      return {
        ...state,
        list: action.products
      };
    case SEARCH_PRODUCTS_BY_PARAMS_SUCCESS:
      return {
        ...state,
        list: action.results.rows
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

export function searchProducts(values) {
  const params = {
    ...values
  };
  return dispatch => {
    dispatch({type: SEARCH_PRODUCTS_BY_PARAMS});
    return fetch('/api/products/query-by-params' + buildQueryString(params), {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(json => dispatch({type: SEARCH_PRODUCTS_BY_PARAMS_SUCCESS, results: json}));
  };
}

function buildQueryString(params) {
  return '?' + queryString.stringify(params);
}

export function resetSearch() {
  return dispatch => {
    dispatch({type: RESET_SEARCH});
    dispatch(reset('productqueryform'));
    dispatch(fetchProductList());
  };
}
