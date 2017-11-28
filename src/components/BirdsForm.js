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
  firebase: shape(),
};

const DefaultProps = {
  families: [],
  firebase: {},
};
const FormContainer = styled.section`
  margin: 0 auto;
  max-width: 720px;
`;
class BirdsForm extends React.Component {
  constructor(props) {
    super(props);
    this.getBirdsByFamily = this.getBirdsByFamily.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.state = {
      families: props.families,
      birds: [],
    };
  }
  getBirdsByFamily(currentFamilyName) {
    const { families } = this.state;
    return families.filter(family => family.name === currentFamilyName)[0]
      .species;
  }
  handleChange(e) {
    const birds = this.getBirdsByFamily(e.currentTarget.value);
    this.setState({
      birds,
    });
  }
  handleAdd() {
    const { newBird } = this.refs;
    return this.props.firebase
      .push('/birds', { text: newBird.value, done: false })
      .then(() => {
        newBird.value = '';
        console.log('Bird Created!');
      });
  }
  render() {
    return (
      <FormContainer>
        <h1>Add bird</h1>
        <select onChange={this.handleChange}>
          {this.state.families.map(family => (
            <option value={family.name} key={family.name}>
              {family.displayName}
            </option>
          ))}
        </select>
        <select ref="newBird">
          {this.state.birds.map(bird => (
            <option value={bird.name} key={bird.name}>
              {bird.displayName}
            </option>
          ))}
        </select>
        <button onClick={this.handleAdd}>Add</button>
      </FormContainer>
    );
  }
}

BirdsForm.propTypes = PropTypes;
BirdsForm.defaultProps = DefaultProps;
export default BirdsForm;
