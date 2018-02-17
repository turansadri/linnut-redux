import styled from 'styled-components';
import { secondaryColor, whiteColor } from '../../constants/styled-variables';

const Select = styled.select`
  background-color: ${whiteColor};
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
`;

export default Select;
