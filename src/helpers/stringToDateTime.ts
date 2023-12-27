type Months =
  | 'JAN'
  | 'FEV'
  | 'MAR'
  | 'ABR'
  | 'MAI'
  | 'JUN'
  | 'JUL'
  | 'AGO'
  | 'SET'
  | 'OUT'
  | 'NOV'
  | 'DEZ';

const months = {
  JAN: 'JAN',
  FEV: 'FEB',
  MAR: 'MAR',
  ABR: 'APR',
  MAI: 'MAY',
  JUN: 'JUN',
  JUL: 'JUL',
  AGO: 'AUG',
  SET: 'SEP',
  OUT: 'OCT',
  NOV: 'NOV',
  DEZ: 'DEC',
};

export function stringToDateTime(str: string) {
  const format01 = /(\d{2})[/](\d{2})[/]?(\d{4})?/.exec(str);
  if (format01) {
    // Format '05/07' or '08/08/2023'
    if (str.split('/').length >= 3) {
      return new Date(`${format01[2]}-${format01[1]}-${format01[3]}`);
    }
    return new Date(
      `${format01[2]}-${format01[1]}-${new Date().getFullYear()}`
    );
  }
  const format02 = /([a-zA-Z]{3})[/](\d{2})/.exec(str);
  if (format02) {
    // Format 'SET/23' or 'AGO/23' or 'JUL/23' or 'JUN/23'
    const defaultDay = 10;
    const month = months[format02[1] as Months];
    const year = '20' + format02[2];
    return new Date(`${defaultDay}-${month}-${year}`);
  }

  return new Date();
}
