import queryString from "query-string";
import {reset} from "redux-form";

const LIST = 'greatron/backend/categories/LIST';
const FETCH_FINISHED = 'greatron/backend/categories/FETCH_FINISHED';
const DELETE_CATEGORY = 'greatron/backend/categories/DELETE_CATEGORY';
const DELETE_CATEGORY_SUCCESS = 'greatron/backend/categories/DELETE_CATEGORY_SUCCESS';
const SEARCH_CATEGORIES_BY_PARAMS = 'greatron/backend/categories/SEARCH_CATEGORIES_BY_PARAMS';
const SEARCH_CATEGORIES_BY_PARAMS_SUCCESS = 'greatron/backend/categories/SEARCH_CATEGORIES_BY_PARAMS_SUCCESS';
const RESET_SEARCH = 'greatron/backend/categories/RESET_SEARCH';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_FINISHED:
      return {
        ...state,
        list: action.categories
      };
    case SEARCH_CATEGORIES_BY_PARAMS_SUCCESS:
      return {
        ...state,
        list: action.results.rows
      };
    default:
      return state;
  }
}

export function list() {
  return dispatch => {
    dispatch({type: LIST});
    dispatch(fetchCategoryList());
  };
}

function fetchCategoryList() {
  return dispatch => {
    return fetch('/api/categories/list', {
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

function fetchFinished(categories) {
  return {
    type: FETCH_FINISHED,
    categories
  };
}

export function deleteCategory(id) {
  return dispatch => {
    dispatch({type: DELETE_CATEGORY});
    return fetch('/api/categories/delete', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id})
    }).then(response => response.json())
      .then(json => dispatch({type: DELETE_CATEGORY_SUCCESS}));
  };
}

export function searchCategories(values) {
  const params = {
    ...values
  };
  return dispatch => {
    dispatch({type: SEARCH_CATEGORIES_BY_PARAMS});
    return fetch('/api/categories/query-by-params' + buildQueryString(params), {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(json => dispatch({type: SEARCH_CATEGORIES_BY_PARAMS_SUCCESS, results: json}));
  };
}

function buildQueryString(params) {
  return '?' + queryString.stringify(params);
}

export function resetSearch() {
  return dispatch => {
    dispatch({type: RESET_SEARCH});
    dispatch(reset('listcategories'));
    dispatch(fetchCategoryList());
  };
}
