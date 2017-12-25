import React from 'react';
import 'react-dates/initialize';
import InputMoment from 'input-moment';
import { string, arrayOf, shape } from 'prop-types';
import moment from 'moment';
// import 'moment/locale/fi';
import styled from 'styled-components';
import update from 'immutability-helper';
import BirdsFormMap from './BirdsFormMap';
import BirdsFormSearch from './BirdsFormSearch';

// moment.locale('fi');

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
  numberOfMonths: 1,
  displayFormat: () => moment.localeData().longDateFormat('L'),
};
const FormContainer = styled.form`
  margin: 0 auto;
  max-width: 720px;
`;
const DateTimePicker = styled(InputMoment)`
  position: absolute;
  z-index: 10;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${props =>
    props.visible === 'true' ? 'block!important' : 'none!important'};
`;
class BirdsForm extends React.Component {
  constructor(props) {
    super(props);
    this.getBirdsByFamily = this.getBirdsByFamily.bind(this);
    this.handleMapLocation = this.handleMapLocation.bind(this);
    this.handleMapPlaces = this.handleMapPlaces.bind(this);
    this.handleMapAddress = this.handleMapAddress.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDateSave = this.handleDateSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showHideDatetime = this.showHideDatetime.bind(this);
    this.triggerGetCurrentPosition = this.triggerGetCurrentPosition.bind(this);
    this.state = {
      datetimeshown: false,
      date: moment(),
      families: props.families,
      allBirds: [],
      birds: [],
      places: [],
      sighting: {
        family: '',
        bird: '',
        location: {
          lat: '',
          lng: '',
        },
        address: {
          name: '',
          address: '',
          country: '',
        },
        place: '',
        date: moment().toISOString(),
      },
    };
  }
  componentDidMount() {
    const { families } = this.state;
    const allBirds = [];
    families.forEach(family => {
      family.species.forEach(bird => {
        allBirds.push(bird);
      });
    });
    console.log(allBirds);
    this.setState({
      allBirds,
    });
  }
  getBirdsByFamily(currentFamilyName) {
    const { families } = this.state;
    return families.filter(family => family.name === currentFamilyName)[0]
      .species;
  }
  updateBirdsList(e) {
    if (e.target.name !== 'family') {
      return;
    }
    const birds = this.getBirdsByFamily(e.currentTarget.value);
    this.setState({
      birds,
      sighting: {
        bird: '',
      },
    });
  }
  handleMapLocation(location) {
    const newSighting = update(this.state.sighting, {
      location: { $set: location },
    });
    this.setState({
      sighting: newSighting,
    });
  }
  handleMapAddress(address) {
    const newSighting = update(this.state.sighting, {
      address: { $set: address },
    });
    this.setState({
      sighting: newSighting,
    });
  }
  handleMapPlaces(places) {
    this.setState({
      places,
    });
  }
  showHideDatetime() {
    this.setState({
      datetimeshown: true,
    });
  }
  triggerGetCurrentPosition() {
    this.refs.birdsformmap.getCurrentPosition();
  }
  handleDateSave() {
    this.setState({
      datetimeshown: false,
    });
  }
  handleDateChange(date) {
    const dateString = date.toISOString();
    const newSighting = update(this.state.sighting, {
      ['date']: { $set: dateString },
    });
    this.setState({
      sighting: newSighting,
    });
  }
  handleChange(e) {
    const { target } = e;
    const { value, name } = target;
    const newSighting = update(this.state.sighting, {
      [name]: { $set: value },
    });
    this.updateBirdsList(e);
    this.setState({
      sighting: newSighting,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    // return this.props.firebase
    //   .push('/birds', { text: newBird.value, done: false })
    //   .then(() => {
    //     newBird.value = '';
    //     console.log('Bird Created!');
    //   });
  }
  render() {
    return (
      <FormContainer onSubmit={this.handleSubmit}>
        <h1>Add bird</h1>
        <button onClick={this.triggerGetCurrentPosition}>Get position</button>
        <BirdsFormSearch
          items={this.state.allBirds}
          onChange={selectedItem => console.log(selectedItem)}
          // onChange={selectedItem => console.log(selectedItem)}
        />
        <select name="family" onChange={this.handleChange}>
          <option value="">Valitse suku</option>
          {this.state.families.map(family => (
            <option value={family.name} key={family.name}>
              {family.displayName}
            </option>
          ))}
        </select>
        <select
          value={this.state.sighting.bird.value}
          name="bird"
          onChange={this.handleChange}
        >
          <option value="">Valitse lintu</option>
          {this.state.birds.map(bird => (
            <option value={bird.name} key={bird.name}>
              {bird.displayName}
            </option>
          ))}
        </select>
        <select
          value={this.state.sighting.place.value}
          name="place"
          onChange={this.handleChange}
        >
          <option value="">Valitse paikka</option>
          {this.state.places.map(place => (
            <option value={place.name} key={place.place_id}>
              {place.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="date"
          value={this.state.date.format()}
          onChange={this.handleChange}
          onClick={this.showHideDatetime}
        />
        <DateTimePicker
          moment={this.state.date}
          onChange={this.handleDateChange}
          onSave={this.handleDateSave}
          minStep={5}
          visible={this.state.datetimeshown ? 'true' : 'false'}
        />
        <BirdsFormMap
          ref="birdsformmap"
          handleMapLocation={this.handleMapLocation}
          handleMapAddress={this.handleMapAddress}
          handleMapPlaces={this.handleMapPlaces}
        />
        <button onClick={this.handleAdd}>Add</button>
      </FormContainer>
    );
  }
}

BirdsForm.propTypes = PropTypes;
BirdsForm.defaultProps = DefaultProps;
export default BirdsForm;
