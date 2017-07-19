import moment from 'moment';

const helpers = {
  getYear: date => moment(date, 'D MMMM YYYY HH.mm').format('YYYY'),
  camelCasify: string => string.replace(/-([a-z])/g, (g) => {
    return g[1].toUpperCase();
  })
};
export default helpers;
