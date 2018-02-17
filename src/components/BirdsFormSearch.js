import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Downshift from 'downshift';
import Input from './shared/Input';
import {
  primaryColor,
  secondaryColor,
  blackColor,
} from '../constants/styled-variables';

const Dropdown = styled.div`
  padding: 0;
`;
const DropdownItem = styled.div`
  padding: 3px 4px;
  background-color: ${props =>
    props.selectedIndex === props.index ? secondaryColor : 'transparent'};
  color: ${props =>
    props.selectedIndex === props.index ? primaryColor : blackColor};
`;

const BirdsFormSearch = props => {
  return (
    <Downshift
      onChange={props.onChange}
      itemToString={item => {
        if (item && item.displayName) {
          return item.displayName;
        }
        return '';
      }}
      render={({
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        selectedItem,
        highlightedIndex,
      }) => (
        <div>
          <Input {...getInputProps({ placeholder: 'Havaittu lintu' })} />
          {isOpen ? (
            <Dropdown>
              {props.items
                .filter(
                  i =>
                    !inputValue ||
                    i.displayName
                      .toLowerCase()
                      .includes(inputValue.toLowerCase()),
                )
                .map((item, index) => (
                  <DropdownItem
                    {...getItemProps({ item })}
                    key={item.displayName}
                    selectedIndex={highlightedIndex}
                    index={index}
                    style={{
                      fontWeight:
                        selectedItem === item.displayName ? 'bold' : 'normal',
                    }}
                  >
                    {item.displayName}
                  </DropdownItem>
                ))}
            </Dropdown>
          ) : null}
        </div>
      )}
    />
  );
};
export default BirdsFormSearch;
