// dateUtils.js

import { format } from 'date-fns';

export const getFormatDate = (dateString, formatString = 'dd-MM-yyyy') => {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
          throw new Error('Invalid date');
        }
        return format(date, formatString);
      } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid Date';
      }
};
