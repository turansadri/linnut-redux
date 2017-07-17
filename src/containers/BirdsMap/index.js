import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import * as config from '../../config';
import { BirdMarker } from '../../components/BirdMarker';

const style = {
  width: '100%',
  height: '100%',
  position: 'relative',
};

export default class BirdsMap extends Component {
  render() {
    const {
      mapConfig,
      filteredBirds,
    } = this.props;
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: config.getGoogleKey() }}
        style={style}
        center={ mapConfig.center }
        defaultZoom={11}
      >
        { filteredBirds.map(bird =>
          <BirdMarker
            lat={bird.Latitude}
            lng={bird.Longitude}
            text={bird.PrimaryName}
            family={bird.Family}
          />,
        )}
      </GoogleMapReact>
    );
  }
}
