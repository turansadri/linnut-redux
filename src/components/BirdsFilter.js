import React from 'react';
import PropTypes from 'prop-types';

class BirdsFilter extends React.Component {
  render() {
    const {
      filters,
      filteredBirds,
      onChange,
    } = this.props;

    return (
      <div>
        { filters.map(filter => (

          <select
            ref={filter.id}
            name={filter.id}
            onChange={onChange}
            value={filter.value || ''}
          >
            <option value="">{ filter.id }</option>
            { filter.options.map((option, index) => (
              <option key={index} value={option}>
                { option }
              </option>),
            )}
          </select>),
        )}
        { filteredBirds.map(bird => <p>{bird.PrimaryName}</p>)}
      </div>
    );
  }
}
BirdsFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  filteredBirds: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    PrimaryName: PropTypes.string,
    SecondaryName: PropTypes.string,
    Date: PropTypes.string,
    Count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    PlaceName: PropTypes.string,
    Latitude: PropTypes.number,
    Longitude: PropTypes.number,
    Notes: PropTypes.string,
    Family: PropTypes.string,
    FamilyName: PropTypes.string,
  })).isRequired,
};
export default BirdsFilter;
