import _take from 'lodash/take';

const QUERY_INDEX_PRODUCTS = 'greatron/frontend/QUERY_INDEX_PRODUCTS';
const QUERY_INDEX_PRODUCTS_SUCCESS = 'greatron/frontend/QUERY_INDEX_PRODUCTS_SUCCESS';

const initialState = {
  products: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case QUERY_INDEX_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: _take(action.products, 4)
      };
    default:
      return {...state};
  }
}

export function queryIndexProducts() {
  return dispatch => {
    dispatch({type: QUERY_INDEX_PRODUCTS});
    return fetch('/api/products/query-by-params?isIndex=1', {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(json => dispatch({type: QUERY_INDEX_PRODUCTS_SUCCESS, products: json.rows}));
  };
}
