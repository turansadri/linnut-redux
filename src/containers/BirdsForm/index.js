import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { string, arrayOf, shape, object } from 'prop-types';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import BirdsForm from '../../components/BirdsForm';

const PropTypes = {
  // families: shape({
  //   displayName: string.isRequired,
  //   name: string.isRequired,
  //   spesies: arrayOf(
  //     shape({
  //       displayName: string.isRequired,
  //       name: string.isRequired,
  //     }),
  //   ),
  // }),
  families: object,
};
const DefaultProps = [];

const BirdsFormContainer = props => {
  const { families, ...rest } = props;
  /* eslint-disable no-nested-ternary */
  const Form = !isLoaded(families) ? (
    'Loading'
  ) : isEmpty(families) ? (
    'No bird families'
  ) : (
    <BirdsForm families={families} {...rest} />
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

BirdsFormContainer.propTypes = PropTypes;
BirdsFormContainer.defaultProps = DefaultProps;

export default compose(
  firebaseConnect(['/birds', '/families']),
  connect(mapStateToProps),
)(BirdsFormContainer);
