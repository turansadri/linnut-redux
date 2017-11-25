import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import BirdsForm from '../../components/BirdsForm';

// const BirdsFormContainer = props => {
//   const { birds, families } = props;
//   return <BirdsForm {...props} birds={birds} families={families} />;
// };

const BirdsFormContainer = props => {
  const { families } = props;
  const Form = !isLoaded(families) ? (
    'Loading'
  ) : isEmpty(families) ? (
    'No bird families'
  ) : (
    <BirdsForm families={families} />
  );
  return <div>{Form}</div>;
};

function mapStateToProps(state) {
  const { birds, family } = state.firebase.data;
  return {
    birds,
    families: family,
  };
}

export default compose(
  firebaseConnect(['/birds', '/family']),
  connect(mapStateToProps),
)(BirdsFormContainer);
