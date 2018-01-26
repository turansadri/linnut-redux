import h from '../helpers';
import moment from 'moment';
import {
  ACTIVE_MARKER_CHANGE,
  FORM_VALUE_CHANGE,
  FETCH_INITIAL_DATA,
} from '../actions/sightings-filter';

const filters = [
  { id: 'familyName', value: '', displayName: '', options: [] },
  { id: 'Year', value: '', displayName: '', options: [] },
  { id: 'birdName', value: '', displayName: '', options: [] },
];
const mapConfig = {
  center: {
    lat: 60.1634549,
    lng: 24.9449212,
  },
};
const initialState = {
  sightings: [],
  filters,
  filteredSightings: [],
  mapConfig,
  activeMarker: '',
};

const getBirdNames = (sightings, family, year) => {
  // console.log([
  //   ...new Set(
  //     Object.keys(sightings)
  //       .filter(key => {
  //         return
  //         // if (!family) {
  //         //   console.log('tuli tänne');
  //         //   return h.getYear(sightings[key].Date) === year;
  //         // } else if (!year) {
  //         //   console.log('tuli tänne myös');
  //         //   return sightings[key].Family === family;
  //         // }
  //         // return (
  //         //   sightings[key].Family === family &&
  //         //   h.getYear(sightings[key].Date) === year
  //         // );
  //       })
  //       .map(bird => bird.PrimaryName),
  //   ),
  // ]);
  return [
    ...new Set(
      Object.keys(sightings).map(key => {
        return sightings[key].bird.name;
      }),
    ),
  ];
};

const getUniqueProperties = (sightings, property) => {
  return [
    ...new Set(
      Object.keys(sightings).map(key => {
        return sightings[key].bird[property];
      }),
    ),
  ];
};
const sightingsFilter = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVE_MARKER_CHANGE: {
      return {
        ...state,
        activeMarker: action.id,
      };
    }
    case FORM_VALUE_CHANGE: {
      return {
        ...state,
        activeMarker: 2,
      };
    }
    case FETCH_INITIAL_DATA: {
      const sightings = action.payload;
      const newFamilies = getUniqueProperties(sightings, 'familyName');
      const newBirds = getUniqueProperties(sightings, 'name');
      console.log(newFamilies);
      console.log(newBirds);

      const nextFilters = filters.map(filter => {
        /* Updates options for PrimaryName dropdown if Family or Date is changed */
        // const oldFamily = filters.find(f => f.id === 'Family').value;
        // const oldYear = filters.find(f => f.id === 'Date').value;
        // const currentFamily = id === 'Family' ? action.value : oldFamily;
        // const currentDate = id === 'Date' ? action.value : oldDate;

        if (filter.id === 'birdName') {
          const nextBirdNames = getBirdNames(sightings, '', '');
          return {
            ...filter,
            options: nextBirdNames,
            value: '',
            displayName: '',
          };
        } else {
          return { ...filter };
        }
        return filter;
      });

      // const nextsightings = filtersightings(state.sightings, nextFilters);

      return {
        ...state,
        filteredSightings: sightings,
        filters: nextFilters,
        sightings: action.payload,
      };
    }
    default:
      return state;
  }
};

// const Families = [...new Set(sightings.map(bird => bird.Family))];
// const PrimaryNames = [...new Set(sightings.map(bird => bird.PrimaryName))];
// const dates = [...new Set(sightings.map(bird => helpers.getYear(bird.Date)))];
// const activeMarker = {
//   id: '',
// };
// const mapConfig = {
//   center: {
//     lat: 60.1634549,
//     lng: 24.9449212,
//   },
// };
// export const filters = [
//   { id: 'Family', value: '', displayName: '', options: Families },
//   { id: 'Date', value: '', displayName: '', options: dates },
//   { id: 'PrimaryName', value: '', displayName: '', options: PrimaryNames },
// ];

// const updatePrimaryNames = (initialsightings, currentFamily, currentDate) => [
//   ...new Set(
//     initialsightings
//       .filter(bird => {
//         if (!currentFamily) {
//           return helpers.getYear(bird.Date) === currentDate;
//         } else if (!currentDate) {
//           return bird.Family === currentFamily;
//         }
//         return (
//           bird.Family === currentFamily &&
//           helpers.getYear(bird.Date) === currentDate
//         );
//       })
//       .map(bird => bird.PrimaryName),
//   ),
// ];

// const filtersightings = (initialsightings, nextFilters) =>
//   nextFilters.reduce(
//     (acc, filter) =>
//       acc.filter(elem => {
//         if (filter.value === '') {
//           return elem;
//         }
//         if (filter.id === 'Date') {
//           return filter.value === helpers.getYear(elem[filter.id]);
//         }
//         return filter.value === elem[filter.id];
//       }),
//     initialsightings,
//   );

// const initialState = {
//   sightings,
//   filters,
//   filteredsightings: sightings,
//   mapConfig,
//   activeMarker,
// };

// const sightingsFilter = (state = initialState, action) => {
//   switch (action.type) {
//     case ACTIVE_MARKER_CHANGE: {
//       return {
//         ...state,
//         activeMarker: action.id,
//       };
//     }
//     case FORM_VALUE_CHANGE: {
//       const id = action.fieldName;

//       const nextFilters = state.filters.map(filter => {
//         /* Updates options for PrimaryName dropdown if Family or Date is changed */
//         if (filter.id === 'PrimaryName' && (id === 'Family' || id === 'Date')) {
//           const oldFamily = state.filters.find(f => f.id === 'Family').value;
//           const oldDate = state.filters.find(f => f.id === 'Date').value;
//           const currentFamily = id === 'Family' ? action.value : oldFamily;
//           const currentDate = id === 'Date' ? action.value : oldDate;
//           const nextPrimaryNames = updatePrimaryNames(
//             state.sightings,
//             currentFamily,
//             currentDate,
//           );
//           return {
//             ...filter,
//             options: nextPrimaryNames,
//             value: '',
//             displayName: '',
//           };
//         }
//         if (filter.id === id) {
//           return { ...filter, value: action.value };
//         }
//         return filter;
//       });

//       const nextsightings = filtersightings(state.sightings, nextFilters);

//       return {
//         ...state,
//         filteredsightings: nextsightings,
//         filters: nextFilters,
//       };
//     }
//     default:
//       return state;
//   }
// };

export default sightingsFilter;
