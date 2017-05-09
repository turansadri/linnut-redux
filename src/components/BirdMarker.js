import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Marker = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: red;
`;

export const BirdMarker = (props) => {
  return (
    <Marker>{ props.text }</Marker>
  );
};
