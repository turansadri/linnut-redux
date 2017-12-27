import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { string, arrayOf, shape } from 'prop-types';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import BirdsUpdater from '../../components/BirdsUpdater';

const PropTypes = {
  families: arrayOf(
    shape({
      displayName: string.isRequired,
      name: string.isRequired,
      spesies: arrayOf(
        shape({
          displayName: string.isRequired,
          name: string.isRequired,
        }),
      ),
    }),
  ),
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
  const { birds, family } = state.firebase.data;
  return {
    birds,
    families: family,
  };
}

BirdsUpdaterContainer.propTypes = PropTypes;
BirdsUpdaterContainer.defaultProps = DefaultProps;

export default compose(
  firebaseConnect(['/birds', '/family']),
  connect(mapStateToProps),
)(BirdsUpdaterContainer);
