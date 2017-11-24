import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavigationContainer = styled.section`
  padding: 1em 0;
  background-color: black;
`;
const NavigationLinkList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;
const NavigationLinkListItem = styled.li`
  display: inline-block;
  margin: 0 10px;
  text-transform: uppercase;
`;
const StyledLink = styled(Link)`
  color: #fff;
`;

class Navigation extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <NavigationLinkList>
          <NavigationLinkListItem>
            <StyledLink to="/">Home</StyledLink>
          </NavigationLinkListItem>
          <NavigationLinkListItem>
            <StyledLink to="/add">Add bird</StyledLink>
          </NavigationLinkListItem>
        </NavigationLinkList>
      </NavigationContainer>
    );
  }
}
export default Navigation;
