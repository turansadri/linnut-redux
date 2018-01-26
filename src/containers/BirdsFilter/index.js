import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import BirdsFilter from '../../components/BirdsFilter';
import BirdsMap from '../BirdsMap';
import {
  formValueChange,
  activeMarkerChange,
  fetchSightings,
} from '../../actions/sightings-filter';

const BirdsFilterContainer = props => {
  const { onChange, onMarkerClick } = props;
  return (
    <div>
      {/* 
        <BirdsFilter {...props} onChange={onChange} />
        <BirdsMap {...props} onClick={onMarkerClick} />
      */}
    </div>
  );
};

function mapStateToProps(state) {
  const { families, sightings } = state.firebase.data;

  const { filters, filteredBirds, mapConfig, activeMarker } = state.birds;

  return {
    families,
    sightings,
    filteredBirds,
    filters,
    mapConfig,
    activeMarker,
  };
}

const mapDispatchToProps = dispatch => ({
  onChange: event => {
    dispatch(
      formValueChange(event.currentTarget.value, event.currentTarget.name),
    );
  },
  onMarkerClick: event => {
    dispatch(activeMarkerChange(event));
  },
});

BirdsFilterContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
  onMarkerClick: PropTypes.func.isRequired,
};
export default compose(
  firebaseConnect(['/families', '/sightings']),
  connect(mapStateToProps, mapDispatchToProps),
)(BirdsFilterContainer);
