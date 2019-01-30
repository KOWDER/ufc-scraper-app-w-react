import React from 'react';
import '../styles/FighterProfile.css';

export default ({profile}) => {
  return (
    <div>
      <div className="fighter-profile">
        <div className="fighter-img">
          {profile[0].info.profileImg && <img src={profile[0].info.profileImg} alt="fighter face" />}
        </div>
        <div className="fighter-info">
          <h3>{!profile[0].info.name ? `The API might have problems, visit http://ufc-data-api.ufc.com/api/v3/iphone/ ` : 'Informations'}</h3>
          <ul>
            <li>{profile[0].info.name ? `name: ${profile[0].info.name}` : ''}</li>
            <li>{profile[0].info.nickname ? `nickname: '${profile[0].info.nickname}'` : ''}</li>
            <li>{profile[0].info.record ? `record: ${profile[0].info.record} (W/L/D)` : ''}</li>
            <li>{profile[0].info.from ? `from: ${profile[0].info.from}` : ''}</li>
            <li>{profile[0].info.livesIn ? `lives in: ${profile[0].info.livesIn}` : ''}</li>
            <li>{profile[0].info.age ? `age: ${profile[0].info.age}` : ''}</li>
            <li>{profile[0].info.height ? `height: ${profile[0].info.height}` : ''}</li>
            <li>{profile[0].info.weight ? `weight: ${profile[0].info.weight}` : ''}</li>
            <li>{profile[0].info.weightClass ? `weight class: ${profile[0].info.weightClass}` : ''}</li>
          </ul>
        </div>
      </div>

      {profile[1].fights.map((fight, i) => {
        return  <div className="fighter-fight" key={i} style={fight.result === 'Win' ? {backgroundColor: 'rgba(69, 216, 130, 0.2)'} : (fight.result === 'Loss' ? {backgroundColor: 'rgba(243, 92, 92, 0.2)'} : {backgroundColor: 'transparent'})}>
            <div className="fight-opponentImg">
              <img src={fight.opponentImg} alt="opponent face"/>
            </div>
            <ul>
              <li className="fight-opponent">{fight.opponent}</li>
              <li className="fight-title">{fight.title ? `For the ${fight.title}` : ""}</li>
              <li className="fight-event">{fight.show}</li>
              <li className="fight-where">{fight.where}</li>
              <li className="fight-when">{fight.when}</li>
            </ul>
            <div className="fight-titleImg">
              <span className="fight-result" style={fight.result === 'Win' ? {color: "green"} : {color: "red"}}>{fight.result ? fight.result : ""}</span>
              {fight.titleImg && 
                <img src={fight.titleImg} alt="title"/>
              }
            </div>
          </div>
      })}
    </div>
  )
}
