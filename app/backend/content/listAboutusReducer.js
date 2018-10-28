import queryString from "query-string";
import {reset} from "redux-form";

const LIST = 'greatron/backend/aboutus/LIST';
const FETCH_FINISHED = 'greatron/backend/aboutus/FETCH_FINISHED';
const DELETE_ABOUTUS = 'greatron/backend/aboutus/DELETE_ABOUTUS';
const DELETE_ABOUTUS_SUCCESS = 'greatron/backend/aboutus/DELETE_ABOUTUS_SUCCESS';
const SEARCH_ABOUTUS_BY_PARAMS = 'greatron/backend/aboutus/SEARCH_ABOUTUS_BY_PARAMS';
const SEARCH_ABOUTUS_BY_PARAMS_SUCCESS = 'greatron/backend/aboutus/SEARCH_ABOUTUS_BY_PARAMS_SUCCESS';
const RESET_SEARCH = 'greatron/backend/aboutus/RESET_SEARCH';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_FINISHED:
      return {
        ...state,
        list: action.aboutus
      };
    case SEARCH_ABOUTUS_BY_PARAMS_SUCCESS:
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
    dispatch(fetchAboutusList());
  };
}

function fetchAboutusList() {
  return dispatch => {
    return fetch('/api/aboutus/list', {
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

function fetchFinished(aboutus) {
  return {
    type: FETCH_FINISHED,
    aboutus
  };
}

export function deleteAboutus(id) {
  return dispatch => {
    dispatch({type: DELETE_ABOUTUS});
    return fetch('/api/aboutus/delete', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id})
    }).then(response => response.json())
      .then(json => dispatch({type: DELETE_ABOUTUS_SUCCESS}));
  };
}

export function searchAboutus(values) {
  const params = {
    ...values
  };
  return dispatch => {
    dispatch({type: SEARCH_ABOUTUS_BY_PARAMS});
    return fetch('/api/aboutus/query-by-params' + buildQueryString(params), {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(json => dispatch({type: SEARCH_ABOUTUS_BY_PARAMS_SUCCESS, results: json}));
  };
}

function buildQueryString(params) {
  return '?' + queryString.stringify(params);
}

export function resetSearch() {
  return dispatch => {
    dispatch({type: RESET_SEARCH});
    dispatch(reset('listaboutus'));
    dispatch(fetchAboutusList());
  };
}
