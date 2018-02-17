import styled from 'styled-components';
import { primaryColor } from '../../constants/styled-variables';

const IconButton = styled.button`
  padding: 8px;
  -webkit-appearance: none;
  box-sizing: border-box;
  line-height: 0;
  background-color: ${primaryColor};
  cursor: pointer;
  text-align: center;
  border: none;
  border-radius: 4px;
`;

export default IconButton;
