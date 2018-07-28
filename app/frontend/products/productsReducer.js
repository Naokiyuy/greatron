import queryString from 'query-string';
import _ceil from 'lodash/ceil';

const SET_CATEGORY = 'greatron/frontend/SET_CATEGORY';
const QUERY_PRODUCTS_CATEGORY = 'greatron/frontend/QUERY_PRODUCTS_CATEGORY';
const QUERY_PRODUCTS_CATEGORY_SUCCESS = 'greatron/frontend/QUERY_PRODUCTS_CATEGORY_SUCCESS';
const QUERY_PRODUCT = 'greatron/frontend/QUERY_PRODUCT';
const QUERY_PRODUCT_SUCCESS = 'greatron/frontend/QUERY_PRODUCT_SUCCESS';

const initialState = {
  products: [],
  product: {},
  grid: {
    category: 'DESKTOP',
    page: 1,
    pages: 1,
    pageSize: 5,
    offset: 0,
    totalSize: 1
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case QUERY_PRODUCTS_CATEGORY_SUCCESS:
      return {
        ...state,
        products: action.products.rows,
        grid: {
          ...state.grid,
          totalSize: action.products.count,
          pages: _ceil(action.products.count / state.grid.pageSize)
        }
      };
    case QUERY_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.product
      };
    case SET_CATEGORY:
      return {
        ...state,
        grid: {
          ...state.grid,
          category: action.category
        }
      };
    default:
      return {...state};
  }
}

export function setCategory(category) {
  return {
    type: SET_CATEGORY,
    category
  };
}

export function queryProducts() {
  return (dispatch, getState) => {
    dispatch({type: QUERY_PRODUCTS_CATEGORY});
    return fetch('/api/products/query-by-category' + buildQueryString(getState()), {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(json => dispatch({type: QUERY_PRODUCTS_CATEGORY_SUCCESS, products: json}));
  };
}

function buildQueryString(rootState) {
  console.log(rootState);
  const grid = rootState.frontend.products.grid;
  const params = {
    ...grid
  };
  return '?' + queryString.stringify(params);
}

export function queryProduct(id) {
  return dispatch => {
    dispatch({type: QUERY_PRODUCT});
    return fetch('/api/products/query?id=' + id, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(json => dispatch({type: QUERY_PRODUCT_SUCCESS, product: json}));
  };
}
