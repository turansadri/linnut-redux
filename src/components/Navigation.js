import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavigationContainer = styled.section`
  padding: 1em 0;
  background-color: black;
`;
const LinkList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;
const LinkListItem = styled.li`
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
        <LinkList>
          <LinkListItem>
            <StyledLink to="/">Home</StyledLink>
          </LinkListItem>
          <LinkListItem>
            <StyledLink to="/add">Add bird</StyledLink>
          </LinkListItem>
        </LinkList>
      </NavigationContainer>
    );
  }
}
export default Navigation;
