import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const BASE_URL =
  __ENV.BASE_URL ||
  'https://helloacm.com/api/unix-timestamp-converter/?cached&s=';
const REPORT_DIR = __ENV.REPORT_DIR || 'reports';
const OUTPUT_DIR = `${REPORT_DIR}/load`;

// Load test data once per test run
const data = new SharedArray(
  'test data',
  () => JSON.parse(open('./testdata.json')).valid24HDate,
);

// remeber 429, we'll be hitting it pretty soon, so using
// very limited load
export const options = {
  stages: [
    { duration: '10s', target: 3 }, // ramp up to 3 users
    { duration: '20s', target: 3 }, // stay at 3 users
    { duration: '10s', target: 0 }, // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<800'], // 95% of requests under 800ms
    http_req_failed: ['rate<0.01'], // <1% failures
  },
};

export default function () {
  const dateStr = randomItem(data);
  const encoded = encodeURIComponent(dateStr);
  const res = http.get(`${BASE_URL}${encoded}`);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response not empty': (r) => r.body && r.body.length > 0,
  });

  sleep(1);
}

export function handleSummary(data) {
  const reportPath = `${OUTPUT_DIR}/load-test-report.html`;
  return { [reportPath]: htmlReport(data) };
}
