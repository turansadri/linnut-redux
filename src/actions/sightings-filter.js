export const FORM_VALUE_CHANGE = 'FORM_VALUE_CHANGE';
export const ACTIVE_MARKER_CHANGE = 'ACTIVE_MARKER_CHANGE';
export const FETCH_INITIAL_DATA = 'FETCH_INITIAL_DATA';

export const formValueChange = (value, fieldName) => ({
  type: FORM_VALUE_CHANGE,
  value,
  fieldName,
});
export const activeMarkerChange = id => ({
  type: ACTIVE_MARKER_CHANGE,
  id,
});
export const fetchInitialData = payload => ({
  type: FETCH_INITIAL_DATA,
  payload,
});
