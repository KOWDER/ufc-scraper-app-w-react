const fetch = require('node-fetch');

const url = 'http://ufc-data-api.ufc.com/api/v3/iphone';

function getFighters() {
  return fetch(`${url}/fighters`)
    .then(response => response.json())
    .then(response => {

      const fighters = [];
      
      //make object for every fighter in the api
      response.forEach(el => {
        const fighter = {
          firstName: el.first_name,
          lastName: el.last_name,
          id: el.id
        };
        fighters.push(fighter);
      });
      
      //sort foghters alphabeticaly
      fighters.sort(function(a, b) {
        return (a.lastName < b.lastName) ? -1 : (a.lastName > b.lastName) ? 1 : 0;
      });
  
      return fighters;
    })
    .catch(error => console.error('Error:', error));
}

module.exports = {
  getFighters
};
