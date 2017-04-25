import birds from '../data/birds';
import helpers from '../helpers';
import {
  FORM_VALUE_CHANGE,
} from '../actions/birds-filter';

const Families = [...new Set(birds.map(bird => bird.Family))];
const PrimaryNames = [...new Set(birds.map(bird => bird.PrimaryName))];
const dates = [...new Set(birds.map(bird => helpers.getYear(bird.Date)))];

const filters = [
  { id: 'Family', value: '', options: Families },
  { id: 'Date', value: '', options: dates },
  { id: 'PrimaryName', value: '', options: PrimaryNames },
];

const primaryNameOptionsByFamilyValue = (initialBirds, currentFamily) =>
  [...new Set(initialBirds.filter(bird =>
    bird.Family === currentFamily)
  .map(bird => bird.PrimaryName))];

const filterBirds = (initialBirds, nextFilters) => (
  nextFilters.reduce((acc, filter) => acc.filter((elem) => {
    if (filter.value === '') {
      return elem;
    }
    if (filter.id === 'Date') {
      return filter.value === helpers.getYear(elem[filter.id]);
    }
    return filter.value === elem[filter.id];
  }), initialBirds)
);

const initialState = {
  birds,
  filters,
  filteredBirds: birds,
};

const birdsFilter = (state = initialState, action) => {
  switch (action.type) {
  case FORM_VALUE_CHANGE: {
    const id = action.fieldName;

    const nextFilters = state.filters.map((filter) => {
      /* Updates options for PrimaryName dropdown if Family is changed */
      if (filter.id === 'PrimaryName' && id === 'Family') {
        const nextPrimaryNames =
          primaryNameOptionsByFamilyValue(state.birds, action.value);
        return { ...filter, options: nextPrimaryNames, value: '' };
      }
      if (filter.id === id) {
        return { ...filter, value: action.value };
      }
      return filter;
    });

    const nextBirds = filterBirds(state.birds, nextFilters);

    return {
      ...state,
      filteredBirds: nextBirds,
      filters: nextFilters,
    };
  }
  default:
    return state;
  }
};

export default birdsFilter;
