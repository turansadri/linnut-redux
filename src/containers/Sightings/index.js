import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import PropTypes from 'prop-types';
// import BirdsFilter from '../../components/BirdsFilter';
import BirdsMap from '../BirdsMap';
import {
  fetchInitialData,
  formValueChange,
} from '../../actions/sightings-filter';

class Sightings extends React.Component {
  componentWillMount() {
    const { sightings, onDataLoad } = this.props;
    onDataLoad(sightings);
  }
  render() {
    return (
      <div style={{ height: '100%' }}>
        {/* <BirdsFilter {...this.props} /> */}
        <BirdsMap {...this.props} />
      </div>
    );
  }
}
/* eslint-disable no-nested-ternary */
const SightingsContainer = props => {
  const { sightings, onDataLoad, onFormValueChange } = props;
  const content = !isLoaded(sightings) ? (
    'Loading'
  ) : isEmpty(sightings) ? (
    'No sightings'
  ) : (
    <Sightings
      onDataLoad={onDataLoad}
      onChange={onFormValueChange}
      {...props}
    />
  );
  return <div>{content}</div>;
};
/* eslint-enable no-nested-ternary */

const mapDispatchToProps = dispatch => ({
  onDataLoad: event => {
    dispatch(fetchInitialData(event));
  },
  onFormValueChange: event => {
    dispatch(formValueChange(event));
  },
});

function mapStateToProps(state) {
  const { families, sightings } = state.firebase.data;
  const { filters, mapConfig, filteredSightings } = state.birds;

  return {
    filteredSightings,
    mapConfig,
    filters,
    families,
    sightings,
  };
}

const propTypes = {
  sightings: PropTypes.shape({}),
  onDataLoad: PropTypes.func.isRequired,
  onFormValueChange: PropTypes.func.isRequired,
};
const DefaultProps = {
  sightings: {},
};
Sightings.defaultProps = DefaultProps;
SightingsContainer.defaultProps = DefaultProps;
Sightings.propTypes = propTypes;
SightingsContainer.propTypes = propTypes;
export default compose(
  firebaseConnect(['/families', '/sightings']),
  connect(mapStateToProps, mapDispatchToProps),
)(SightingsContainer);
