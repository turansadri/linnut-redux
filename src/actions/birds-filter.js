export const FORM_VALUE_CHANGE = 'FORM_VALUE_CHANGE';

export const formValueChange = (value, fieldName) => ({
  type: FORM_VALUE_CHANGE,
  value,
  fieldName,
});
