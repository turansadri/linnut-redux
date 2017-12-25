import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Downshift from 'downshift';

const BirdsFormSearch = props => {
  return (
    <Downshift
      onChange={props.onChange}
      itemToString={item => item.displayName}
      render={({
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        selectedItem,
        highlightedIndex,
      }) => (
        <div>
          <input {...getInputProps({ placeholder: 'Favorite color ?' })} />
          {isOpen ? (
            <div style={{ border: '1px solid #ccc' }}>
              {props.items
                .filter(
                  i =>
                    !inputValue ||
                    i.displayName
                      .toLowerCase()
                      .includes(inputValue.toLowerCase()),
                )
                .map((item, index) => (
                  <div
                    {...getItemProps({ item })}
                    key={item.displayName}
                    style={{
                      backgroundColor:
                        highlightedIndex === index ? 'gray' : 'white',
                      fontWeight:
                        selectedItem === item.displayName ? 'bold' : 'normal',
                    }}
                  >
                    {item.displayName}
                  </div>
                ))}
            </div>
          ) : null}
        </div>
      )}
    />
  );
};
export default BirdsFormSearch;
