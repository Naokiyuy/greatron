const UPLOAD_FILE = 'greatron/utils/UPLOAD_FILE';
const UPLOAD_FILE_SUCCESS = 'greatron/utils/UPLOAD_FILE_SUCCESS';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return {...state};
  }
}

export function fileUpload(value) {
  console.log('fileupload>>>>>', value);
  let formData = new FormData();
  formData.append('file', value[0]);
  return (dispatch) => {
    dispatch({type: UPLOAD_FILE});
    return fetch('/api/file/upload', {
      method: 'POST',
      credentials: 'same-origin',
      body: formData
    }).then(response => response.json())
      .then(json => {
        console.log(json);
        return dispatch({type: UPLOAD_FILE_SUCCESS, filename: json.filename});
      });
  };
}
