import styled from 'styled-components';
import {
  primaryColor,
  secondaryColor,
  tertiaryColor,
} from '../../constants/styled-variables';

const Button = styled.button`
  -webkit-appearance: none;
  background-color: ${props =>
    props.primary ? tertiaryColor : secondaryColor};
  color: ${primaryColor};
  padding: 5px 30px;
  border: none;
  border-radius: 4px;
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 700;
`;

export default Button;
