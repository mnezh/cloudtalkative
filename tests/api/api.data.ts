// tests/api/api.data.ts

export const valid24HDate: [string, string][] = [
  ["1960-11-12 00:00:00", "Pre-epoch"],
  ["1970-01-01 00:00:00", "Epoch start"],
  ["2016-02-03 00:00:00", "Midnight"],
  ["2016-04-05 06:07:08", "Morning"],
  ["2016-06-07 12:00:00", "Noon"],
  ["2016-08-09 18:19:20", "Evening"],
  ["2035-11-12 10:00:00", "Future Date"],
];

export const invalidInput: [string | number, string][] = [
  // Existing/Initial Invalid Inputs
  ["asdfasd", "Random alphanumeric string"],
  ["1234567890123456781234567890", "Extremely large timestamp (out of range)"],

  ["20161-02-03 00:00:00", "Invalid year format (too many digits)"],
  ["2016-02-30 00:00:00", "Invalid day (30) for February"],
  ["2016-02-00 00:00:00", "Invalid day (0)"],

  // Invalid Time Components
  ["2016-02-03 25:00:00", "Invalid hour (25)"],
  ["2016-02-03 12:60:00", "Invalid minute (60)"],
  ["2016-02-03 12:59:60", "Invalid second (60)"],
  ["2016-02-03 12:59:0", "Single-digit seconds (missing leading zero)"],
];

export const shouldFail: [string | number, string][] = [
  ["2016/01/01", "Incorrect date separator format (slashes)"],
  // Invalid Date Components
  ["2016-00-03 00:00:00", "Invalid month (0)"],
  ["2016-13-03 00:00:00", "Invalid month (13)"],
];
