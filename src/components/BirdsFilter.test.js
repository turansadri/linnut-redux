import renderer from 'react-test-renderer';
import React from 'react';
import BirdsFilter from './BirdsFilter';
import { filters } from '../reducers/birds-filter';

const filteredBirds = [];
const onChange = () => {};

test('BirdsFilter renders correctly', () => {
  const tree = renderer.create(
    <BirdsFilter filters={filters} onChange={onChange} filteredBirds={filteredBirds} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
