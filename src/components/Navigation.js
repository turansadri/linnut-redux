import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { primaryColor, secondaryColor } from '../constants/styled-variables';
import Icon from './shared/Icons';

const NavigationContainer = styled.section`
  padding: 12px 0;
  background-color: ${primaryColor};
`;
const LinkList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: center;
`;
const LinkListItem = styled.li`
  display: inline-block;
  margin: 0 20px;
  text-transform: uppercase;
`;
const StyledLink = styled(Link)`
  color: ${secondaryColor};
  text-decoration: none;
`;

const Navigation = () => (
  <NavigationContainer>
    <LinkList>
      <LinkListItem>
        <StyledLink to="/add">
          <Icon icon="home" />
        </StyledLink>
      </LinkListItem>
      <LinkListItem>
        <StyledLink to="/">
          <Icon icon="map" />
        </StyledLink>
      </LinkListItem>
      {/*
      <LinkListItem>
        <StyledLink to="/update">Update bird</StyledLink>
      </LinkListItem>
      <LinkListItem>
        <StyledLink to="/updater">Updater</StyledLink>
      </LinkListItem>
      */}
    </LinkList>
  </NavigationContainer>
);

export default Navigation;
