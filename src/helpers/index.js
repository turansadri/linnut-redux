import moment from 'moment';

const helpers = {
  getYear: date => moment(date, 'D MMMM YYYY HH.mm').format('YYYY'),
};
export default helpers;
