const ADD_ABOUTUS = 'greatron/backend/ADD_ABOUTUS';
const ADD_ABOUTUS_SUCCESS = 'greatron/backend/ADD_ABOUTUS_SUCCESS';
const QUERY_ABOUTUS = 'greatron/backend/QUERY_ABOUTUS';
const QUERY_ABOUTUS_SUCCESS = 'greatron/backend/QUERY_ABOUTUS_SUCCESS';
const CREATE_ABOUTUS = 'greatron/backend/CREATE_ABOUTUS';
const EDIT_ABOUTUS = 'greatron/backend/EDIT_ABOUTUS';
const UPDATE_ABOUTUS = 'greatron/backend/UPDATE_ABOUTUS';
const UPDATE_ABOUTUS_SUCCESS = 'greatron/backend/UPDATE_ABOUTUS_SUCCESS';

const initialState = {
  isEditing: false,
  aboutus: {
    id: undefined,
    aboutus: '',
  },
  editingAboutus: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_ABOUTUS:
      return {
        ...state,
        isEditing: false
      };
    case ADD_ABOUTUS_SUCCESS:
      return {
        ...state,
        aboutus: action.aboutus
      };
    case EDIT_ABOUTUS:
      return {
        ...state,
        isEditing: true
      };
    case UPDATE_ABOUTUS_SUCCESS:
      return {
        ...state,
        aboutus: action.aboutus
      };
    case QUERY_ABOUTUS_SUCCESS:
      return {
        ...state,
        editingAboutus: {
          ...action.aboutus,
        }
      };
    default:
      return state;
  }
}

export function addAboutus(values) {
  return dispatch => {
    dispatch({type: ADD_ABOUTUS});
    return fetch('/api/aboutus/create', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then(response => response.json())
      .then(json => dispatch(addAboutusSuccess(json)));
  };
}

function addAboutusSuccess(aboutus) {
  return {
    type: ADD_ABOUTUS_SUCCESS,
    aboutus
  };
}

export function queryAboutus(id) {
  return dispatch => {
    dispatch({type: QUERY_ABOUTUS});
    return fetch('/api/categories/query?id=' + id, {
      credentials: 'same-origin'
    }).then(response => response.json())
      .then(json => dispatch({type: QUERY_ABOUTUS_SUCCESS, aboutus: json}));
  };
}

export function createAboutus() {
  return {
    type: CREATE_ABOUTUS
  };
}

export function editAboutus() {
  return {
    type: EDIT_ABOUTUS
  }
}

export function updateAboutus(values) {
  console.log(values);
  return dispatch => {
    dispatch({type: UPDATE_ABOUTUS});
    return fetch('/api/aboutus/update', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then(response => response.json())
      .then(json => dispatch(updateAboutusSuccess(json)));
  };
}

function updateAboutusSuccess(aboutus) {
  return {
    type: UPDATE_ABOUTUS_SUCCESS,
    aboutus
  };
}
