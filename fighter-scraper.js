const fetch = require('node-fetch');
const cheerio = require('cheerio');

const url = 'http://ufc-data-api.ufc.com/api/v3/iphone/fighters/';

//init cache
const searchCache = {};

function searchFighterById(fighterId) {

  //if object found in cache, serve it from the cache
  if(searchCache[fighterId]) {
    console.log('serving from cache', fighterId);
    return Promise.resolve(searchCache[fighterId]);
  }

  return fetch(`${url}${fighterId}`)
    .then(response => response.text())
    .then(body => {

      //init object
      const fighterProfile = [];
      const $ = cheerio.load(body);
      
      //scrap the page
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

      //pass scrapped info into info object
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

      //push info object to the main one
      fighterProfile.push({ info: info });
      
      const fights = [];
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

        fights.push(fight);

      });
  
      fighterProfile.push({ fights });

      //pass the object to the cache
      searchCache[fighterId] = fighterProfile

      return fighterProfile;
    })
    .catch(error => console.error('Error:', error));
}

module.exports = {
  searchFighterById
};