import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import * as config from '../../config';
import BirdMarker from '../../components/BirdMarker';

const style = {
  width: '100%',
  height: '100%',
  position: 'relative',
};

export default class BirdsMap extends Component {
  render() {
    const {
      onMarkerClick,
      mapConfig,
      filteredSightings,
      activeMarker,
    } = this.props;
    return (
      console.log(filteredSightings),
      (
        <div>Nakki</div>
        // <GoogleMapReact
        //   bootstrapURLKeys={{ key: config.getGoogleKey() }}
        //   style={style}
        //   center={mapConfig.center}
        //   defaultZoom={11}
        // >
        //   { filteredSightings.map(bird =>
        //     <BirdMarker
        //       lat={bird.Latitude}
        //       lng={bird.Longitude}
        //       text={bird.PrimaryName}
        //       family={bird.Family}
        //       key={bird.id}
        //       id={bird.id}
        //       activeMarker={activeMarker}
        //       onMarkerClick={onMarkerClick}
        //     />,
        //   )}
        // </GoogleMapReact>
      )
    );
  }
}
