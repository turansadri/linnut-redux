import birds from '../data/birds';
import helpers from '../helpers';
import {
  ACTIVE_MARKER_CHANGE,
  FORM_VALUE_CHANGE,
} from '../actions/birds-filter';

const Families = [...new Set(birds.map(bird => bird.Family))];
const PrimaryNames = [...new Set(birds.map(bird => bird.PrimaryName))];
const dates = [...new Set(birds.map(bird => helpers.getYear(bird.Date)))];
const activeMarker = {
  id: '',
};
const mapConfig = {
  center: {
    lat: 60.1634549,
    lng: 24.9449212,
  },
};
export const filters = [
  { id: 'Family', value: '', displayName: '', options: Families },
  { id: 'Date', value: '', displayName: '', options: dates },
  { id: 'PrimaryName', value: '', displayName: '', options: PrimaryNames },
];

const updatePrimaryNames = (initialBirds, currentFamily, currentDate) =>
  [...new Set(initialBirds.filter((bird) => {
    if (!currentFamily) {
      return helpers.getYear(bird.Date) === currentDate;
    } else if (!currentDate) {
      return bird.Family === currentFamily;
    }
    return bird.Family === currentFamily && helpers.getYear(bird.Date) === currentDate;
  })
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
  mapConfig,
  activeMarker,
};

const birdsFilter = (state = initialState, action) => {
  switch (action.type) {
  case ACTIVE_MARKER_CHANGE: {
    return {
      ...state,
      activeMarker: action.id,
    };
  }
  case FORM_VALUE_CHANGE: {
    const id = action.fieldName;

    const nextFilters = state.filters.map((filter) => {
      /* Updates options for PrimaryName dropdown if Family or Date is changed */
      if (filter.id === 'PrimaryName' && (id === 'Family' || id === 'Date')) {
        const oldFamily = state.filters.find(f => f.id === 'Family').value;
        const oldDate = state.filters.find(f => f.id === 'Date').value;
        const currentFamily = id === 'Family' ? action.value : oldFamily;
        const currentDate = id === 'Date' ? action.value : oldDate;
        const nextPrimaryNames = updatePrimaryNames(state.birds, currentFamily, currentDate);
        return { ...filter, options: nextPrimaryNames, value: '', displayName: '' };
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
