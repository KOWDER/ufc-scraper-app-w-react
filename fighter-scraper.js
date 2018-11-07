// import dependencies
const fetch = require('node-fetch');
const cheerio = require('cheerio');

// UFC API generic path
const url = 'http://ufc-data-api.ufc.com/api/v3/iphone/fighters/';

//initialize cache Object
const searchCache = {};

function searchFighterById(fighterId) {

  // fighters are stored in the searchCache Object by their IDS
  // if the ID passed to the function corresponds to one of them
  // the function will serve the fighter stored in the cache.
  if(searchCache[fighterId]) {
    console.log('serving from cache', fighterId);
    return Promise.resolve(searchCache[fighterId]);
  }

  return fetch(`${url}${fighterId}`)
    .then(response => response.text())
    .then(body => {

      // initialize global fighter profile Array
      const fighterProfile = [];

      // set cheerio to $
      const $ = cheerio.load(body);
      
      // scrap the page with Cheerio
      const $name = $('.fighter-overview > h1').text();
      const $record = $('.fighter-overview .fighter-record .white').text();
      const $nickname = $('.fighter-overview .fighter-record .red').text();
      const $profileImg = $('.fighter-overview .fighter-portrait').attr('src');
      const $from = $('.fight-info-data tr:first-of-type td:nth-of-type(2)').text().trim();
      const $livesIn = $('.fight-info-data tr:nth-of-type(2) td:nth-of-type(2)').text();
      const $age = $('.fight-info-data tr:nth-of-type(3) td:nth-of-type(2)').text();
      const $height = $('.fight-info-data tr:nth-of-type(4) td:nth-of-type(2)').text();
      const $weight = $('.fight-info-data tr:nth-of-type(5) td:nth-of-type(2)').text();
      const $weightClass = $('.fight-info-data tr:nth-of-type(6) td:nth-of-type(2)').text();

      // pass scrapped information about a fighter into an info Object
      const info = {
        name: $name,
        record: $record,
        nickname: $nickname,
        from: $from,
        livesIn: $livesIn,
        age: $age,
        height: $height,
        weight: $weight,
        weightClass: $weightClass,
        profileImg: $profileImg,
        id: fighterId
      }

      // push info Object to the fighter Array (fighterProfile.info)
      fighterProfile.push({ info: info });
      
      // initialize a fights Array to store all the fights the fighter had
      const fights = [];

      // Loop through element that has all the fights. 
      // Each Li represents a fight. 
      $('.fighter-list li').each(function(i, el) {
        const $el = $(el);
        const $opponentImg = $el.find('a .fighter-thumbnail').attr('src');
        const $opponent = $el.find('a h1').text();
        const $show = $el.find('a p span').text();
        const $result = $el.find('.fight-result-flag').attr('alt');
        const $title = $el.find('.title-holder-history').attr('title');
        const $titleImg = $el.find('.title-holder-history').attr('src');
        const $where = $el.find('p').html().split("<br>")[2].trim();
        const $when = $el.find('p').html().split("<br>")[1].trim();
        
        // every single fight stored into a single fight Object
        const fight = {
          opponentImg: $opponentImg,
          opponent: $opponent,
          show: $show,
          result: $result,
          title: $title,
          titleImg: $titleImg,
          where: $where,
          when: $when
        };

        // this fight Object is pushed into the fights Array
        fights.push(fight);

      });
      
      // fights Array is pushed to fighterProfile Array (fighterProfile.fights)
      fighterProfile.push({ fights });

      // pass the Array to the cache in case the user searches for it again
      // to avoid another scraping cycle
      searchCache[fighterId] = fighterProfile

      // returns the fighterProfile Array
      return fighterProfile;
    })
    .catch(error => console.error('Error:', error));
}

module.exports = {
  searchFighterById
};