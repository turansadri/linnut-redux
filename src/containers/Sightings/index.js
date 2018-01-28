import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import BirdsFilter from '../../components/BirdsFilter';
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

const SightingsContainer = props => {
  const { sightings, onDataLoad, formValueChange } = props;
  const content = !isLoaded(sightings) ? (
    'Loading'
  ) : isEmpty(sightings) ? (
    'No sightings'
  ) : (
    <Sightings onDataLoad={onDataLoad} onChange={formValueChange} {...props} />
  );
  return <div>{content}</div>;
};

const mapDispatchToProps = dispatch => ({
  onDataLoad: event => {
    dispatch(fetchInitialData(event));
  },
  formValueChange: event => {
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

export default compose(
  firebaseConnect(['/families', '/sightings']),
  connect(mapStateToProps, mapDispatchToProps),
)(SightingsContainer);
