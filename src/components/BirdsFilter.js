import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FiltersContainer = styled.section`
  position: absolute;
  width: 100%;
  height: auto;
  background-color: #fff;
  padding: 1em;
  top: 0;
  left: 0;
  z-index: 100;
`;

class BirdsFilter extends React.Component {
  render() {
    const {
      filters,
      onChange,
    } = this.props;

    return (
      <FiltersContainer>
        { filters.map(filter => (

          <select
            key={filter.id}
            ref={filter.id}
            name={filter.id}
            onChange={onChange}
            value={filter.value || ''}
          >
            <option value="">{ filter.id }</option>
            { filter.options.map((option, index) => (
              <option
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                value={option}
              >
                { index } - { option }
              </option>),
            )}
          </select>),
        )}
      </FiltersContainer>
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
