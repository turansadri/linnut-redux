import React from 'react';
import { string, arrayOf, shape } from 'prop-types';
import styled from 'styled-components';

const PropTypes = {
  families: arrayOf(
    shape({
      displayName: string.isRequired,
      name: string.isRequired,
      spesies: arrayOf(
        shape({
          displayName: string.isRequired,
          name: string.isRequired,
        }),
      ),
    }),
  ),
};

const DefaultProps = {
  families: [],
};
const FormContainer = styled.section`
  margin: 0 auto;
  max-width: 720px;
`;

const BirdsForm = props => {
  const { families } = props;
  return (
    <FormContainer>
      <h1>Add bird</h1>
      <select>
        {families.map(family => (
          <option value={family.name} key={family.name}>
            {family.displayName}
          </option>
        ))}
      </select>
    </FormContainer>
  );
};

BirdsForm.propTypes = PropTypes;
BirdsForm.defaultProps = DefaultProps;
export default BirdsForm;
