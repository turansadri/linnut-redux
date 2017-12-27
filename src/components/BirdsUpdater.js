import React from 'react';
import 'react-dates/initialize';
import moment from 'moment';
import { string, arrayOf, shape } from 'prop-types';
// import 'moment/locale/fi';
import styled from 'styled-components';
// import update from 'immutability-helper';
import helpers from '../helpers';

// moment.locale('fi');

const FormContainer = styled.form`
  margin: 0 auto;
  max-width: 720px;
`;
class BirdsUpdater extends React.Component {
  constructor(props) {
    super(props);
    this.getBirdsByFamily = this.getBirdsByFamily.bind(this);
    this.handleFamiliesUpdate = this.handleFamiliesUpdate.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      date: moment(),
      families: props.families,
      allBirds: [],
      birds: [],
      places: [],
      sighting: {
        bird: '',
        location: {
          target: {
            coords: {
              lat: '',
              lng: '',
            },
          },
          observer: {
            coords: {
              lat: '',
              lng: '',
            },
          },
          place: '',
          address: {
            name: '',
            address: '',
            country: '',
          },
        },
        date: moment().toISOString(),
      },
    };
  }
  componentWillMount() {
    const { families } = this.state;
    const allBirds = [];
    families.forEach(family => {
      family.species.forEach(bird => {
        const birdObj = bird;
        birdObj.familyName = helpers.slugify(family.name);
        allBirds.push(birdObj);
      });
    });
    this.setState({
      allBirds,
    });
  }
  getBirdsByFamily(currentFamilyName) {
    const { families } = this.state;
    return families.filter(family => family.name === currentFamilyName)[0]
      .species;
  }
  writeFamilyData(family) {
    return this.props.firebase.push('/families', family).then(() => {
      console.log('newFamilies added!');
    });
  }
  handleFamiliesUpdate() {
    const { families } = this.state;
    const newFamilies = [];
    families.forEach(family => {
      const newFamily = family;
      newFamily.slug = helpers.slugify(family.name);
      newFamilies.push(newFamily);
      this.writeFamilyData(newFamily);
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    // const { sighting } = this.state.sighting;
    // return this.props.firebase
    //   .push('/sightings', { sighting })
    //   .then(() => {
    //     console.log('Sighting added!');
    //   });
  }
  render() {
    return (
      <div>
        <FormContainer onSubmit={this.handleSubmit}>
          <h1>Update families</h1>
          <button onClick={this.handleFamiliesUpdate}>Update</button>
        </FormContainer>
        <FormContainer onSubmit={this.handleSubmit}>
          <h1>Update birds</h1>
          <button onClick={this.handleBirdsUpdate}>Update</button>
        </FormContainer>
      </div>
    );
  }
}
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
BirdsUpdater.propTypes = PropTypes;
BirdsUpdater.defaultProps = DefaultProps;
export default BirdsUpdater;
