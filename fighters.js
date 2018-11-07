// import fetch dependency
const fetch = require('node-fetch');

// set default URL path for UFC api
const url = 'http://ufc-data-api.ufc.com/api/v3/iphone';


function getFighters() {
  // fetch from the UFC api with the right endpoint
  return fetch(`${url}/fighters`)
    .then(response => response.json())
    .then(response => {

      // define empty fighters Array to store all fighter Objects
      const fighters = [];
      
      // push a fighter Object for each element to the fighters Array
      response.forEach(el => {
        const fighter = {
          firstName: el.first_name,
          lastName: el.last_name,
          id: el.id
        };
        fighters.push(fighter);
      });
      
      //sort fighters alphabeticaly in the Array
      fighters.sort(function(a, b) {
        return (a.lastName < b.lastName) ? -1 : (a.lastName > b.lastName) ? 1 : 0;
      });
      
      // the getFighters function returns the entire fighters Array
      return fighters;
    })
    .catch(error => console.error('Error:', error));
}

// export the getFighters function
module.exports = {
  getFighters
};
