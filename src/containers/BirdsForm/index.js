import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import BirdsForm from '../../components/BirdsForm';

const BirdsFormContainer = props => {
  const { birds, family } = props;
  return <BirdsForm {...props} birds={birds} family={family} />;
};

function mapStateToProps(state) {
  const { birds, family } = state.firebase.data;
  return {
    birds,
    family,
  };
}

export default compose(
  firebaseConnect(['/birds', '/family']),
  connect(mapStateToProps),
)(BirdsFormContainer);
