
const axios = require('axios');

const API_URL = 'https://app.sharesies.nz/api';

const API_ENDPOINTS = {
  LOGIN: `${API_URL}/identity/login`,
  LOGOUT: `${API_URL}/identity/logout`,
  CHECK: `${API_URL}/identity/check`,
  STATS: `${API_URL}/accounting/stats-v3`,
  INFO: `${API_URL}/instruments/info`,
  // FUND_LIST: `${URL_BASE}/fund/list`,
  // TRANS_HIST: `${URL_BASE}/accounting/transaction-history`,
  // FUND_HIST: `${URL_BASE}/fund/price-history?first=0001-01-01`,
};

// store local globals
let cookie;
let userId;
// let user = null;


/**
 * Returns true on successful login - sets the auth cookie and user
 *
 * @param {string} auth.email
 * @param {string} auth.password
 * @returns {Promise<Object>}
 */
async function authenticate(email, password) {

  if (!email || !password) { throw new Error('No email or password provided.'); }

  const req = {
    url: API_ENDPOINTS.LOGIN,
    method: 'post',
    data: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = await axios(req);

  if (!res.data.authenticated) {
    throw new Error('Failed to login: Auth username or password invalid');
  }

  if (!res.headers['set-cookie'][1] || !res.data.user) {
    throw new Error('Failed to login: Auth cookie or user data was not returned');
  }

  // store values
  cookie = res.headers['set-cookie'][1];
  userId = res.data.user.id;

  console.log('Sharesies API cookie: ', cookie);

  // user = res.data.user; // TODO - export/store this too

  return true;
}


/**
 * Returns the [GET] sharesies API response
 *
 * @param {string} endpoint
 * @param {string=} queryParams - optional
 */
async function sharesiesAPI(endpoint, queryParams = '') {

  if (!cookie) { throw new Error('No cookie set, you must authenticate first'); }

  const req = {
    url: queryParams
      ? endpoint + queryParams + userId // attach userId to any API request that have query params
      : endpoint,
    headers: { cookie },
  };

  const res = await axios(req);

  return res.data;
}


module.exports = {
  authenticate,
  check: () => sharesiesAPI(API_ENDPOINTS.CHECK),
  stats: () => sharesiesAPI(API_ENDPOINTS.STATS, '?acting_as_id='),
  info: () => sharesiesAPI(API_ENDPOINTS.INFO),
  fundList: () => sharesiesAPI(API_ENDPOINTS.FUND_LIST, '?limit=50&acting_as_id='),
  transHist: () => sharesiesAPI(API_ENDPOINTS.TRANS_HIST),
  fundHist: () => sharesiesAPI(API_ENDPOINTS.FUND_HIST),
};
