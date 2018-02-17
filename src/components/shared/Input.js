import styled from 'styled-components';
import { primaryColor, secondaryColor } from '../../constants/styled-variables';

const Input = styled.input`
  border-radius: 0;
  -webkit-appearance: none;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 300;
  padding: 6px 4px;
  width: 100%;
  border: none;
  border-bottom: 4px solid ${secondaryColor};
  margin-bottom: 0.2em;
  &:focus {
    outline: none;
    border-color: ${primaryColor};
  }
`;

export default Input;
