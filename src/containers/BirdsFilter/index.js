import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BirdsFilter from '../../components/BirdsFilter';
import { formValueChange } from '../../actions/birds-filter';

const BirdsFilterContainer = (props) => {
  const {
    onChange,
  } = props;
  return (
    <BirdsFilter
      {...props}
      onChange={onChange}
    />
  );
};

function mapStateToProps(state) {
  const {
    birds,
    filters,
    filteredBirds,
    } = state;

  return {
    birds,
    filteredBirds,
    filters,
  };
}

const mapDispatchToProps = dispatch => ({
  onChange: (event) => {
    dispatch(formValueChange(event.currentTarget.value, event.currentTarget.name));
  },
});

BirdsFilterContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BirdsFilterContainer);
