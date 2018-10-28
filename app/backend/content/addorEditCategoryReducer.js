const ADD_CATEGORY = 'greatron/backend/ADD_CATEGORY';
const ADD_CATEGORY_SUCCESS = 'greatron/backend/ADD_CATEGORY_SUCCESS';
const QUERY_CATEGORY = 'greatron/backend/QUERY_CATEGORY';
const QUERY_CATEGORY_SUCCESS = 'greatron/backend/QUERY_CATEGORY_SUCCESS';
const CREATE_CATEGORY = 'greatron/backend/CREATE_CATEGORY';
const EDIT_CATEGORY = 'greatron/backend/EDIT_CATEGORY';
const UPDATE_CATEGORY = 'greatron/backend/UPDATE_CATEGORY';
const UPDATE_CATEGORY_SUCCESS = 'greatron/backend/UPDATE_CATEGORY_SUCCESS';

const initialState = {
  isEditing: false,
  category: {
    id: undefined,
    category: '',
  },
  editingCategory: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_CATEGORY:
      return {
        ...state,
        isEditing: false
      };
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        category: {
          id: undefined,
          category: '',
        }
      };
    case EDIT_CATEGORY:
      return {
        ...state,
        isEditing: true
      };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        product: action.product
      };
    case QUERY_CATEGORY_SUCCESS:
      return {
        ...state,
        editingCategory: {
          ...action.category,
        }
      };
    default:
      return state;
  }
}

export function addCategory(values) {
  return dispatch => {
    dispatch({type: ADD_CATEGORY});
    return fetch('/api/categories/create', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then(response => response.json())
      .then(json => dispatch(addCategorySuccess(json)));
  };
}

function addCategorySuccess(category) {
  return {
    type: ADD_CATEGORY_SUCCESS,
    category
  };
}

export function queryCategory(id) {
  return dispatch => {
    dispatch({type: QUERY_CATEGORY});
    return fetch('/api/categories/query?id=' + id, {
      credentials: 'same-origin'
    }).then(response => response.json())
      .then(json => dispatch({type: QUERY_CATEGORY_SUCCESS, category: json}));
  };
}

export function createCategory() {
  return {
    type: CREATE_CATEGORY
  };
}

export function editCategory() {
  return {
    type: EDIT_CATEGORY
  }
}

export function updateCategory(values) {
  console.log(values);
  return dispatch => {
    dispatch({type: UPDATE_CATEGORY});
    return fetch('/api/categories/update', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then(response => response.json())
      .then(json => dispatch(updateCategorySuccess(json)));
  };
}

function updateCategorySuccess(category) {
  return {
    type: UPDATE_CATEGORY_SUCCESS,
    category
  };
}
