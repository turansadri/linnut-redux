import {
  FORM_VALUE_CHANGE,
  formValueChange,
} from '../actions/sightings-filter';

describe('FormValueChange actions', () => {
  it('should dispatch an action to change form value', () => {
    const expectedAction = {
      type: FORM_VALUE_CHANGE,
    };
    expect(formValueChange()).toEqual(expectedAction);
  });
});
