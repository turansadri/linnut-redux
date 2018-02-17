/* global google */
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import BirdMarker from '../../components/BirdMarker';
import h from '../../helpers';
const {
  MarkerClusterer,
} = require('react-google-maps/lib/components/addons/MarkerClusterer');
const {
  MarkerWithLabel,
} = require('react-google-maps/lib/components/addons/MarkerWithLabel');
const googleMapStyles = require('../../data/googleMapStyles.json');

const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={16}
      defaultOptions={{ styles: googleMapStyles }}
      center={{
        lat: props.currentLocation.lat,
        lng: props.currentLocation.lng,
      }}
    >
      <MarkerClusterer
        onClick={props.onMarkerClustererClick}
        averageCenter
        enableRetinaIcons
        gridSize={60}
      >
        {props.sightings &&
          Object.keys(props.sightings).map(key => {
            return (
              <MarkerWithLabel
                labelClass={'labels'}
                icon={{
                  url: h.getMarkerImage(
                    h.slugify(props.sightings[key].bird.familyName),
                  ),
                  scaledSize: new google.maps.Size(50, 50),
                  anchor: new google.maps.Point(25, 25),
                  zIndex: 300,
                }}
                zIndex={-100}
                labelAnchor={new google.maps.Point(16, 16)}
                position={{
                  lat: props.sightings[key].location.target.coords.lat,
                  lng: props.sightings[key].location.target.coords.lng,
                }}
                key={key}
              >
                <BirdMarker
                  text={props.sightings[key].bird.displayName}
                  family={h.slugify(props.sightings[key].bird.familyName)}
                />
              </MarkerWithLabel>
            );
          })}
      </MarkerClusterer>
    </GoogleMap>
  )),
);

export default class BirdsMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {
        lat: 60.17269,
        lng: 24.9175601,
      },
    };
  }
  render() {
    const { filteredSightings } = this.props;
    return (
      <Map
        currentLocation={this.state.currentLocation}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCV31G_XGjKMer9YBaviREhz501w0EyOYs&v=3.30&libraries=geometry,drawing,places"
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        loadingElement={<div style={{ height: '100%' }} />}
        isMarkerShown
        sightings={filteredSightings}
      />
    );
  }
}
