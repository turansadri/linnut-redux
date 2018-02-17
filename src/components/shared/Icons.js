import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';
import { secondaryColor } from '../../constants/styled-variables';

const icons = {
  home: 'M16 9.5l-3-3v-4.5h-2v2.5l-3-3-8 8v0.5h2v5h5v-3h2v3h5v-5h2z',
  map: 'M0 3l5-2v12l-5 2z M6 0.5l5 3v11.5l-5-2.5z M12 3.5l4-3v12l-4 3z',
  compass:
    'M8.5 16c-0.036 0-0.072-0.004-0.108-0.012-0.229-0.051-0.392-0.254-0.392-0.488v-7.5h-7.5c-0.234 0-0.437-0.163-0.488-0.392s0.064-0.462 0.277-0.561l15-7c0.191-0.089 0.416-0.049 0.565 0.1s0.188 0.374 0.1 0.565l-7 15c-0.083 0.179-0.262 0.289-0.453 0.289zM2.754 7h5.746c0.276 0 0.5 0.224 0.5 0.5v5.746l5.465-11.712-11.712 5.465z',
};
const StyledIcon = styled.svg`
  fill: ${secondaryColor};
`;
const Icon = props => (
  <StyledIcon width="16" height="16" viewBox="0 0 16 16">
    <path d={icons[props.icon]} />
  </StyledIcon>
);
const PropTypes = {
  icon: string.isRequired,
};
export default Icon;
Icon.propTypes = PropTypes;
