const OPEN_SEARCH_MODAL = 'greatron/frontend/OPEN_SEARCH_MODAL';
const CLOSE_SEARCH_MODAL = 'greatron/frontend/CLOSE_SEARCH_MODAL';
const SEARCH_PRODUCTS = 'greatron/frontend/SEARCH_PRODUCTS';
const SEARCH_PRODUCTS_SUCCESS = 'greatron/frontend/SEARCH_PRODUCTS_SUCCESS';

const initialState = {
  isOpen: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case OPEN_SEARCH_MODAL:
      return {
        ...state,
        isOpen: true
      };
    case CLOSE_SEARCH_MODAL:
      return {
        ...state,
        isOpen: false
      };
    case SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.results
      };
    default:
      return {...state};
  }
}

export function openSearchModal() {
  return {
    type: OPEN_SEARCH_MODAL
  };
}

export function closeSearchModal() {
  return {
    type: CLOSE_SEARCH_MODAL
  };
}

export function searchProducts(values) {
  return dispatch => {
    dispatch({type: SEARCH_PRODUCTS});
    return fetch('/api/products/query-by-params?name=' + values.search, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(json => dispatch({type: SEARCH_PRODUCTS_SUCCESS, results: json}));
  };
}
