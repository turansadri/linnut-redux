import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { string, arrayOf, shape, object } from 'prop-types';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import BirdsUpdater from '../../components/BirdsUpdater';

const PropTypes = {
  families: object,
};
const DefaultProps = [];

const BirdsUpdaterContainer = props => {
  const { families, ...rest } = props;
  /* eslint-disable no-nested-ternary */
  const Form = !isLoaded(families) ? (
    'Loading'
  ) : isEmpty(families) ? (
    'No bird families'
  ) : (
    <BirdsUpdater families={families} {...rest} />
  );
  return <div>{Form}</div>;
  /* eslint-enable no-nested-ternary */
};

function mapStateToProps(state) {
  const { birds, families } = state.firebase.data;
  return {
    birds,
    families,
  };
}

BirdsUpdaterContainer.propTypes = PropTypes;
BirdsUpdaterContainer.defaultProps = DefaultProps;

export default compose(
  firebaseConnect(['/birds', '/families']),
  connect(mapStateToProps),
)(BirdsUpdaterContainer);
