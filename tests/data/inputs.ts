// The spec claims format "Y-m-d h:i:s" ("h" stands for 12-hour format),
// but the service allows much more frivolous input

// Below you can find SOME examples of the classes of the input values
// Testing ALL of possible input classes via API tests is probably
// counter-productive anyways.

export const valid24HDate: [string, string][] = [
  ['1960-11-12 00:00:00', 'Pre-epoch'],
  ['1970-01-01 00:00:00', 'Epoch start'],
  ['2016-02-03 00:00:00', 'Midnight'],
  ['2016-04-05 06:07:08', 'Morning'],
  ['2016-06-07 12:00:00', 'Noon'],
  ['2016-08-09 18:19:20', 'Evening'],
  ['2035-11-12 10:00:00', 'Future Date'],
];

export const invalidInput: [string | number, string][] = [
  // Format
  ['asd23fasd', 'Random alphanumeric string'],

  // Year
  ['00aa-00-00 00:00:00', 'Alphanumerical year'],
  ['20161-02-03 00:00:00', '5-digit year'],

  // Month
  ['2016-13-30 00:00:00', 'Month > 12'],

  ['2016-02-028 00:00:00', 'three-digit month'],
  // Day
  ['2016-12-32 00:00:00', 'Day > 31'],

  // Unexpected extra
  ['2016-02-00 00:00:00 UTC+2', 'time have UTC-related timezone'],
];

// should fail, but aren't failing
// we can come up with many, many more
export const shouldFail: [string | number, string][] = [
  // Timestamp
  ['1234567890123456781234567890', 'Extremely large timestamp (out of range)'],

  // Format
  ['00:00:00', 'missing date'],
  ['2016-02-03', 'missing time'],
  ['2016/01/01', 'Incorrect date separator'],

  // Year
  ['0000-00-00 00:00:00', 'Zero year'],
  ['201-02-03 00:00:00', '3-digit year'],

  // Month
  ['2016-00-03 00:00:00', 'zero month'],
  ['2016-0a-00 00:00:00', 'Alphanumerical month'],
  ['2016-1-30 00:00:00', 'single-digit month'],

  // Day
  ['2016-02-00 00:00:00', 'zero day'],
  ['2016-12-0a 00:00:00', 'Alphanumerical day'],

  ['2016-02-3 00:00:00', 'single-digit month'],

  ['2016-02-30 00:00:00', 'impossible day for short month'],

  // Unexpected extra
  ['2016-02-00 00:00:00.10', 'time have milliseconds'],
];
