import React from 'react';
import styled from 'styled-components';

const BirdsFormContainer = styled.section`
  margin: 0 auto;
  max-width: 720px;
`;

class BirdsForm extends React.Component {
  render() {
    const { birds, family } = this.props;
    console.log(family);
    return (
      <BirdsFormContainer>
        <h1>Add bird</h1>
      </BirdsFormContainer>
    );
  }
}
export default BirdsForm;
