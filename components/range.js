
import format from 'date-fns/format';

export const range = (startDate, endDate) => {
    const date = new Date(startDate.getTime());

    const dates = [];

    while (date <= endDate) {
        dates.push(format(new Date(date), 'y-MM-dd'));
        date.setDate(date.getDate() + 1);
    }

    return dates;
}
  // End Of Date Range

