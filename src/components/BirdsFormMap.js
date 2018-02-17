import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { func } from 'prop-types';
// import { MAP } from 'react-google-maps/lib/constants';

const googleMapStyles = require('../data/googleMapStyles.json');

const PropTypes = {
  handleMapPlaces: func.isRequired,
  handleMapAddress: func.isRequired,
  handleMapLocation: func.isRequired,
};

const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={16}
      defaultOptions={{ styles: googleMapStyles }}
      center={{
        lat: props.currentLocation.lat,
        lng: props.currentLocation.lng,
      }}
      onDragEnd={props.onMarkerPositionChanged}
      ref={props.onMapMounted}
    >
      {props.isMarkerShown && (
        <Marker
          position={{
            lat: props.currentLocation.lat,
            lng: props.currentLocation.lng,
          }}
        />
      )}
    </GoogleMap>
  )),
);

class BirdsFormMap extends React.Component {
  constructor(props) {
    super(props);
    this.onMarkerPositionChanged = this.onMarkerPositionChanged.bind(this);
    this.onMapMounted = this.onMapMounted.bind(this);
    this.state = {
      currentLocation: {
        lat: 20,
        lng: 50,
      },
    };
  }
  componentDidMount() {
    this.getCurrentPosition();
  }
  onMapMounted(ref) {
    this.map = ref;
    if (typeof window === 'undefined') {
      return;
    }
    const googleMaps = (window.google && window.google.maps) || this.map;
    if (!googleMaps) {
      console.error(
        // eslint-disable-line no-console
        'Google map api was not found in the page.',
      );
      return;
    }
    if (!this.map) {
      return;
    }
    this.geocoder = new googleMaps.Geocoder();
    this.service = new googleMaps.places.PlacesService(
      this.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    );
  }
  onMarkerPositionChanged() {
    const { map } = this;
    const lat = map.getCenter().lat();
    const lng = map.getCenter().lng();
    const location = { lat, lng };
    this.updateLocationInfo(location);
  }
  getCurrentPosition() {
    console.log(
      // eslint-disable-line no-console
      'Getting location..',
    );
    navigator.geolocation.getCurrentPosition(
      pos => {
        const location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        this.updateLocationInfo(location);
      },
      error => {
        console.log(
          // eslint-disable-line no-console
          `Error on geolocation${error}`,
        );
      },
      {
        enableHighAccuracy: false,
        // maximumAge: 0,
        timeout: 30000,
      },
    );
  }
  getMapPlaces(location) {
    function processResults(results, status) {
      if (status === 'OK') {
        this.props.handleMapPlaces(results);
      }
    }
    return this.service.nearbySearch(
      {
        location,
        types: ['park', 'neighborhood', 'locality', 'natural_feature'],
        radius: 1000,
        language: 'fi',
      },
      processResults.bind(this),
    );
  }
  getReverseGeolocation(location) {
    const getCountryFromAddressComponents = components =>
      components.filter(component => component.types.includes('country'))[0];
    return this.geocoder.geocode(location, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          const country = getCountryFromAddressComponents(
            results[0].address_components,
          );
          const address = {
            address: results[0].formatted_address,
            country: country.long_name,
            countryCode: country.short_name,
          };
          this.props.handleMapAddress(address);
        } else {
          console.log(
            // eslint-disable-line no-console
            'No results found',
          );
        }
      } else {
        console.log(
          // eslint-disable-line no-console
          `Geocoder failed due to: ${status}`,
        );
      }
    });
  }
  updateLocationInfo(location) {
    console.log(
      // eslint-disable-line no-console
      'Location updated.',
    );
    const places = this.getMapPlaces(location);
    const address = this.getReverseGeolocation({
      location,
      language: 'fi',
    });
    // this.props.handleMapValues(
    //   location,
    //   address,
    //   places,
    // );
    this.props.handleMapLocation(location);
    this.setState({
      currentLocation: location,
    });
  }
  render() {
    return (
      <Map
        onMapMounted={this.onMapMounted}
        onMarkerPositionChanged={this.onMarkerPositionChanged}
        currentLocation={this.state.currentLocation}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCV31G_XGjKMer9YBaviREhz501w0EyOYs&v=3.exp&libraries=geometry,drawing,places"
        containerElement={<div style={{ height: '320px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        loadingElement={<div style={{ height: '100%' }} />}
        isMarkerShown
      />
    );
  }
}
BirdsFormMap.propTypes = PropTypes;
export default BirdsFormMap;
