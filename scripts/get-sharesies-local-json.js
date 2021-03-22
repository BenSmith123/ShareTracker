/**
 * Script to get sharesies API data and store locally as JSON
 *
 * Stored in: {project/src/sharesies.private/}
 */

const fs = require('fs');

// get credentials from local JSON
const { email, password } = require('../credentials.private');

// use the existing API helper functions
const sharesies = require('../src/api');

(async () => {

  console.log('Running script to get sharesies API data!');

  await sharesies.authenticate(email, password);

  console.log('Successfully logged in');


  // TODO - promise.all please
  // hardcode cookie next time whilst testing to avoid spamming /login

  const stats = await sharesies.stats();

  // fs.writeFileAsync(JSON.stringify());

  console.log(stats);


})();
