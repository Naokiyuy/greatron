const ADD_PRODUCT = 'greatron/backend/ADD_PRODUCT';
const ADD_PRODUCT_SUCCESS = 'greatron/backend/ADD_PRODUCT_SUCCESS';
const QUERY_PRODUCT = 'greatron/backend/QUERY_PRODUCT';
const QUERY_PRODUCT_SUCCESS = 'greatron/backend/QUERY_PRODUCT_SUCCESS';
const EDIT_PRODUCT = 'greatron/backend/EDIT_PRODUCT';
const UPDATE_PRODUCT = 'greatron/backend/UPDATE_PRODUCT';
const UPDATE_PRODUCT_SUCCESS = 'greatron/backend/UPDATE_PRODUCT_SUCCESS';

const initialState = {
  isEditing: false,
  product: {
    id: undefined,
    product_category: 'DESKTOP',
    product_name: '',
    product_desc: '',
    product_spec: '',
    pdfUrl: '',
    subTitle: '',
    feature: '',
    imageUrl: ''
  },
  initialValues: {
    productCategory: 'DESKTOP',
    productName: '',
    productDesc: '',
    productSpec: '',
    productPdfUrl: '',
    productSubTitle: '',
    productFeature: '',
    productImageUrl: ''
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.product
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        isEditing: true
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.product
      };
    case QUERY_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.product
      };
    default:
      return {...state};
  }
}

export function addProduct(values) {
  console.log(values);
  return dispatch => {
    dispatch({type: ADD_PRODUCT});
    return fetch('/api/products/create', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then(response => response.json())
      .then(json => dispatch(addProductSuccess(json)));
  };
}

function addProductSuccess(product) {
  return {
    type: ADD_PRODUCT_SUCCESS,
    product
  };
}

export function queryProduct(id) {
  return dispatch => {
    dispatch({type: QUERY_PRODUCT});
    return fetch('/api/products/query?id=' + id, {
      credentials: 'same-origin'
    }).then(response => response.json())
      .then(json => dispatch({type: QUERY_PRODUCT_SUCCESS, product: json}));
  };
}

export function editProduct() {
  return {
    type: EDIT_PRODUCT
  }
}

export function updateProduct(values) {
  console.log(values);
  return dispatch => {
    dispatch({type: UPDATE_PRODUCT});
    return fetch('/api/products/update', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then(response => response.json())
      .then(json => dispatch(updateProductSuccess(json)));
  };
}

function updateProductSuccess(product) {
  return {
    type: UPDATE_PRODUCT_SUCCESS,
    product
  };
}
