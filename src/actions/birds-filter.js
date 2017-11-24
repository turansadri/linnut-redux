export const FORM_VALUE_CHANGE = 'FORM_VALUE_CHANGE';
export const ACTIVE_MARKER_CHANGE = 'ACTIVE_MARKER_CHANGE';
export const FETCH_FAMILIES = 'FETCH_FAMILIES';

export const formValueChange = (value, fieldName) => ({
  type: FORM_VALUE_CHANGE,
  value,
  fieldName,
});
export const activeMarkerChange = id => ({
  type: ACTIVE_MARKER_CHANGE,
  id,
});

// export const fetchFamilies = () => {
//   return dispatch => {
//     Birds.on('value', snapshot => {
//       dispatch({
//         type: FETCH_POSTS,
//         payload: snapshot.val(),
//       });
//     });
//   };
// }
