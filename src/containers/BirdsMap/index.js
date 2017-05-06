import React from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as config from '../../config';
import BirdsMap from '../../components/BirdsMap';
import { Marker } from '../../components/Marker';

export class BirdsMapContainer extends React.Component {
  render() {
    const {
      filteredBirds,
    } = this.props;
    return (
      <BirdsMap
        {...this.props}
        google={this.props.google}
      >
        {filteredBirds.map(bird =>
          <Marker
            key={bird.id}
            title={bird.PrimaryName}
            description="desc"
            properties="good"
            lat={bird.Latitude}
            lon={bird.Longitude}
            mapOn="true"
            // onMarkerClick={this.props.onMarkerClick}
          />
        )}
      </BirdsMap>
    )
  }
};

const key = config.getGoogleKey();
export default GoogleApiWrapper({
  apiKey: key,
})(BirdsMapContainer);
