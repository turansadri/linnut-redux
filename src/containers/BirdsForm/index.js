import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { string, arrayOf, shape } from 'prop-types';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import BirdsForm from '../../components/BirdsForm';

// const BirdsFormContainer = props => {
//   const { birds, families } = props;
//   return <BirdsForm {...props} birds={birds} families={families} />;
// };
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

const BirdsFormContainer = props => {
  const { families } = props;
  /* eslint-disable no-nested-ternary */
  const Form = !isLoaded(families) ? (
    'Loading'
  ) : isEmpty(families) ? (
    'No bird families'
  ) : (
    <BirdsForm families={families} />
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

BirdsFormContainer.propTypes = PropTypes;
BirdsFormContainer.defaultProps = DefaultProps;

export default compose(
  firebaseConnect(['/birds', '/family']),
  connect(mapStateToProps),
)(BirdsFormContainer);
